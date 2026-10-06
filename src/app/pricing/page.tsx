import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { Savings } from "@/components/home/Savings";
import { PageIntro } from "@/components/layout/PageIntro";
import { SubNav } from "@/components/layout/SubNav";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/config/site";
import { pricingFaq } from "@/content/faq";
import { formatGBP } from "@/lib/savings";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "£200 to start, then one monthly fee covering hosting, support, security and improvements. Priced per plan, not per seat. See what you could save.",
  path: "/pricing",
});

const placeholder = site.pricing.isPlaceholder;
const money = (n: number | null) => (n === null ? null : placeholder ? "£[X]" : formatGBP(n));
const people = (n: number | null) => (n === null ? null : placeholder ? "[X]" : String(n));
const { startFee, toolFee, maxTools, improvementMinutesPerTool, minimumTermMonths, charityDiscountPercent } = site.pricing;
const pricedPlans = site.pricing.plans.flatMap((p) => (p.teamFee !== null && p.users !== null ? [{ ...p, teamFee: p.teamFee, users: p.users }] : []));
const customPlan = site.pricing.plans.find((p) => p.teamFee === null);
const toolCounts = Array.from({ length: maxTools }, (_, i) => i + 1);
const improvementLine = `${improvementMinutesPerTool} minutes of improvements a month for each tool`;

