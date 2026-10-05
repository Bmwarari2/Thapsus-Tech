"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/config/site";
import { limits, spendOptions, staffOptions, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";

type Status = "idle" | "sending" | "sent" | "error";

const empty: Enquiry = { name: "", business: "", email: "", phone: "", staff: "", software: "", spend: "", message: "", consent: false };

const inputClass =
  "w-full rounded-[14px] border border-line bg-white px-4 text-[17px] text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-[#a1a1a6] " +
  "focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)] focus:outline-none " +
  "aria-[invalid=true]:border-[#c4281c]";

export function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [startedAt] = useState(() => Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? "", startedAt }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setServerError(data.error || "Something went wrong. Please try again, or call us.");
      setStatus("error");
    } catch {
      setServerError("We couldn’t reach our server. Check your connection and try again, or call us.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[var(--radius-tile)] bg-mist p-8 text-center md:p-14" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-[28px] text-white" aria-hidden="true">
          ✓
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="t-title mt-6 outline-none">
          Thank you, {values.name.split(" ")[0]}.
        </h2>
        <p className="t-lead mx-auto mt-4 max-w-[26em] text-graphite">
          We’ve got your details and we’ll be in touch soon to arrange your free review.
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, msg]) => msg) as [keyof Enquiry, string][];
  const fieldId = (key: keyof Enquiry) => `${uid}-${key}`;
  const describedBy = (key: keyof Enquiry, hint?: boolean) =>
    [errors[key] ? `${fieldId(key)}-error` : "", hint ? `${fieldId(key)}-hint` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form noValidate onSubmit={onSubmit} className="relative rounded-[var(--radius-tile)] bg-mist p-6 md:p-10" aria-describedby={`${uid}-required`}>
      {errorList.length ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[18px] border border-[#f1c5c0] bg-[#fdf0ee] p-5 text-[15px] text-[#8a1f15] outline-none"
        >
          <p className="font-semibold">Please check {errorList.length === 1 ? "one thing" : `${errorList.length} things`}:</p>
          <ul className="mt-2 grid gap-1">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${fieldId(key)}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p id={`${uid}-required`} className="mb-6 text-[14px] text-graphite">
        Fields marked * are required.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id={fieldId("name")} label="Your name" required error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id={fieldId("business")} label="Business name" required error={errors.business}>
          <input
            id={fieldId("business")}
            name="business"
            autoComplete="organization"
            maxLength={limits.business}
            value={values.business}
            onChange={(e) => set("business", e.target.value)}
            aria-invalid={Boolean(errors.business)}
            aria-describedby={describedBy("business")}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id={fieldId("email")} label="Email" required error={errors.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id={fieldId("phone")} label="Phone" optional error={errors.phone}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={limits.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id={fieldId("staff")} label="Number of staff" required error={errors.staff}>
          <select
            id={fieldId("staff")}
            name="staff"
            value={values.staff}
            onChange={(e) => set("staff", e.target.value)}
            aria-invalid={Boolean(errors.staff)}
            aria-describedby={describedBy("staff")}
            className={`${inputClass} h-[52px] appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e6e73%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}
          >
            <option value="">Choose…</option>
            {staffOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id={fieldId("spend")} label="Monthly software spend" required error={errors.spend}>
          <select
            id={fieldId("spend")}
            name="spend"
            value={values.spend}
            onChange={(e) => set("spend", e.target.value)}
            aria-invalid={Boolean(errors.spend)}
            aria-describedby={describedBy("spend")}
            className={`${inputClass} h-[52px] appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e6e73%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}
          >
            <option value="">Choose…</option>
            {spendOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field
            id={fieldId("software")}
            label="Which software do you currently pay for?"
            optional
            hint="For example: a CRM, booking app, project board or helpdesk. Names and rough costs help."
            error={errors.software}
          >
            <textarea
              id={fieldId("software")}
              name="software"
              rows={3}
              maxLength={limits.software}
              value={values.software}
              onChange={(e) => set("software", e.target.value)}
              aria-invalid={Boolean(errors.software)}
              aria-describedby={describedBy("software", true)}
              className={`${inputClass} py-3.5`}
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field id={fieldId("message")} label="Anything else we should know?" optional error={errors.message}>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={5}
              maxLength={limits.message}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
              className={`${inputClass} py-3.5`}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-px w-px overflow-hidden opacity-0 [clip-path:inset(50%)]">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input ref={honeypotRef} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-7">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5]">
          <input
            id={fieldId("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]"
          />
          <span>
            I’m happy for {site.name} to contact me about this enquiry. We’ll only use your details to reply. See our{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2">
              privacy policy
            </Link>
            . *
          </span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-2 pl-8 text-[14px] text-[#b42318]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p role="alert" className="mt-6 rounded-[14px] bg-[#fdf0ee] p-4 text-[15px] text-[#8a1f15]">
          {serverError}{" "}
          <a href={`tel:${site.contact.phoneHref}`} className="font-semibold underline underline-offset-2">
            {site.contact.phoneDisplay}
          </a>
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className={buttonClasses({ size: "lg", className: "mt-8 w-full md:w-auto" })}>
        {status === "sending" ? "Sending…" : "Book my free review"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="font-normal text-graphite"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 text-[14px] text-graphite">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[14px] text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
