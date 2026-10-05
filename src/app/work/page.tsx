import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageIntro } from "@/components/layout/PageIntro";
import { Laptop } from "@/components/devices/Devices";
import { ScreenChurchFollowUp, ScreenExportERP, ScreenTenderERP } from "@/components/mockups/CaseStudyScreens";
import { Icon } from "@/components/ui/Icon";
import { caseStudies, type CaseStudy } from "@/content/work";
import { approvedTestimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Systems Thapsus has built: a sourcing and export ERP for Heritage Global Solutions, a tender and trade ERP for Cebuka, and a discipleship system for Potter’s House Church.",
  path: "/work",
});

const visuals: Record<CaseStudy["visual"], () => React.JSX.Element> = {
  "export-erp": ScreenExportERP,
  "tender-erp": ScreenTenderERP,
  church: ScreenChurchFollowUp,
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Work"
        title="Built for real organisations."
        lead="Three systems we’ve built and look after, for an exporter in Preston, a mining supplier in Tanzania and a church in the UK."
      />

      {caseStudies.map((study, i) => {
        const Screen = visuals[study.visual];
        const quote = approvedTestimonials.find((t) => t.caseStudy === study.id);
        const tone = i % 2 === 0 ? "bg-mist" : "bg-white";
        const tile = i % 2 === 0 ? "bg-white" : "bg-mist";
        return (
          <section key={study.id} id={study.id} aria-labelledby={`${study.id}-title`} className={`scroll-mt-[120px] overflow-hidden py-24 md:py-36 ${tone}`}>
            <div className="wrap">
              <div className="max-w-[48rem]">
                <p className="t-eyebrow text-accent" data-reveal>
                  {study.client} · {study.type}
                </p>
                <h2 id={`${study.id}-title`} className="t-title mt-3 text-balance" data-reveal>
                  {study.headline}
                </h2>
                <p className="t-lead mt-5 text-graphite" data-reveal>
                  {study.summary}
                </p>
                <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-graphite" data-reveal>
                  <span>{study.sector}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.location}</span>
                  {study.link ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <a href={study.link.href} target="_blank" rel="noopener noreferrer" className="link-more">
                        {study.link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="relative mx-auto mt-14 max-w-[980px] md:mt-20" data-reveal>
                <div className="dv-glow" />
                <Laptop label={`Illustration of the ${study.type.toLowerCase()} built for ${study.client}, using sample data`}>
                  <Screen />
                </Laptop>
                <p className="t-caption mt-6 text-center text-graphite">Illustration based on the real workflow, with sample data.</p>
              </div>

              <dl className="mt-14 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-4 lg:gap-5">
                {study.highlights.map((h) => (
                  <div key={h.label} className={`rounded-[var(--radius-tile)] p-6 md:p-8 ${tile}`} data-reveal>
                    <dt className="sr-only">{h.label}</dt>
                    <dd>
                      <span className="block text-[40px] font-bold leading-none tracking-[-0.035em] text-accent md:text-[52px]">{h.value}</span>
                      <span className="mt-3 block text-[15px] leading-[1.4] text-graphite md:text-[16px]">{h.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
                <div className="grid content-start gap-10 lg:col-span-6">
                  <div data-reveal>
                    <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">The challenge</h3>
                    <p className="mt-3 text-[18px] leading-[1.6]">{study.challenge}</p>
                  </div>
                  <div data-reveal>
                    <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">What we built</h3>
                    <p className="mt-3 text-[18px] leading-[1.6]">{study.built}</p>
                  </div>
                </div>
                <div className="lg:col-span-6" data-reveal>
                  <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-graphite">What it does</h3>
                  <ul className="mt-4 grid gap-3">
                    {study.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[17px] leading-[1.45]">
                        <Icon name="check" className="mt-[3px] size-5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {quote ? (
                <figure className="on-dark mt-14 rounded-[var(--radius-tile)] bg-black p-8 text-white md:mt-20 md:p-14" data-reveal>
                  <blockquote className="text-[24px] font-semibold leading-[1.3] tracking-[-0.02em] md:text-[32px]">“{quote.quote}”</blockquote>
                  <figcaption className="mt-6 text-[15px] text-night-text">
                    <span className="font-semibold text-white">{quote.name}</span> · {quote.role}
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </section>
        );
      })}

      <FinalCta title="Your system could be next." />
    </>
  );
}
