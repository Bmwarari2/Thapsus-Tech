import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { PageIntro } from "@/components/layout/PageIntro";
import { SolutionVisual } from "@/components/mockups/SolutionVisual";
import { caseStudies } from "@/content/work";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Systems Thapsus has built for UK organisations, including an ERP system and a church discipleship system.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Work"
        title="Built for real organisations."
        lead="A look at systems we’ve built, from ERP to church discipleship. Full case studies are on the way."
      />

      {caseStudies.map((study, i) => (
        <section
          key={study.id}
          id={study.id}
          aria-labelledby={`${study.id}-title`}
          className={`scroll-mt-[120px] overflow-hidden py-24 md:py-36 ${i % 2 === 0 ? "bg-mist" : "bg-white"}`}
        >
          <div className="wrap">
            <div className="max-w-[46rem]">
              <p className="t-eyebrow text-accent" data-reveal>
                Case study · {study.type}
              </p>
              <h2 id={`${study.id}-title`} className="t-title mt-3" data-reveal>
                {study.headline}
              </h2>
            </div>

            <div className="relative mx-auto mt-14 max-w-[960px] md:mt-20" data-reveal>
              <div className="dv-glow" />
              <SolutionVisual id={study.visual} name={study.type} />
              <p className="t-caption mt-6 text-center text-graphite">Illustration with sample data, not the client’s system.</p>
            </div>

            <dl className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {[
                ["Client", study.clientType],
                ["The problem", study.problem],
                ["What we built", study.built],
                ["Results", study.results],
              ].map(([label, text], j) => (
                <div
                  key={label}
                  data-reveal
                  className={`rounded-[var(--radius-tile)] p-7 md:p-8 ${j === 3 ? "on-dark bg-black text-white" : i % 2 === 0 ? "bg-white" : "bg-mist"}`}
                >
                  <dt className={`text-[14px] font-semibold ${j === 3 ? "text-accent-on-dark" : "text-accent"}`}>
                    {String(j + 1).padStart(2, "0")} · {label}
                  </dt>
                  <dd className={`mt-3 text-[17px] leading-[1.5] ${j === 3 ? "text-night-text" : "text-graphite"}`}>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      <FinalCta title="Your system could be next." />
    </>
  );
}
