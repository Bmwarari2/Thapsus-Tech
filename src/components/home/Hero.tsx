import type { CSSProperties } from "react";
import { Mark } from "@/components/brand/Logo";
import { Laptop, Phone } from "@/components/devices/Devices";
import { PhoneJobSheet, ScreenToday } from "@/components/mockups/Screens";
import { ButtonLink, LinkMore } from "@/components/ui/Button";
import { primaryCta } from "@/content/navigation";
import { HeroParallax } from "./HeroParallax";

const HEADLINE = ["Built", "around", "your", "business."];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white pb-20 pt-14 md:pb-28 md:pt-20">
      <HeroParallax>
        <div data-hero-copy className="wrap text-center">
          <p className="rise inline-flex items-center gap-2 text-[19px] font-semibold tracking-[-0.02em] md:text-[21px]" style={delay(0)}>
            <Mark className="h-[1.05em] w-[1.1em]" />
            Thapsus
          </p>

          <h1 id="hero-title" className="t-display mx-auto mt-4 max-w-[11em] text-balance md:mt-5">
            {HEADLINE.map((word, i) => (
              <span key={word}>
                <span className="rise-soft inline-block" style={delay(80 + i * 90)}>
                  {word}
                </span>
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="t-lead rise mx-auto mt-5 max-w-[30em] text-graphite md:mt-6" style={delay(560)}>
            Custom software for less than you pay in subscriptions.
          </p>

          <div
            className="rise mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7 md:mt-10"
            style={delay(680)}
          >
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.long}
            </ButtonLink>
            <LinkMore href="/solutions" className="text-[17px] md:text-[19px]">
              See what we build
            </LinkMore>
          </div>
        </div>

        <div className="wrap-wide mt-14 md:mt-20">
          <div className="relative mx-auto max-w-[1080px]">
            <div data-hero-laptop className="relative">
              <div className="rise-device" style={delay(760)}>
                <div className="dv-glow" />
                <Laptop label="Example of a business overview screen built by Thapsus, showing today's jobs, enquiries and figures">
                  <ScreenToday />
                </Laptop>
              </div>
            </div>
            <div data-hero-phone className="absolute -bottom-[6%] right-[1%] w-[21%] min-w-[92px] md:right-[3%] md:w-[18%]">
              <div className="rise-device" style={delay(980)}>
                <Phone label="Example of a mobile job sheet with a checklist and customer sign-off">
                  <PhoneJobSheet />
                </Phone>
              </div>
            </div>
          </div>
        </div>
      </HeroParallax>
    </section>
  );
}
