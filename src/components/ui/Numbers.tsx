"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { formatGBP } from "@/lib/savings";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function tween(from: number, to: number, ms: number, onFrame: (v: number) => void) {
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    onFrame(from + (to - from) * easeOutExpo(t));
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

type Format = "gbp" | "int";
const fmt = (v: number, format: Format) => (format === "gbp" ? formatGBP(v) : Math.round(v).toLocaleString("en-GB"));

/**
 * Counts up from zero the first time it scrolls into view. The final value is
 * in the server HTML, so it's correct without JavaScript and for reduced motion.
 */
export function CountUp({ value, format = "gbp", className = "" }: { value: number; format?: Format; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already visible: leave the final figure in place
    el.textContent = fmt(0, format);
    let stop = () => {};
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        stop = tween(0, value, 1800, (v) => {
          el.textContent = fmt(v, format);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
      el.textContent = fmt(value, format);
    };
  }, [value, format]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {fmt(value, format)}
    </span>
  );
}

/** Smoothly tweens to each new value, for live calculator results. */
export function AnimatedNumber({ value, format = "gbp", className = "" }: { value: number; format?: Format; className?: string }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    if (prefersReducedMotion()) {
      current.current = value;
      const id = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(id);
    }
    return tween(current.current, value, 700, (v) => {
      current.current = v;
      setShown(v);
    });
  }, [value]);

  return <span className={`tabular ${className}`}>{fmt(shown, format)}</span>;
}
