import { Icon } from "@/components/ui/Icon";
import { LinkMore } from "@/components/ui/Button";
import { steps } from "@/content/process";
import { StepsReveal } from "./StepsReveal";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-mist py-28 md:py-40">
      <div className="wrap">
        <div className="text-center">
          <p className="t-eyebrow text-accent" data-reveal>
            How it works
          </p>
          <h2 id="how-title" className="t-headline mt-3" data-reveal>
            Four steps. No surprises.
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[30em] text-graphite" data-reveal>
            From a free review to a system your team relies on, with a fixed price agreed before we start.
          </p>
        </div>

        <StepsReveal className="relative mt-16 md:mt-24">
          {/* Progress line: vertical on small screens, horizontal on large */}
          <div aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-line lg:hidden">
            <div data-step-line className="h-full w-full origin-top bg-accent" />
          </div>
          <div aria-hidden="true" className="absolute left-6 right-6 top-[23px] hidden h-px bg-line lg:block">
            <div data-step-line className="h-full w-full origin-left bg-accent" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => (
              <li key={step.id} data-step-item className="relative pl-16 lg:pl-0">
                <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-full bg-white text-accent shadow-[0_0_0_6px_var(--color-mist)] lg:static">
                  <Icon name={step.icon} className="size-6" />
                </span>
                <p className="tabular mt-0 text-[14px] font-semibold text-graphite lg:mt-7">Step {step.number}</p>
                <h3 className="t-tile mt-1.5">{step.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.5] text-graphite">{step.summary}</p>
              </li>
            ))}
          </ol>
        </StepsReveal>

        <div className="mt-14 text-center md:mt-20">
          <LinkMore href="/how-it-works" className="text-[17px] md:text-[19px]">
            How it works, in detail
          </LinkMore>
        </div>
      </div>
    </section>
  );
}
