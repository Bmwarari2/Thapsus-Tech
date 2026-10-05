"use client";

import Link from "next/link";
import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { useLenis } from "@/components/motion/MotionProvider";
import { site } from "@/config/site";
import { clearAnalyticsCookies, readConsent, writeConsent, type Consent } from "@/lib/consent";

type Choice = Pick<Consent, "analytics" | "embeds">;

type ConsentApi = {
  /** undefined while loading, null if the visitor hasn't chosen yet */
  consent: Consent | null | undefined;
  save: (choice: Choice) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentApi>({ consent: undefined, save: () => {}, openSettings: () => {} });
export const useConsent = () => useContext(ConsentContext);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setConsent(readConsent()));
    return () => cancelAnimationFrame(id);
  }, []);

  const save = useCallback(
    (choice: Choice) => {
      const hadAnalytics = consent?.analytics === true;
      setConsent(writeConsent(choice));
      setSettingsOpen(false);
      if (hadAnalytics && !choice.analytics) {
        // Withdrawing consent: remove analytics cookies and reload so the script is gone.
        clearAnalyticsCookies();
        window.location.reload();
      }
    },
    [consent],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);

  // Any element with data-cookie-settings (e.g. the footer link) opens the settings.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("[data-cookie-settings]")) {
        e.preventDefault();
        setSettingsOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, save, openSettings }}>
      {children}
      {consent === null && !settingsOpen ? <ConsentBanner onSave={save} onManage={openSettings} /> : null}
      <ConsentSettings open={settingsOpen} current={consent ?? null} onSave={save} onClose={() => setSettingsOpen(false)} />
      {consent?.analytics ? <GoogleAnalytics /> : null}
    </ConsentContext.Provider>
  );
}

function ConsentBanner({ onSave, onManage }: { onSave: (c: Choice) => void; onManage: () => void }) {
  return (
    <section
      aria-label="Cookie choices"
      className="rise fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[440px]"
      style={{ ["--rise-from" as string]: "24px" }}
    >
      <div className="rounded-[24px] border border-black/[0.06] bg-white/[0.92] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[20px] backdrop-saturate-[180%]">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em]">Cookies, only if you say yes.</h2>
        <p className="mt-2 text-[15px] leading-[1.5] text-graphite">
          We’d like to use analytics cookies to understand how the site is used, and to show a booking calendar that sets its
          own cookies. Nothing optional is set unless you agree.{" "}
          <Link href="/cookies" className="text-accent underline underline-offset-2">
            Cookie policy
          </Link>
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onSave({ analytics: false, embeds: false })} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
            Reject
          </button>
          <button type="button" onClick={() => onSave({ analytics: true, embeds: true })} className={buttonClasses({ className: "w-full" })}>
            Accept
          </button>
        </div>
        <button type="button" onClick={onManage} className="mt-3 w-full py-1.5 text-center text-[14px] text-accent hover:underline">
          Choose cookies
        </button>
      </div>
    </section>
  );
}

function ConsentSettings({
  open,
  current,
  onSave,
  onClose,
}: {
  open: boolean;
  current: Consent | null;
  onSave: (c: Choice) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const [analytics, setAnalytics] = useState(false);
  const [embeds, setEmbeds] = useState(false);
  const [syncedFor, setSyncedFor] = useState<boolean | null>(null);

  // Reflect the saved choice each time the dialog opens.
  if (open && syncedFor !== true) {
    setSyncedFor(true);
    setAnalytics(current?.analytics ?? false);
    setEmbeds(current?.embeds ?? false);
  }
  if (!open && syncedFor !== false) setSyncedFor(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) lenis?.start();
  }, [open, lenis]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cookie-settings-title"
      onClose={onClose}
      onCancel={onClose}
      className="m-auto w-[min(560px,calc(100vw-24px))] rounded-[28px] bg-white p-0 text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-settings-title" className="text-[28px] font-bold tracking-[-0.025em]">
            Cookie settings
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 -mt-1 grid size-10 place-items-center rounded-full text-[22px] text-graphite hover:bg-mist">
            ×
          </button>
        </div>
        <p className="mt-2 text-[15px] leading-[1.5] text-graphite">
          Choose which optional cookies we can use. You can change this at any time from the footer.
        </p>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          <SettingRow title="Strictly necessary" text="Remembers your cookie choices. Always on." checked disabled />
          <SettingRow
            title="Analytics"
            text="Google Analytics helps us see which pages are useful. Sets _ga cookies."
            checked={analytics}
            onChange={setAnalytics}
          />
          <SettingRow
            title="Booking calendar"
            text="Shows the Cal.com calendar on our contact page, which sets its own cookies."
            checked={embeds}
            onChange={setEmbeds}
          />
        </ul>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
          <button type="button" onClick={() => onSave({ analytics: false, embeds: false })} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
            Reject all
          </button>
          <button type="button" onClick={() => onSave({ analytics, embeds })} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
            Save choices
          </button>
          <button type="button" onClick={() => onSave({ analytics: true, embeds: true })} className={buttonClasses({ className: "w-full" })}>
            Accept all
          </button>
        </div>
        <p className="mt-5 text-center text-[13px] text-graphite">
          More detail in our{" "}
          <Link href="/cookies" onClick={onClose} className="text-accent underline underline-offset-2">
            cookie policy
          </Link>
          .
        </p>
      </div>
    </dialog>
  );
}

function SettingRow({
  title,
  text,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const id = `cookie-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <li className="flex items-start justify-between gap-6 py-4">
      <div>
        <label htmlFor={id} className="text-[17px] font-semibold">
          {title}
        </label>
        <p id={`${id}-desc`} className="mt-1 text-[14px] leading-[1.45] text-graphite">
          {text}
        </p>
      </div>
      <span className="relative mt-1 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-describedby={`${id}-desc`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer h-[31px] w-[51px] cursor-pointer appearance-none rounded-full bg-[#e3e3e8] transition-colors duration-300 checked:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[2px] top-[2px] size-[27px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[var(--ease-out-expo)] peer-checked:translate-x-[20px]"
        />
      </span>
    </li>
  );
}

/** Google Analytics 4, loaded only after the visitor accepts analytics cookies. */
function GoogleAnalytics() {
  const id = site.analytics.gaMeasurementId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
