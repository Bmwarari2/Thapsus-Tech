"use client";

import { useRef, type ReactNode } from "react";
import { MQ } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

/**
 * Gentle depth as you scroll past the hero: the copy drifts up and fades,
 * the laptop eases forward and the phone moves a little faster than it.
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to("[data-hero-copy]", { yPercent: -18, opacity: 0.25 }, 0)
        .to("[data-hero-laptop]", { y: -40, scale: 1.04 }, 0)
        .to("[data-hero-phone]", { y: -120 }, 0);
    });
    return () => mm.revert();
  });

  return <div ref={ref}>{children}</div>;
}
