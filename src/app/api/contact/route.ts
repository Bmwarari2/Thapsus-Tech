import { NextResponse } from "next/server";
import { isPlaceholder, site } from "@/config/site";
import { validateEnquiry, type Enquiry } from "@/lib/enquiry";

/** Minimum time a real person takes to fill in the form. Faster submissions are treated as bots. */
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: a hidden field people never see, and a minimum fill time.
  // Bots get a normal-looking success so they don't learn to adapt.
  const honeypot = typeof body.website === "string" ? body.website : "";
  const startedAt = Number(body.startedAt);
  if (honeypot.trim() !== "" || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later or give us a call." }, { status: 429 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const enquiry: Enquiry = {
    name: str(body.name),
    business: str(body.business),
    email: str(body.email),
    phone: str(body.phone),
    staff: str(body.staff),
    software: str(body.software),
    spend: str(body.spend),
    message: str(body.message),
    consent: body.consent === true,
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || (isPlaceholder(site.contact.email) ? "" : site.contact.email);
  const from = process.env.CONTACT_FROM_EMAIL || "Thapsus website <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Business", enquiry.business],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not given"],
    ["Staff", enquiry.staff],
    ["Software they pay for", enquiry.software || "Not given"],
    ["Monthly software spend", enquiry.spend],
    ["Message", enquiry.message || "No message"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<h2 style="font-family:sans-serif">New software review request</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:8px 16px 8px 0;color:#6e6e73">${escape(k)}</th><td style="padding:8px 0;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email not configured. Enquiry received:\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set; enquiry could not be sent.");
    return NextResponse.json(
      { ok: false, error: "Our form isn’t working right now. Please call or email us instead." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: enquiry.email,
      subject: `Software review request: ${enquiry.business}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again, or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