export default function PricingPage() {
  return (
    <>
      <SubNav
        title="Pricing"
        links={[
          { href: "#model", label: "How pricing works" },
          { href: "#plans", label: "Plans" },
          { href: "#calculator", label: "Calculator" },
          { href: "#faq", label: "FAQ" },
        ]}
      />
      <PageIntro
        title="Simple, fair pricing."
        lead={`${money(startFee)} to start, and nothing more until your system is live. Then one monthly fee for hosting, support, security and improvements.`}
      />

      {/* The model */}
      <section id="model" aria-label="How pricing works" className="scroll-mt-[120px] bg-white pb-24 md:pb-36">
        <div className="wrap grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="rounded-[var(--radius-tile)] bg-mist p-8 md:p-12" data-reveal>
            <p className="text-[15px] font-semibold text-accent">To start</p>
            <h2 className="t-title tabular mt-2">{money(startFee)}</h2>
            <p className="t-lead mt-4 text-graphite">Then nothing more to pay until your system is live.</p>
            <ul className="mt-8 grid gap-2.5">
              {["Your free software review", "Design and build", "Moving your data across", "Training for your team"].map((f) => (
                <li key={f} className="flex gap-3 text-[17px]">
                  <Icon name="check" className="mt-[3px] size-5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="on-dark rounded-[var(--radius-tile)] bg-black p-8 text-white md:p-12" data-reveal>
            <p className="text-[15px] font-semibold text-accent-on-dark">Every month, from go-live</p>
            <h2 className="t-title mt-2">One monthly fee</h2>
            <p className="t-lead mt-4 text-night-text">Often less than the subscriptions it replaces.</p>
            <ul className="mt-8 grid gap-2.5">
              {["UK hosting and monitoring", "Daily backups", "Security updates", "Support and fixes", "Ongoing improvements"].map((f) => (
                <li key={f} className="flex gap-3 text-[17px]">
                  <Icon name="check" className="mt-[3px] size-5 shrink-0 text-accent-on-dark" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Per plan, not per seat */}
      <section aria-labelledby="per-plan-title" className="bg-mist py-28 md:py-40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="t-eyebrow text-accent" data-reveal>
              Per plan, not per seat
            </p>
            <h2 id="per-plan-title" className="t-headline mt-3" data-reveal>
              Grow without the bill.
            </h2>
            <p className="t-lead mt-5 text-graphite" data-reveal>
              Most software charges for every person who logs in. Our plans include a set number of users, so hiring doesn’t
              come with a new invoice.
            </p>
          </div>
          <figure className="rounded-[var(--radius-tile)] bg-white p-6 md:p-10 lg:col-span-7" data-reveal>
            <svg viewBox="0 0 560 320" className="h-auto w-full" role="img" aria-labelledby="per-plan-chart-title per-plan-chart-desc">
              <title id="per-plan-chart-title">How costs grow with team size</title>
              <desc id="per-plan-chart-desc">
                Illustration: per-seat software costs rise with every person added, while a Thapsus plan stays flat until you move
                up a plan.
              </desc>
              <line x1="40" y1="280" x2="540" y2="280" stroke="#d2d2d7" />
              <line x1="40" y1="20" x2="40" y2="280" stroke="#d2d2d7" />
              <path
                d="M40 262 L90 262 L90 244 L140 244 L140 226 L190 226 L190 208 L240 208 L240 190 L290 190 L290 172 L340 172 L340 154 L390 154 L390 136 L440 136 L440 118 L490 118 L490 100 L540 100"
                fill="none"
                stroke="#86868b"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M40 222 L300 222 L300 182 L540 182" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
              <text x="536" y="90" textAnchor="end" fontSize="15" fontWeight="600" fill="#6e6e73">
                Per-seat software
              </text>
              <text x="536" y="172" textAnchor="end" fontSize="15" fontWeight="600" fill="var(--accent)">
                Thapsus plan
              </text>
              <text x="290" y="306" textAnchor="middle" fontSize="13" fill="#6e6e73">
                Team size →
              </text>
              <text x="16" y="150" textAnchor="middle" fontSize="13" fill="#6e6e73" transform="rotate(-90 16 150)">
                Monthly cost →
              </text>
            </svg>
            <figcaption className="t-caption mt-3 text-graphite">Illustration only, not to scale.</figcaption>
          </figure>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" aria-labelledby="plans-title" className="scroll-mt-[120px] bg-white py-28 md:py-40">
        <div className="wrap">
          <div className="text-center">
            <p className="t-eyebrow text-accent" data-reveal>
              Plans
            </p>
            <h2 id="plans-title" className="t-headline mt-3" data-reveal>
              Pick your team size.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[32em] text-graphite" data-reveal>
              Then add the tools you need, at {money(toolFee)} a month each. Every plan includes hosting, backups, security updates and
              support.
            </p>
          </div>
        </div>

        <div className="wrap-wide">
          <div className="mx-auto max-w-[1280px]">
            <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {pricedPlans.map((plan) => {
                const dark = plan.id === "team";
                const muted = dark ? "text-night-text" : "text-graphite";
                return (
                  <li
                    key={plan.id}
                    data-reveal
                    className={`flex flex-col rounded-[var(--radius-tile)] p-8 md:p-9 ${dark ? "on-dark bg-black text-white" : "bg-mist"}`}
                  >
                    <h3 className="text-[28px] font-bold tracking-[-0.025em]">{plan.name}</h3>
                    <p className={`mt-2 text-[17px] ${muted}`}>{plan.summary}</p>

                    <div className="mt-8">
                      <p className={`text-[15px] ${muted}`}>From</p>
                      <p className="tabular mt-1 text-[40px] font-bold leading-none tracking-[-0.035em]">
                        {money(plan.teamFee + toolFee)}
                      </p>
                      <p className={`mt-2 text-[17px] font-medium ${muted}`}>+ VAT a month, with 1 tool</p>
                      <p className={`mt-3 text-[15px] leading-[1.45] ${muted}`}>Extra tools {money(toolFee)} a month each.</p>
                      <p className={`mt-1 text-[15px] ${muted}`}>Plus {money(startFee)} to start.</p>
                      <p className="mt-4 text-[17px] font-medium">Up to {people(plan.users)} people</p>
                    </div>

                    <ul className={`mt-6 grid gap-2.5 border-t pt-6 ${dark ? "border-white/15" : "border-line"}`}>
                      {[...plan.features, improvementLine, `Support: ${plan.supportHours}`].map((f) => (
                        <li key={f} className="flex gap-3 text-[16px] leading-[1.45]">
                          <Icon name="check" className={`mt-[2px] size-5 shrink-0 ${dark ? "text-accent-on-dark" : "text-accent"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-10">
                      <ButtonLink href="/contact" tone={dark ? "dark" : "light"} variant={dark ? "primary" : "secondary"} className="w-full">
                        Book a free review
                      </ButtonLink>
                    </div>
                  </li>
                );
              })}
            </ul>

            {customPlan ? (
              <div
                className="mt-4 grid gap-8 rounded-[var(--radius-tile)] bg-mist p-8 md:mt-5 md:grid-cols-12 md:items-center md:gap-10 md:p-9"
                data-reveal
              >
                <div className="md:col-span-4">
                  <h3 className="text-[28px] font-bold tracking-[-0.025em]">{customPlan.name}</h3>
                  <p className="mt-2 text-[17px] text-graphite">{customPlan.summary}</p>
                  <p className="mt-6 text-[32px] font-bold leading-none tracking-[-0.03em]">Get a quote</p>
                </div>
                <ul className="grid gap-2.5 sm:grid-cols-2 md:col-span-5">
                  {[...customPlan.features, `Support: ${customPlan.supportHours}`].map((f) => (
                    <li key={f} className="flex gap-3 text-[16px] leading-[1.45]">
                      <Icon name="check" className="mt-[2px] size-5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-3 md:text-right">
                  <ButtonLink href="/contact" variant="secondary" className="w-full md:w-auto">
                    Talk to us
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="wrap">
          {/* Every price, so nothing is hidden behind "from" */}
          <div className="mx-auto mt-16 max-w-[52rem] md:mt-20" data-reveal>
            <table className="tabular w-full border-collapse text-left text-[13px] min-[360px]:text-[14px] sm:text-[16px]">
              <caption className="t-tile mb-5 text-left">Monthly price by number of tools</caption>
              <thead>
                <tr className="border-b border-line text-graphite">
                  <th scope="col" className="py-3 pr-2 font-semibold">
                    Plan
                  </th>
                  {toolCounts.map((n) => (
                    <th key={n} scope="col" className="px-1 py-3 text-right font-semibold sm:px-2">
                      {n}
                      <span className="sr-only sm:not-sr-only"> {n === 1 ? "tool" : "tools"}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricedPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-line">
                    <th scope="row" className="py-3 pr-2 font-semibold">
                      {plan.name}
                      <span className="block text-[12px] font-normal text-graphite sm:text-[13px]">up to {people(plan.users)} people</span>
                    </th>
                    {toolCounts.map((n) => (
                      <td key={n} className="px-1 py-3 text-right sm:px-2">
                        {money(plan.teamFee + toolFee * n)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="t-caption mx-auto mt-8 max-w-[44em] text-center text-graphite">
            {placeholder ? "Prices to be confirmed. " : ""}All prices exclude VAT. Monthly fees start when your system goes live, with a{" "}
            {minimumTermMonths}-month minimum term.
            {charityDiscountPercent ? ` Charities and churches get ${charityDiscountPercent}% off the monthly fee.` : ""} Your exact price is fixed in
            your written proposal.
          </p>
        </div>
      </section>

      <Savings showExample={false} />

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-[120px] bg-mist py-28 md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="t-title" data-reveal>
              Questions.
            </h2>
            <p className="t-lead mt-5 text-graphite" data-reveal>
              Straight answers. If yours isn’t here, just ask.
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={pricingFaq} />
          </div>
        </div>
      </section>

      <FinalCta title="Find out what you’d pay." />
    </>
  );
}
