"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { buttonClasses } from "@/components/ui/Button";
import { isPlaceholder, site } from "@/config/site";

/**
 * Cal.com booking calendar. It sets third-party cookies, so it only loads once
 * the visitor allows it. The direct link always works without cookies here.
 */
export function BookingCalendar() {
  const { consent, save } = useConsent();
  const link = site.booking.calLink;

  if (isPlaceholder(link)) {
    return (
      <div className="grid min-h-[320px] place-items-center rounded-[var(--radius-tile)] border-2 border-dashed border-line p-8 text-center">
        <p className="max-w-[26em] text-[17px] text-graphite">
          [CAL.COM BOOKING CALENDAR — add your Cal.com link to <code className="text-ink">booking.calLink</code> in src/config/site.ts]
        </p>
      </div>
    );
  }

  const url = `https://cal.com/${link.replace(/^\/+/, "")}`;

  if (consent?.embeds) {
    return (
      <iframe
        src={`${url}?embed=true&layout=month_view&theme=light`}
        title="Book a call with Thapsus"
        loading="lazy"
        className="h-[720px] w-full rounded-[var(--radius-tile)] border border-line bg-white"
      />
    );
  }

  return (
    <div className="grid min-h-[320px] place-items-center rounded-[var(--radius-tile)] bg-mist p-8 text-center">
      <div className="max-w-[28em]">
        <p className="text-[19px] font-semibold tracking-[-0.01em]">Pick a time that suits you.</p>
        <p className="mt-2 text-[15px] leading-[1.5] text-graphite">
          Our booking calendar is provided by Cal.com, which sets its own cookies. It only loads if you allow it.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => save({ analytics: consent?.analytics ?? false, embeds: true })}
            className={buttonClasses({})}
          >
            Show the calendar
          </button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="link-more text-[15px]">
            Open on cal.com
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
