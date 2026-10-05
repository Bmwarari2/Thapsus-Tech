import Link from "next/link";
import { caseStudyVisuals } from "@/components/mockups/CaseStudyVisuals";
import { approvedTestimonials } from "@/content/testimonials";
import { caseStudies } from "@/content/work";

/**
 * Client proof on the Home page. Shows approved testimonials once there are
 * any; until then it shows the real projects from the Work page.
 */
export function Testimonials() {
  if (approvedTestimonials.length) {
    return (
      <section aria-labelledby="testimonials-title" className="bg-white py-28 md:py-40">
        <div className="wrap">
          <div className="text-center">
            <p className="t-eyebrow text-accent" data-reveal>
              Clients
            </p>
            <h2 id="testimonials-title" className="t-headline mt-3" data-reveal>
              In their words.
            </h2>
          </div>
          <ul className={`mt-14 grid gap-4 md:mt-20 md:gap-5 ${approvedTestimonials.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {approvedTestimonials.map((t) => (
              <li key={t.name} data-reveal>
                <figure className="flex h-full flex-col rounded-[var(--radius-tile)] bg-mist p-8 md:p-10">
                  <blockquote className="text-[21px] font-semibold leading-[1.35] tracking-[-0.015em]">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto pt-10 text-[15px] text-graphite">
                    <span className="block font-semibold text-ink">{t.name}</span>
                    {t.role}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

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
            return (
              <li key={study.id} data-reveal>
                <Link
                  href={`/work#${study.id}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-tile)] p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10 ${
                    i === 1 ? "on-dark bg-black text-white" : "bg-mist"
                  }`}
                >
                  <div className="pointer-events-none mb-8 flex aspect-[16/11] items-center">
                    <div className="w-full">
                      <Visual decorative />
                    </div>
                  </div>
                  <span className={`text-[15px] font-semibold ${i === 1 ? "text-accent-on-dark" : "text-accent"}`}>{study.type}</span>
                  <span className="mt-2 block text-[28px] font-bold leading-[1.1] tracking-[-0.025em]">{study.client}</span>
                  <span className={`mt-3 block text-[17px] leading-[1.45] ${i === 1 ? "text-night-text" : "text-graphite"}`}>{study.headline}</span>
                  <span className={`mt-auto pt-8 text-[15px] ${i === 1 ? "text-night-text" : "text-graphite"}`}>
                    {study.sector} · {study.location}
                  </span>
                  <span className="link-more mt-3 text-[15px]">Read the case study</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
