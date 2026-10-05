import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LinkMore } from "@/components/ui/Button";
import { solutions } from "@/content/solutions";
import { HorizontalGallery } from "./HorizontalGallery";

export function WhatWeBuild() {
  return (
    <section aria-labelledby="build-title" className="bg-white pt-28 md:pt-40">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-eyebrow text-accent" data-reveal>
            What we build
          </p>
          <h2 id="build-title" className="t-headline mt-3 max-w-[11em]" data-reveal>
            If you rent it, we can build it.
          </h2>
        </div>
        <LinkMore href="/solutions" className="text-[17px] md:mb-3 md:text-[19px]">
          See all solutions
        </LinkMore>
      </div>

      <div className="pb-24 pt-12 md:pb-36 md:pt-16">
        <HorizontalGallery label="Software we build">
          {solutions.map((s, i) => {
            const dark = i % 4 === 1;
            return (
              <Link
                key={s.id}
                href={`/solutions#${s.id}`}
                data-gallery-card
                className={`group relative flex h-[440px] w-[78vw] max-w-[340px] shrink-0 snap-start scroll-ml-4 flex-col rounded-[var(--radius-tile)] p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:h-[500px] md:w-[360px] md:max-w-none md:p-9 ${
                  dark ? "on-dark bg-black text-white" : "bg-mist text-ink"
                }`}
              >
                <p className={`t-eyebrow text-[15px] ${dark ? "text-accent-on-dark" : "text-accent"}`}>{s.name}</p>
                <h3 className="mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.025em] md:text-[32px]">{s.title}</h3>
                <p className={`mt-4 text-[17px] leading-[1.45] ${dark ? "text-night-text" : "text-graphite"}`}>{s.summary}</p>
                <div className="mt-auto flex items-end justify-between">
                  <span
                    className={`grid size-20 place-items-center rounded-[22px] ${
                      dark ? "bg-night text-accent-on-dark" : "bg-white text-accent"
                    }`}
                  >
                    <Icon name={s.icon} className="size-10" />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-9 place-items-center rounded-full text-[22px] leading-none transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-90 ${
                      dark ? "bg-white text-black" : "bg-ink text-white"
                    }`}
                  >
                    +
                  </span>
                </div>
              </Link>
            );
          })}
        </HorizontalGallery>
      </div>
    </section>
  );
}
