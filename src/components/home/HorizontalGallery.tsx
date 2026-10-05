"use client";

import { useRef, type ReactNode } from "react";
import { useLenis } from "@/components/motion/MotionProvider";
import { MQ, type Motion } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

type Trigger = InstanceType<Motion["ScrollTrigger"]>;

/**
 * Desktop: the row pins and slides sideways as you scroll down.
 * Phones, tablets and reduced motion: a native swipeable row with snap points.
 */
export function HorizontalGallery({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Trigger | null>(null);
  const lenis = useLenis();

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const viewport = scope.querySelector<HTMLElement>("[data-gallery-viewport]")!;
      const track = scope.querySelector<HTMLElement>("[data-gallery-track]")!;
      scope.dataset.pinned = "true";
      viewport.scrollLeft = 0;

      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;

      return () => {
        delete scope.dataset.pinned;
        triggerRef.current = null;
      };
    });
    return () => mm.revert();
  });

  // Keep keyboard focus visible: scroll the page so a focused card is on screen.
  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const st = triggerRef.current;
    const viewport = ref.current?.querySelector<HTMLElement>("[data-gallery-viewport]");
    const track = ref.current?.querySelector<HTMLElement>("[data-gallery-track]");
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-gallery-card]");
    if (!st || !viewport || !track || !card) return;
    viewport.scrollLeft = 0;
    const distance = Math.max(1, track.scrollWidth - viewport.clientWidth);
    const wanted = Math.min(distance, Math.max(0, card.offsetLeft - viewport.clientWidth * 0.2));
    const y = st.start + (st.end - st.start) * (wanted / distance);
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  return (
    <div ref={ref} className="group/gallery data-[pinned=true]:h-svh data-[pinned=true]:pt-[var(--nav-height)]" onFocus={onFocus}>
      <div className="flex h-full flex-col justify-center">
        <div
          data-gallery-viewport
          role="region"
          aria-label={label}
          tabIndex={-1}
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] group-data-[pinned=true]/gallery:snap-none group-data-[pinned=true]/gallery:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <div data-gallery-track className="flex w-max gap-4 px-4 md:gap-5 md:px-8 xl:px-[max(2rem,calc((100vw-1120px)/2+2rem))]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
