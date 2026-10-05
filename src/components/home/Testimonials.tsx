/**
 * Placeholder testimonials. Replace with real, permissioned quotes only.
 * Never invent testimonials.
 */
const placeholders = [1, 2, 3];

export function Testimonials() {
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
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {placeholders.map((n) => (
            <li key={n} data-reveal>
              <figure className="flex h-full flex-col rounded-[var(--radius-tile)] border-2 border-dashed border-line p-8 md:p-10">
                <blockquote className="text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-graphite">
                  “[TESTIMONIAL — to be added]”
                </blockquote>
                <figcaption className="mt-auto pt-10 text-[15px] text-graphite">
                  <span className="block font-semibold text-ink">[Client name]</span>
                  [Role, business type]
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
