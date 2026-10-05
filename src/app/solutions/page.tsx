import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { PageIntro } from "@/components/layout/PageIntro";
import { SubNav } from "@/components/layout/SubNav";
import { SolutionVisual } from "@/components/mockups/SolutionVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Custom CRMs, booking systems, job management, client portals, ERP, HR, helpdesks, membership systems and websites, built around how your business works.",
  path: "/solutions",
});

const spans = ["lg:col-span-3", "lg:col-span-3", ...Array(9).fill("lg:col-span-2"), "lg:col-span-3", "lg:col-span-3"];

export default function SolutionsPage() {
  return (
    <>
      <SubNav
        title="Solutions"
        links={[
          { href: "#all", label: "Overview" },
          { href: "#crm", label: "CRM" },
          { href: "#booking", label: "Bookings" },
          { href: "#jobs", label: "Jobs" },
          { href: "#portals", label: "Portals" },
          { href: "#erp", label: "ERP" },
        ]}
      />
      <PageIntro
        title="Tools that fit."
        lead="We replace off-the-shelf subscriptions with software shaped around your business. Here’s what we build most often."
      />

      {/* Overview bento */}
      <section id="all" aria-label="All solutions" className="bg-white pb-24 md:pb-36">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {solutions.map((s, i) => {
              const big = spans[i] === "lg:col-span-3";
              const dark = i === 1 || i === 11;
              return (
                <li key={s.id} className={spans[i]} data-reveal>
                  <a
                    href={`#${s.id}`}
                    className={`group flex h-full flex-col rounded-[var(--radius-tile)] p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-9 ${
                      dark ? "on-dark bg-black text-white" : "bg-mist"
                    } ${big ? "min-h-[300px]" : "min-h-[250px]"}`}
                  >
                    <span className={dark ? "text-accent-on-dark" : "text-accent"}>
                      <Icon name={s.icon} className={big ? "size-12" : "size-10"} />
                    </span>
                    <span className={`mt-auto pt-8 text-[15px] font-semibold ${dark ? "text-accent-on-dark" : "text-accent"}`}>{s.name}</span>
                    <span className={`mt-1.5 block font-bold tracking-[-0.025em] ${big ? "text-[32px] leading-[1.08] md:text-[40px]" : "text-[24px] leading-[1.12]"}`}>
                      {s.title}
                    </span>
                    <span className="link-more mt-4 text-[15px]">Learn more</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Detail for each solution */}
      {solutions.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`scroll-mt-[120px] overflow-hidden py-24 md:py-32 ${i % 2 === 0 ? "bg-mist" : "bg-white"}`}
          >
            <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`} data-reveal>
                <p className="t-eyebrow flex items-center gap-2 text-accent">
                  <Icon name={s.icon} className="size-5" />
                  {s.name}
                </p>
                <h2 id={`${s.id}-title`} className="t-title mt-3">
                  {s.title}
                </h2>
                <p className="t-lead mt-4 text-graphite">{s.summary}</p>

                <h3 className="mt-9 text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">Typical features</h3>
                <ul className="mt-3 grid gap-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[17px] leading-[1.45]">
                      <Icon name="check" className="mt-[3px] size-5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                <dl className="mt-9 grid gap-5 border-t border-line pt-7 sm:grid-cols-2">
                  <div>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">Who it’s for</dt>
                    <dd className="mt-2 text-[16px] leading-[1.5]">{s.whoFor}</dd>
                  </div>
                  <div>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">Replaces</dt>
                    <dd className="mt-2 text-[16px] leading-[1.5]">{s.replaces}</dd>
                  </div>
                </dl>
              </div>
              <div className={`relative lg:col-span-7 ${flip ? "lg:order-1" : ""}`} data-reveal>
                <div className="dv-glow" />
                <SolutionVisual id={s.id} name={s.name} />
              </div>
            </div>
          </section>
        );
      })}

      {/* Don't see your tool? */}
      <section aria-labelledby="missing-title" className="bg-white py-24 md:py-36">
        <div className="wrap">
          <div className="rounded-[var(--radius-tile)] bg-mist px-7 py-14 text-center md:px-16 md:py-20" data-reveal>
            <h2 id="missing-title" className="t-title">
              Don’t see your tool?
            </h2>
            <p className="t-lead mx-auto mt-4 max-w-[30em] text-graphite">
              Tell us what you use and we’ll tell you honestly whether it’s worth replacing.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" size="lg">
                Tell us what you use
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
