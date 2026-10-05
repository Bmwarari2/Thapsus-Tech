import { Icon } from "@/components/ui/Icon";
import { trustPoints } from "@/content/trust";

/** Bento grid of the low-risk promises. Sizes vary for rhythm. */
export function TrustBento() {
  const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];
  return (
    <section aria-labelledby="trust-title" className="bg-mist py-28 md:py-40">
      <div className="wrap">
        <div className="text-center">
          <p className="t-eyebrow text-accent" data-reveal>
            Low risk
          </p>
          <h2 id="trust-title" className="t-headline mt-3" data-reveal>
            Low risk. By design.
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[30em] text-graphite" data-reveal>
            We host it, back it up and keep it secure. You keep control.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {trustPoints.map((point, i) => {
            const dark = i === 1 || i === 5;
            const wide = i === 0 || i === 5;
            return (
              <li
                key={point.title}
                data-reveal
                className={`group flex flex-col rounded-[var(--radius-tile)] p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10 ${
                  spans[i]
                } ${wide ? "md:col-span-2" : ""} ${dark ? "on-dark bg-black text-white" : "bg-white"} ${
                  wide ? "min-h-[260px] md:min-h-[300px]" : "min-h-[260px]"
                }`}
              >
                <span className={`${dark ? "text-accent-on-dark" : "text-accent"}`}>
                  <Icon name={point.icon} className={wide ? "size-12" : "size-10"} />
                </span>
                <h3 className={`mt-auto pt-10 font-bold tracking-[-0.025em] ${wide ? "text-[32px] md:text-[44px] leading-[1.05]" : "text-[26px] leading-[1.1]"}`}>
                  {point.title}
                </h3>
                <p className={`mt-3 max-w-[28em] text-[17px] leading-[1.5] ${dark ? "text-night-text" : "text-graphite"}`}>{point.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
