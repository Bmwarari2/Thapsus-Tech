"use client";

import { useRef, type ReactNode } from "react";
import { MQ } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

/**
 * Starts small and grows to its full, edge-to-edge size as it scrolls into the
 * middle of the screen. Uses scale only, so it never triggers layout.
 */
export function GrowOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    const target = scope.querySelector("[data-grow]");
    mm.add(MQ.desktop, () => {
      gsap.fromTo(
        target,
        { scale: 0.58, yPercent: 6 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top 92%", end: "center 52%", scrub: 0.5 },
        },
      );
    });
    mm.add(MQ.mobile, () => {
      gsap.fromTo(
        target,
        { scale: 0.86 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: scope, start: "top 95%", end: "center 60%", scrub: 0.5 } },
      );
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
