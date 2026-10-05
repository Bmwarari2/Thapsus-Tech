"use client";

import { useRef, type ReactNode } from "react";
import { MQ } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

/** Steps appear one after another while a progress line draws between them. */
export function StepsReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step-item]", scope);
      const line = gsap.utils.toArray<HTMLElement>("[data-step-line]", scope).find((el) => el.getClientRects().length > 0);
      const horizontal = window.matchMedia("(min-width: 1024px)").matches;
      if (line) {
        gsap.fromTo(
          line,
          horizontal ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top 75%", end: horizontal ? "bottom 70%" : "bottom 60%", scrub: 0.6 },
          },
        );
      }
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: horizontal ? i * 0.12 : 0,
            scrollTrigger: { trigger: horizontal ? scope : item, start: "top 80%", once: true },
          },
        );
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
