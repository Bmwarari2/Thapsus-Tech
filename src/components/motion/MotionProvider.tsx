"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { loadMotion, prefersNativeScroll, prefersReducedMotion, scheduleRefresh } from "@/lib/motion";

const LenisContext = createContext<Lenis | null>(null);

/** The smooth-scroll instance, or null when smooth scrolling is off. */
export const useLenis = () => useContext(LenisContext);

/**
 * Smooth scrolling (Lenis) driven by GSAP's ticker, so pinned and scrubbed
 * animations stay perfectly in sync with the scroll position. Skipped entirely
 * for visitors who prefer reduced motion. Touch devices keep native scrolling.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || prefersNativeScroll()) return;

    let cancelled = false;
    let instance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    Promise.all([import("lenis"), loadMotion()]).then(([{ default: LenisClass }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      instance = new LenisClass({
        autoRaf: false,
        lerp: 0.11,
        anchors: { offset: -120 },
      });
      instance.on("scroll", ScrollTrigger.update);
      const lenisInstance = instance;
      tick = (time: number) => lenisInstance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    });

    return () => {
      cancelled = true;
      if (tick) {
        const t = tick;
        loadMotion().then(({ gsap }) => gsap.ticker.remove(t));
      }
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <RouteScrollReset lenis={lenis} />
      <RevealOnScroll />
      {children}
    </LenisContext.Provider>
  );
}

/** On page change, jump to the top and re-measure scroll animations. */
function RouteScrollReset({ lenis }: { lenis: Lenis | null }) {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    loadMotion().then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }, [pathname, lenis]);

  return null;
}

/**
 * Any element marked `data-reveal` fades up gently the first time it scrolls
 * into view. Elements already on screen are left alone, so nothing visible
 * ever disappears, and nothing is hidden for reduced-motion visitors.
 */
function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let kill = () => {};

    loadMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const below = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getClientRects().length > 0 && el.getBoundingClientRect().top > window.innerHeight * 0.9);
      gsap.set(below, { opacity: 0, y: 28 });
      const triggers = ScrollTrigger.batch(below, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });
      scheduleRefresh();
      kill = () => {
        triggers.forEach((t) => t.kill());
        gsap.set(below, { clearProps: "opacity,transform" });
      };
    });

    return () => {
      cancelled = true;
      kill();
    };
  }, [pathname]);

  return null;
}
