import { ScreenCustomer } from "@/components/mockups/Screens";
import { GrowOnScroll } from "./GrowOnScroll";

export function OneSystem() {
  return (
    <section aria-labelledby="one-system-title" className="overflow-hidden bg-mist pb-24 pt-28 md:pb-36 md:pt-40">
      <div className="wrap text-center">
        <p className="t-eyebrow text-accent" data-reveal>
          One system
        </p>
        <h2 id="one-system-title" className="t-headline mx-auto mt-3 max-w-[12em] text-balance" data-reveal>
          One system. Not seven tabs.
        </h2>
        <p className="t-lead mx-auto mt-5 max-w-[30em] text-graphite" data-reveal>
          Enquiries, bookings, jobs, invoices and messages, all connected. Everything about a customer, in one place.
        </p>
      </div>

      <GrowOnScroll className="mt-14 md:mt-20">
        <div className="mx-auto w-full max-w-[1680px] px-4 md:px-6">
          <figure
            data-grow
            role="img"
            aria-label="Example customer record bringing together a customer's enquiry, quote, booking, job, invoice and portal files in one screen"
            className="relative aspect-[16/10] origin-center overflow-hidden rounded-[18px] bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/5 will-change-transform md:aspect-[16/9] md:rounded-[28px] [container-type:inline-size]"
          >
            <div aria-hidden="true">
              <ScreenCustomer />
            </div>
          </figure>
        </div>
      </GrowOnScroll>
      <p className="wrap t-caption mt-6 text-center text-graphite">Screens show sample data.</p>
    </section>
  );
}
