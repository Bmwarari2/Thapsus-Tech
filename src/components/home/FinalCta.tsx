import { ButtonLink } from "@/components/ui/Button";
import { primaryCta } from "@/content/navigation";
import { site } from "@/config/site";

type Props = {
  title?: string;
  text?: string;
};

/** Full-bleed dark call to action used at the end of every page. */
export function FinalCta({
  title = "Let’s look at what you pay for.",
  text = "A free, no-pressure review of your software, with an honest answer about what’s worth replacing.",
}: Props) {
  return (
    <section aria-labelledby="final-cta-title" data-nav-theme="dark" className="on-dark relative overflow-hidden bg-black py-28 text-center text-white md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[90%] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)" }}
      />
      <div className="wrap relative">
        <h2 id="final-cta-title" className="t-headline mx-auto max-w-[12em] text-balance" data-reveal>
          {title}
        </h2>
        <p className="t-lead mx-auto mt-6 max-w-[28em] text-night-text" data-reveal>
          {text}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7" data-reveal>
          <ButtonLink href={primaryCta.href} size="lg" tone="dark">
            {primaryCta.long}
          </ButtonLink>
          <a href={`tel:${site.contact.phoneHref}`} className="link-more text-[17px] md:text-[19px]">
            Or call {site.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
