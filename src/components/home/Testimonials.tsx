import Link from "next/link";
import { caseStudyVisuals } from "@/components/mockups/CaseStudyVisuals";
import { approvedTestimonials } from "@/content/testimonials";
import { caseStudies } from "@/content/work";

/**
 * Client proof on the Home page: one card per project from the Work page.
 * A card shows the client's approved quote when there is one, otherwise the
 * project headline.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="recent-work-title" className="bg-white py-28 md:py-40">
      <div className="wrap">
        <div className="text-center">
          <p className="t-eyebrow text-accent" data-reveal>
            Recent work
          </p>
          <h2 id="recent-work-title" className="t-headline mt-3" data-reveal>
            Built and looked after by us.
          </h2>
        </div>
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {caseStudies.map((study, i) => {
            const Visual = caseStudyVisuals[study.visual];
            const quote = approvedTestimonials.find((t) => t.caseStudy === study.id);
            const dark = i === 1;
            const muted = dark ? "text-night-text" : "text-graphite";
            return (
              <li key={study.id} data-reveal>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[var(--radius-tile)] p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10 ${
                    dark ? "on-dark bg-black text-white" : "bg-mist"
                  }`}
                >
                  <div className="pointer-events-none mb-8 flex aspect-[16/11] items-center">
                    <div className="w-full">
                      <Visual decorative />
                    </div>
                  </div>
                  <p className={`text-[15px] font-semibold ${dark ? "text-accent-on-dark" : "text-accent"}`}>{study.type}</p>
                  <h3 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-[-0.025em]">{study.client}</h3>
                  {quote ? (
                    <blockquote className="mt-4 text-[19px] font-semibold leading-[1.4] tracking-[-0.01em]">“{quote.quote}”</blockquote>
                  ) : (
                    <p className={`mt-3 text-[17px] leading-[1.45] ${muted}`}>{study.headline}</p>
                  )}
                  <p className={`mt-auto pt-8 text-[15px] ${muted}`}>
                    {study.sector} · {study.location}
                  </p>
                  <Link href={`/work#${study.id}`} className="link-more mt-3 text-[15px] before:absolute before:inset-0 before:content-['']">
                    Read the case study<span className="sr-only">: {study.client}</span>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
