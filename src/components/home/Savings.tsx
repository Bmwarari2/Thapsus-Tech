import { Calculator } from "@/components/calculator/Calculator";
import { CountUp } from "@/components/ui/Numbers";
import { site } from "@/config/site";
import { defaultEstimate, formatGBP } from "@/lib/savings";

export function Savings({ showExample = true }: { showExample?: boolean }) {
  const example = defaultEstimate();
  const toolCount = example.toolCount;

  return (
    <section id="calculator" aria-labelledby="savings-title" className="bg-white py-28 md:py-40">
      <div className="wrap">
        <div className="text-center">
          <p className="t-eyebrow text-accent" data-reveal>
            Savings
          </p>
          <h2 id="savings-title" className="t-headline mt-3" data-reveal>
            See what you could save.
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[30em] text-graphite" data-reveal>
            Add the tools you pay for. We’ll show you the difference.
          </p>
        </div>

        {showExample && example.plan ? (
          <div className="mt-16 md:mt-20" data-reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[15px] text-graphite">
              <span className="font-semibold text-ink">Example:</span>
              <span>
                a {example.staff}-person team paying for {toolCount} tools at example prices
              </span>
              {site.pricing.isPlaceholder ? (
                <span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-semibold text-graphite">Sample prices</span>
              ) : null}
            </div>
            <dl className="mt-8 grid gap-8 text-center md:grid-cols-3 md:gap-6">
              <div>
                <dt className="text-[15px] text-graphite">Subscriptions, each year</dt>
                <dd className="mt-2 text-[44px] font-bold leading-none tracking-[-0.035em] md:text-[56px]">
                  <CountUp value={example.currentAnnual} />
                </dd>
              </div>
              <div>
                <dt className="text-[15px] text-graphite">Thapsus, year one</dt>
                <dd className="mt-2 text-[44px] font-bold leading-none tracking-[-0.035em] md:text-[56px]">
                  <CountUp value={example.thapsusYearOne} />
                </dd>
              </div>
              <div>
                <dt className="text-[15px] text-graphite">Saved over three years</dt>
                <dd className="mt-2 text-[44px] font-bold leading-none tracking-[-0.035em] text-accent md:text-[56px]">
                  <CountUp value={example.saving3Years} />
                </dd>
              </div>
            </dl>
            <p className="t-caption mx-auto mt-6 max-w-[40em] text-center text-graphite">
              Estimate only. Includes the {formatGBP(site.pricing.startFee)} start fee. All figures exclude VAT. Try your own numbers below.
            </p>
          </div>
        ) : null}

        <div className="mt-16 md:mt-20">
          <Calculator />
        </div>
      </div>
    </section>
  );
}
