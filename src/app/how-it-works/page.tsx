import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { PageIntro } from "@/components/layout/PageIntro";
import { SubNav } from "@/components/layout/SubNav";
import { Icon, type IconName } from "@/components/ui/Icon";
import { steps } from "@/content/process";

export const metadata: Metadata = pageMetadata({
  title: "How it works",
  description:
    "From a free software review to a fixed quote, a careful build and ongoing support. How Thapsus replaces your subscriptions and moves your data across.",
  path: "/how-it-works",
});

const migration = [
  { title: "Export", text: "We take everything out of the tools you use now: customers, jobs, history and files." },
  { title: "Clean and match", text: "We tidy duplicates and match your old data to the new system, field by field." },
  { title: "Import and check", text: "We bring it in and check it with you, so nothing goes missing." },
  { title: "Switch over", text: "We run old and new side by side if needed, then switch when you’re happy." },
];

const support: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Hosting and security", text: "UK hosting, monitored, with security updates applied for you." },
  { icon: "backup", title: "Daily backups", text: "Kept for as long as you need them." },
  { icon: "chat", title: "Support from people who know it", text: "The team that built your system answers when you need help." },
  { icon: "sparkle", title: "Improvements", text: "Small changes and new ideas, as your business grows." },
  { icon: "data", title: "Your data, always", text: "Export it whenever you like, in standard formats." },
  { icon: "users", title: "Priced per plan", text: "No per-seat bills when your team grows." },
];

export default function HowItWorksPage() {
  return (
    <>
      <SubNav
        title="How it works"
        links={[
          { href: "#steps", label: "The four steps" },
          { href: "#data", label: "Your data" },
          { href: "#support", label: "Support" },
        ]}
      />
      <PageIntro
        eyebrow="How it works"
        title="Four steps. No surprises."
        lead="A fixed price before we start, a system your team helps shape, and a team who stays with you after launch."
      />

      <section id="steps" aria-label="The four steps" className="scroll-mt-[120px] bg-white pb-24 md:pb-36">
        <div className="wrap">
          <ol className="relative grid gap-5">
            {steps.map((step) => (
              <li key={step.id} id={step.id} className="scroll-mt-[120px] rounded-[var(--radius-tile)] bg-mist p-7 md:p-12" data-reveal>
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-full bg-white text-accent">
                        <Icon name={step.icon} className="size-6" />
                      </span>
                      <span className="tabular text-[15px] font-semibold text-graphite">Step {step.number}</span>
                    </div>
                    <h2 className="t-title mt-6">{step.title}</h2>
                    <p className="t-lead mt-4 max-w-[30em] text-graphite">{step.summary}</p>
                  </div>
                  <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-medium lg:col-span-5 lg:justify-self-end">
                    <span className="text-graphite">Typical timeline</span>
                    <span className="tabular">{step.timeline}</span>
                  </p>
                </div>
                <dl className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 lg:gap-5">
                  {[
                    ["What you do", step.you],
                    ["What we do", step.we],
                    ["What you get", step.get],
                  ].map(([label, text], i) => (
                    <div key={label} className={`rounded-[20px] p-6 md:p-7 ${i === 2 ? "on-dark bg-black text-white" : "bg-white"}`}>
                      <dt className={`text-[14px] font-semibold ${i === 2 ? "text-accent-on-dark" : "text-accent"}`}>{label}</dt>
                      <dd className={`mt-2.5 text-[17px] leading-[1.5] ${i === 2 ? "text-white" : ""}`}>{text}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="data" aria-labelledby="data-title" data-nav-theme="dark" className="on-dark scroll-mt-[120px] bg-black py-28 text-white md:py-40">
        <div className="wrap">
          <div className="max-w-[40rem]">
            <p className="t-eyebrow text-accent-on-dark" data-reveal>
              Moving your data
            </p>
            <h2 id="data-title" className="t-headline mt-3" data-reveal>
              Your data comes with you.
            </h2>
            <p className="t-lead mt-5 text-night-text" data-reveal>
              Most tools let you export everything. Where one doesn’t, we’ll find another way, or tell you up front before you
              commit to anything.
            </p>
          </div>
          <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {migration.map((m, i) => (
              <li key={m.title} className="rounded-[var(--radius-tile)] bg-night p-7 md:p-8" data-reveal>
                <span className="tabular text-[44px] font-bold leading-none tracking-[-0.04em] text-accent-on-dark">{i + 1}</span>
                <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.02em]">{m.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.5] text-night-text">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="support" aria-labelledby="support-title" className="scroll-mt-[120px] bg-mist py-28 md:py-40">
        <div className="wrap">
          <div className="text-center">
            <p className="t-eyebrow text-accent" data-reveal>
              After launch
            </p>
            <h2 id="support-title" className="t-headline mt-3" data-reveal>
              We’re still here.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[30em] text-graphite" data-reveal>
              One monthly fee covers everything it takes to keep your system running well.
            </p>
          </div>
          <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {support.map((s) => (
              <li key={s.title} className="rounded-[var(--radius-tile)] bg-white p-8" data-reveal>
                <Icon name={s.icon} className="size-9 text-accent" />
                <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.5] text-graphite">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="t-caption mt-8 text-center text-graphite">
            Support hours and response times: [SUPPORT HOURS AND RESPONSE TIMES — to be confirmed].
          </p>
        </div>
      </section>

      <FinalCta title="Start with a free review." />
    </>
  );
}
