import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BookingCalendar } from "@/components/contact/BookingCalendar";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Icon } from "@/components/ui/Icon";
import { isPlaceholder, site } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a free software review",
  description:
    "Tell us which software you pay for and how your team works. Thapsus will review it for free and tell you honestly what’s worth replacing.",
  path: "/contact",
});

const next = [
  { title: "We get in touch", text: "Usually by phone or email, to find a time that suits you." },
  { title: "Your free review", text: "A short conversation about your tools, your costs and how your team works." },
  { title: "An honest answer", text: "A plain-English summary of what’s worth replacing, and what isn’t." },
];

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageIntro
        eyebrow="Book a review"
        title="Book a free software review."
        lead="Tell us a little about your business. We’ll look at what you pay for and tell you honestly whether it’s worth replacing."
      />

      <section aria-label="Enquiry form and contact details" className="bg-white pb-24 md:pb-32">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <aside className="grid content-start gap-10 lg:col-span-5">
            <div>
              <h2 className="text-[24px] font-bold tracking-[-0.02em]">What happens next</h2>
              <ol className="mt-6 grid gap-6">
                {next.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="tabular grid size-9 shrink-0 place-items-center rounded-full bg-accent-wash text-[15px] font-semibold text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold">{step.title}</h3>
                      <p className="mt-1 text-[16px] leading-[1.5] text-graphite">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="on-dark rounded-[var(--radius-tile)] bg-black p-8 text-white">
              <h2 className="text-[24px] font-bold tracking-[-0.02em]">Rather talk now?</h2>
              <ul className="mt-6 grid gap-4 text-[17px]">
                <li className="flex items-center gap-3">
                  <Icon name="phone" className="size-5 text-accent-on-dark" />
                  <a href={`tel:${contact.phoneHref}`} className="hover:underline">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="mail" className="size-5 text-accent-on-dark" />
                  {isPlaceholder(contact.email) ? (
                    <span>{contact.email}</span>
                  ) : (
                    <a href={`mailto:${contact.email}`} className="hover:underline">
                      {contact.email}
                    </a>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="pin" className="size-5 text-accent-on-dark" />
                  {contact.locality}, UK
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="book" aria-labelledby="book-title" className="scroll-mt-[120px] bg-mist py-24 md:py-32">
        <div className="wrap">
          <div className="mb-10 text-center md:mb-14">
            <h2 id="book-title" className="t-title">
              Prefer to pick a time?
            </h2>
            <p className="t-lead mx-auto mt-4 max-w-[30em] text-graphite">Book a call straight into our calendar.</p>
          </div>
          <div className="mx-auto max-w-[960px]">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </>
  );
}
