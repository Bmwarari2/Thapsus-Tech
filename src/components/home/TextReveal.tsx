"use client";

import { useRef, type ElementType } from "react";
import { MQ } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacity words start at before they're scrolled into view. */
  from?: number;
};

/**
 * A large statement whose words brighten one by one as you scroll.
 * Words are real text in the HTML; only their opacity changes.
 */
export function TextReveal({ text, as: Tag = "p", className = "", from = 0.16 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/);

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        scope.querySelectorAll("[data-word]"),
        { opacity: from },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: scope, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span data-word className="inline-block will-change-[opacity]">
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
