import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { TextReveal } from "@/components/home/TextReveal";
import { PageIntro } from "@/components/layout/PageIntro";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Thapsus is a small software team in Stockport, Greater Manchester, building and looking after custom software for businesses across the UK.",
  path: "/about",
});

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chat",
    title: "Honesty",
    text: "We’ll tell you when something isn’t worth replacing, even if it means less work for us.",
  },
  {
    icon: "users",
    title: "Fair pricing",
    text: "£200 to start, then one monthly fee. No per-seat charges and no surprise invoices.",
  },
  {
    icon: "forms",
    title: "Plain English",
    text: "Clear proposals, clear updates and clear answers, without the jargon.",
  },
  {
    icon: "backup",
    title: "Long-term relationships",
    text: "We’re here for years, not just for launch. The people who build your system look after it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Software, made personal."
        lead="We’re a small team in Stockport, building software for businesses that deserve better than one size fits all."
      />

      <section aria-labelledby="story-title" className="bg-white pb-28 md:pb-40">
        <div className="wrap">
          <h2 id="story-title" className="sr-only">
            Why we started Thapsus
          </h2>
          <TextReveal
            className="mx-auto max-w-[18em] text-center text-[clamp(2rem,3.4vw+1rem,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em]"
            text="Most businesses don’t need more software. They need the right software, built around them, and someone to call when it matters."
          />
          <div className="mx-auto mt-16 grid max-w-[46rem] gap-6 text-[19px] leading-[1.6] text-graphite md:mt-24">
            <p data-reveal>
              Thapsus started with something we kept seeing: good businesses paying for big, complicated subscriptions, using a
              fraction of what they paid for, and filling the gaps with spreadsheets.
            </p>
            <p data-reveal>
              So we do it differently. We build exactly what a business needs, nothing more, and look after it for a fair monthly
              fee. One team reviews, designs, builds and supports your system, so you never have to explain your business twice.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <div className="text-center">
            <p className="t-eyebrow text-accent" data-reveal>
              What we believe
            </p>
            <h2 id="values-title" className="t-headline mt-3" data-reveal>
              How we work.
            </h2>
          </div>
          <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:gap-5">
            {values.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                className={`flex min-h-[280px] flex-col rounded-[var(--radius-tile)] p-8 md:p-10 ${i === 1 ? "on-dark bg-black text-white" : "bg-white"}`}
              >
                <Icon name={v.icon} className={`size-10 ${i === 1 ? "text-accent-on-dark" : "text-accent"}`} />
                <h3 className="mt-auto pt-10 text-[32px] font-bold tracking-[-0.025em] md:text-[40px]">{v.title}</h3>
                <p className={`mt-3 max-w-[26em] text-[17px] leading-[1.5] ${i === 1 ? "text-night-text" : "text-graphite"}`}>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-title" className="bg-white py-28 md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="t-eyebrow text-accent" data-reveal>
              Our team
            </p>
            <h2 id="team-title" className="t-headline mt-3" data-reveal>
              A team, not a ticket number.
            </h2>
            <p className="t-lead mt-5 text-graphite" data-reveal>
              When you call, you talk to the people who built your system. We stay small on purpose, so we know every system we
              look after inside out.
            </p>
          </div>
          <ul className="grid content-center gap-4 lg:col-span-6">
            {[
              ["The same people from first call to ongoing support", "users"],
              ["Phone, email or in person, whichever suits you", "phone"],
              ["Based in Stockport, working with businesses across the UK", "pin"],
            ].map(([text, icon]) => (
              <li key={text} data-reveal className="flex items-center gap-5 rounded-[20px] bg-mist p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-accent">
                  <Icon name={icon as IconName} className="size-6" />
                </span>
                <span className="text-[17px] font-medium leading-[1.4]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="stockport-title" data-nav-theme="dark" className="on-dark relative overflow-hidden bg-black py-32 text-center text-white md:py-48">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className="absolute rounded-full border border-white/[0.07]"
              style={{ width: `${n * 22}vmax`, height: `${n * 22}vmax` }}
            />
          ))}
        </div>
        <div className="wrap relative">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-white" data-reveal>
            <Icon name="pin" className="size-8" />
          </span>
          <h2 id="stockport-title" className="t-headline mt-8" data-reveal>
            Made in Stockport.
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[28em] text-night-text" data-reveal>
            We’re proud to be based in Stockport, Greater Manchester, and we work with businesses right across the UK.
          </p>
        </div>
      </section>

      <FinalCta title="Let’s talk about your business." />
    </>
  );
}
