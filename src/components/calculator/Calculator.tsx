"use client";

import { useId, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/Numbers";
import { site } from "@/config/site";
import { estimate, formatGBP, largestPlanUsers, type ToolInput } from "@/lib/savings";

const { minStaff, maxStaff, defaultStaff } = site.calculator;
const clampStaff = (n: number) => Math.min(maxStaff, Math.max(minStaff, Math.round(n) || minStaff));

type Tool = ToolInput & { custom?: boolean };

export function Calculator() {
  const uid = useId();
  const [staff, setStaff] = useState<number>(defaultStaff);
  const [tools, setTools] = useState<Tool[]>(() => site.calculator.tools.map((t) => ({ ...t })));
  const result = useMemo(() => estimate(staff, tools), [staff, tools]);

  const update = (id: string, patch: Partial<Tool>) => setTools((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const addTool = () =>
    setTools((list) => [...list, { id: `custom-${list.length}-${Date.now()}`, name: "", pricePerUser: 10, selected: true, custom: true }]);
  const removeTool = (id: string) => setTools((list) => list.filter((t) => t.id !== id));

  const { plan } = result;
  const negativeYearOne = plan && result.savingYearOne < 0;

  const liveSummary = plan
    ? `You pay about ${formatGBP(result.currentAnnual)} a year now. With Thapsus, about ${formatGBP(result.thapsusYearOne)} in year one. Estimated saving over three years: ${formatGBP(result.saving3Years)}.`
    : `You pay about ${formatGBP(result.currentAnnual)} a year now. For a team of ${staff}, we’d quote a custom plan.`;

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Inputs */}
      <div className="flex flex-col gap-5 lg:col-span-7">
        <fieldset className="rounded-[var(--radius-tile)] bg-mist p-6 md:p-9">
          <legend className="float-left w-full">
            <span className="block text-[14px] font-semibold text-graphite">Step 1</span>
            <span className="t-tile mt-1 block">How many people use your software?</span>
          </legend>
          <div className="clear-both flex items-center gap-4 pt-7">
            <button
              type="button"
              onClick={() => setStaff((s) => clampStaff(s - 1))}
              aria-label="One fewer person"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[22px] text-ink shadow-sm transition-transform active:scale-95"
            >
              −
            </button>
            <label htmlFor={`${uid}-staff`} className="sr-only">
              Number of people
            </label>
            <input
              id={`${uid}-staff`}
              type="number"
              inputMode="numeric"
              min={minStaff}
              max={maxStaff}
              value={staff}
              onChange={(e) => setStaff(clampStaff(Number(e.target.value)))}
              className="tabular w-[3.2em] rounded-xl bg-transparent text-center text-[44px] font-bold tracking-[-0.03em] [appearance:textfield] focus-visible:bg-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setStaff((s) => clampStaff(s + 1))}
              aria-label="One more person"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[22px] text-ink shadow-sm transition-transform active:scale-95"
            >
              +
            </button>
            <span className="text-[17px] text-graphite">people</span>
          </div>
          <label htmlFor={`${uid}-range`} className="sr-only">
            Number of people, slider
          </label>
          <input
            id={`${uid}-range`}
            type="range"
            min={minStaff}
            max={maxStaff}
            value={staff}
            onChange={(e) => setStaff(clampStaff(Number(e.target.value)))}
            className="mt-6 w-full accent-[var(--accent)]"
          />
          <div className="tabular mt-1 flex justify-between text-[13px] text-graphite" aria-hidden="true">
            <span>{minStaff}</span>
            <span>{maxStaff}</span>
          </div>
        </fieldset>

        <fieldset className="rounded-[var(--radius-tile)] bg-mist p-6 md:p-9">
          <legend className="float-left w-full">
            <span className="block text-[14px] font-semibold text-graphite">Step 2</span>
            <span className="t-tile mt-1 block">Which tools do you pay for?</span>
            <span className="mt-2 block text-[15px] text-graphite">
              Prices are per person, per month. We’ve filled in examples; change them to what you pay.
            </span>
          </legend>
          <ul className="clear-both grid gap-3 pt-7 md:grid-cols-2">
            {tools.map((tool) => {
              const checkId = `${uid}-${tool.id}-on`;
              const priceId = `${uid}-${tool.id}-price`;
              const nameId = `${uid}-${tool.id}-name`;
              return (
                <li
                  key={tool.id}
                  className={`relative rounded-[18px] bg-white p-4 ring-2 transition-[box-shadow,opacity] duration-300 ${
                    tool.selected ? "ring-accent" : "ring-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      id={checkId}
                      type="checkbox"
                      checked={tool.selected}
                      onChange={(e) => update(tool.id, { selected: e.target.checked })}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]"
                    />
                    {tool.custom ? (
                      <>
                        <label htmlFor={nameId} className="sr-only">
                          Tool name
                        </label>
                        <input
                          id={nameId}
                          type="text"
                          value={tool.name}
                          placeholder="Tool name"
                          onChange={(e) => update(tool.id, { name: e.target.value })}
                          className="min-w-0 flex-1 rounded-md border-b border-line bg-transparent text-[16px] font-medium outline-none focus-visible:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => removeTool(tool.id)}
                          aria-label={`Remove ${tool.name || "this tool"}`}
                          className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-full text-graphite hover:bg-mist hover:text-ink"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <label htmlFor={checkId} className="flex-1 cursor-pointer text-[16px] font-medium leading-snug">
                        {tool.name}
                      </label>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 pl-8 text-[15px]">
                    <span className="text-graphite">£</span>
                    <label htmlFor={priceId} className="sr-only">
                      Price per person per month for {tool.name || "this tool"}
                    </label>
                    <input
                      id={priceId}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.5}
                      value={Number.isFinite(tool.pricePerUser) ? tool.pricePerUser : ""}
                      disabled={!tool.selected}
                      onChange={(e) => update(tool.id, { pricePerUser: e.target.value === "" ? 0 : Number(e.target.value) })}
                      className="tabular w-16 rounded-lg bg-mist px-2 py-1 font-semibold [appearance:textfield] disabled:cursor-not-allowed disabled:font-normal disabled:text-graphite [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-graphite">per person / month</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={addTool}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-[17px] text-accent hover:underline"
          >
            <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-accent text-[16px] leading-none text-white">
              +
            </span>
            Add another tool
          </button>
        </fieldset>
      </div>

      {/* Results */}
      <aside aria-labelledby={`${uid}-results`} className="lg:col-span-5">
        <div className="on-dark rounded-[var(--radius-tile)] bg-black p-7 text-white md:p-9 lg:sticky lg:top-[calc(var(--nav-height)+var(--subnav-height)+24px)]">
          <h3 id={`${uid}-results`} className="flex items-center justify-between gap-3 text-[14px] font-semibold text-night-text">
            Your estimate
            {site.pricing.isPlaceholder ? (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white">Sample prices</span>
            ) : null}
          </h3>

          <dl className="mt-6 grid gap-6">
            <div>
              <dt className="text-[15px] text-night-text">Your subscriptions</dt>
              <dd className="mt-1 text-[32px] font-bold tracking-[-0.03em] md:text-[36px]">
                <AnimatedNumber value={result.currentAnnual} />
                <span className="ml-1.5 text-[17px] font-medium tracking-normal text-night-text">a year</span>
              </dd>
              <dd className="mt-1 text-[14px] text-night-text">
                {result.toolCount} {result.toolCount === 1 ? "tool" : "tools"} · {formatGBP(result.perUserMonthly)} per person, per month
              </dd>
            </div>

            <div>
              <dt className="text-[15px] text-night-text">With Thapsus</dt>
              {plan ? (
                <>
                  <dd className="mt-1 text-[32px] font-bold tracking-[-0.03em] md:text-[36px]">
                    <AnimatedNumber value={result.thapsusYearOne} />
                    <span className="ml-1.5 text-[17px] font-medium tracking-normal text-night-text">in year one</span>
                  </dd>
                  <dd className="mt-1 text-[14px] text-night-text">
                    {plan.name} plan, up to {plan.users} people · {formatGBP(plan.setupFee)} setup, then{" "}
                    {formatGBP(result.thapsusAnnualAfter)} a year
                  </dd>
                </>
              ) : (
                <>
                  <dd className="mt-1 text-[32px] font-bold tracking-[-0.03em] md:text-[36px]">Custom quote</dd>
                  <dd className="mt-1 text-[14px] text-night-text">
                    For teams over {largestPlanUsers} people, we’ll price a plan around what you need.
                  </dd>
                </>
              )}
            </div>
          </dl>

          {plan ? (
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/15 pt-7">
              <div>
                <dt className="text-[15px] text-night-text">Saving in year one</dt>
                <dd className="mt-1 text-[24px] font-bold tracking-[-0.02em]">
                  <AnimatedNumber value={result.savingYearOne} />
                </dd>
              </div>
              <div>
                <dt className="text-[15px] text-night-text">Saving over three years</dt>
                <dd className="mt-1 text-[32px] font-bold leading-none tracking-[-0.03em] text-accent-on-dark md:text-[40px]">
                  <AnimatedNumber value={result.saving3Years} />
                </dd>
              </div>
            </dl>
          ) : null}

          {negativeYearOne ? (
            <p className="mt-5 text-[14px] leading-[1.5] text-night-text">
              On these figures, your current tools cost less in year one because of the setup fee. We’ll always tell you honestly
              whether replacing something is worth it.
            </p>
          ) : null}

          <p className="sr-only" aria-live="polite">
            {liveSummary}
          </p>

          <ButtonLink href="/contact" tone="dark" size="lg" className="mt-8 w-full whitespace-normal text-center">
            Get an exact figure — book a free review
          </ButtonLink>
          <p className="mt-5 text-[13px] leading-[1.5] text-night-text">
            Estimates only, based on the figures you entered{site.calculator.includeSetupFee ? " and including the one-off setup fee" : ""}.
            {site.pricing.isPlaceholder ? " Thapsus prices shown are samples until our pricing is published." : ""} Your free review gives
            you an exact quote. Nothing you enter here is sent to us.
          </p>
        </div>
      </aside>
    </div>
  );
}
