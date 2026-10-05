/** Visitor cookie choices, stored in a strictly necessary first-party cookie. */
export type Consent = {
  v: 1;
  /** Google Analytics 4 */
  analytics: boolean;
  /** Third-party embeds that set cookies (the Cal.com booking calendar) */
  embeds: boolean;
  at: string;
};

export const CONSENT_COOKIE = "thapsus_consent";
const MAX_AGE = 60 * 60 * 24 * 182; // about 6 months

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    return parsed && parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Pick<Consent, "analytics" | "embeds">): Consent {
  const consent: Consent = { v: 1, ...choice, at: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  return consent;
}

/** Removes Google Analytics cookies from this host and its parent domains. */
export function clearAnalyticsCookies() {
  const names = document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid" || n === "_gat");
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  names.forEach((name) =>
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
    }),
  );
}
