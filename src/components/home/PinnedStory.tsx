"use client";

import { useRef, type ReactNode } from "react";
import { Laptop } from "@/components/devices/Devices";
import { useLenis } from "@/components/motion/MotionProvider";
import { LinkMore } from "@/components/ui/Button";
import { MQ, type Motion } from "@/lib/motion";
import { useMotion } from "@/lib/use-motion";

type Trigger = InstanceType<Motion["ScrollTrigger"]>;

export type StoryItem = { id: string; eyebrow: string; title: string; text: string; href: string };

/** Timeline length: one unit per change, plus a short hold at the end. */
const HOLD_END = 0.35;

/* Desktop: the laptop pins while its screen changes and captions follow. */
export function PinnedStory({ items, screens }: { items: StoryItem[]; screens: ReactNode[] }) {
  const N = items.length;
  const TOTAL = N - 1 + HOLD_END;
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Trigger | null>(null);
  const lenis = useLenis();

  useMotion(ref, ({ gsap }, scope) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", scope);
      const captions = gsap.utils.toArray<HTMLElement>("[data-caption]", scope);
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", scope);

      const setActive = (index: number) => {
        steps.forEach((step, i) => {
          step.dataset.active = String(i === index);
          step.querySelector("button")?.setAttribute("aria-current", i === index ? "step" : "false");
        });
      };
      setActive(0);

      // Device rises into place as the section arrives.
      gsap.fromTo(
        "[data-device]",
        { yPercent: 12, scale: 0.9, opacity: 0.4 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "top top", scrub: true },
        },
      );

      gsap.set(screens.slice(1), { autoAlpha: 0 });
      gsap.set(captions.slice(1), { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: () => `+=${window.innerHeight * TOTAL * 0.9}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * TOTAL;
            setActive(Math.min(N - 1, Math.max(0, Math.floor(t + 0.3))));
          },
        },
      });
      triggerRef.current = tl.scrollTrigger ?? null;

      for (let i = 1; i < N; i++) {
        const at = i - 0.6;
        tl.to(screens[i - 1], { autoAlpha: 0, scale: 0.96, duration: 0.6 }, at)
          .fromTo(screens[i], { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, at)
          .to(captions[i - 1], { autoAlpha: 0, y: -40, duration: 0.35, ease: "power2.in" }, at)
          .fromTo(captions[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, at + 0.3);
      }
      tl.to({}, { duration: HOLD_END });

      return () => {
        triggerRef.current = null;
      };
    });
    return () => mm.revert();
  });

  const goTo = (index: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * index) / TOTAL + 2;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div ref={ref}>
      <div data-pin className="relative h-svh pt-[var(--nav-height)]">
        <div className="wrap-wide grid h-full grid-cols-12 items-center gap-8">
          <div className="col-span-4 xl:col-span-4 xl:pl-6">
            <div className="grid">
              {items.map((tool, i) => (
                <div
                  key={tool.id}
                  data-caption
                  className="[grid-area:1/1]"
                  style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
                >
                  <p className="t-eyebrow text-accent-on-dark">{tool.eyebrow}</p>
                  <h3 className="mt-3 text-[clamp(2.25rem,2.6vw+0.75rem,3.25rem)] font-bold leading-[1.06] tracking-[-0.028em]">
                    {tool.title}
                  </h3>
                  <p className="t-lead mt-4 max-w-[22em] text-night-text">{tool.text}</p>
                  <LinkMore href={tool.href} className="mt-6 inline-block">
                    Learn more<span className="sr-only"> about {tool.eyebrow.toLowerCase()}</span>
                  </LinkMore>
                </div>
              ))}
            </div>

            <ol className="mt-14 flex flex-col gap-1" aria-label="Tools in this story">
              {items.map((tool, i) => (
                <li key={tool.id} data-step className="group">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="flex items-center gap-3 py-1.5 text-[14px] text-night-text transition-colors duration-300 hover:text-white group-data-[active=true]:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[2px] w-4 origin-left rounded-full bg-[#48484a] transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-data-[active=true]:scale-x-[2.5] group-data-[active=true]:bg-accent-on-dark"
                    />
                    <span className="ml-5">
                      <span className="sr-only">Show </span>
                      {tool.eyebrow}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-8">
            <div data-device className="relative mx-auto w-full max-w-[min(100%,calc((100svh-var(--nav-height)-96px)*1.62))]">
              <div className="dv-glow" />
              <Laptop label="Examples of tools Thapsus builds, changing as you scroll">
                {screens.map((screen, i) => (
                  <div
                    key={items[i]?.id ?? i}
                    data-screen
                    className="absolute inset-0 will-change-[transform,opacity]"
                    style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
                  >
                    {screen}
                  </div>
                ))}
              </Laptop>
              <p className="t-caption mt-6 text-right text-night-text">Screens show sample data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

