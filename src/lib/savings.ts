import { site } from "@/config/site";

export type ToolInput = { id: string; name: string; pricePerUser: number; selected: boolean };

type PricedPlan = { id: string; name: string; setupFee: number; monthlyFee: number; users: number };

const pricedPlans: PricedPlan[] = site.pricing.plans
  .filter((p) => p.setupFee !== null && p.monthlyFee !== null && p.users !== null)
  .map((p) => ({ id: p.id, name: p.name, setupFee: p.setupFee!, monthlyFee: p.monthlyFee!, users: p.users! }))
  .sort((a, b) => a.monthlyFee - b.monthlyFee);

export const largestPlanUsers = pricedPlans.reduce((max, p) => Math.max(max, p.users), 0);

/** The cheapest plan that includes enough users, or null if a custom quote is needed. */
export function pickPlan(staff: number): PricedPlan | null {
  return pricedPlans.find((p) => p.users >= staff) ?? null;
}

export type Estimate = {
  staff: number;
  toolCount: number;
  perUserMonthly: number;
  currentAnnual: number;
  current3Years: number;
  plan: PricedPlan | null;
  thapsusYearOne: number;
  thapsusAnnualAfter: number;
  thapsus3Years: number;
  savingYearOne: number;
  saving3Years: number;
};

export function estimate(staff: number, tools: ToolInput[]): Estimate {
  const selected = tools.filter((t) => t.selected);
  const perUserMonthly = selected.reduce((sum, t) => sum + (Number.isFinite(t.pricePerUser) ? Math.max(0, t.pricePerUser) : 0), 0);
  const currentAnnual = Math.round(perUserMonthly * staff * 12);
  const current3Years = currentAnnual * 3;

  const plan = pickPlan(staff);
  const setup = plan && site.calculator.includeSetupFee ? plan.setupFee : 0;
  const thapsusAnnualAfter = plan ? plan.monthlyFee * 12 : 0;
  const thapsusYearOne = plan ? setup + thapsusAnnualAfter : 0;
  const thapsus3Years = plan ? setup + thapsusAnnualAfter * 3 : 0;

  return {
    staff,
    toolCount: selected.length,
    perUserMonthly,
    currentAnnual,
    current3Years,
    plan,
    thapsusYearOne,
    thapsusAnnualAfter,
    thapsus3Years,
    savingYearOne: plan ? currentAnnual - thapsusYearOne : 0,
    saving3Years: plan ? current3Years - thapsus3Years : 0,
  };
}

/** The worked example shown on the Home page, from the calculator's default settings. */
export function defaultEstimate() {
  return estimate(
    site.calculator.defaultStaff,
    site.calculator.tools.map((t) => ({ ...t })),
  );
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
export const formatGBP = (n: number) => gbp.format(Math.round(n));
