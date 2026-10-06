import { site } from "@/config/site";

export type ToolInput = {
  id: string;
  name: string;
  /** Monthly price, per person or for the whole account depending on `unit`. */
  price: number;
  unit: "user" | "flat";
  /** How many people use a per-person tool. Null means the whole team; 0 while the visitor is typing. */
  users?: number | null;
  selected: boolean;
};

type PricedPlan = { id: string; name: string; teamFee: number; users: number };

const { startFee, toolFee, maxTools } = site.pricing;

const pricedPlans: PricedPlan[] = site.pricing.plans
  .filter((p) => p.teamFee !== null && p.users !== null)
  .map((p) => ({ id: p.id, name: p.name, teamFee: p.teamFee!, users: p.users! }))
  .sort((a, b) => a.users - b.users);

export const largestPlan = pricedPlans[pricedPlans.length - 1];

/** Monthly price of a plan with a given number of tools. */
export const planMonthly = (plan: { teamFee: number }, tools: number) => plan.teamFee + toolFee * Math.max(1, tools);

/** The smallest plan for this many people, or null if a custom quote is needed. */
export function pickPlan(people: number, toolCount: number): PricedPlan | null {
  if (toolCount > maxTools) return null;
  return pricedPlans.find((p) => p.users >= people) ?? null;
}

const safe = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

/** Monthly cost of one tool for a team of `staff`. */
export function toolMonthly(tool: ToolInput, staff: number) {
  if (tool.unit === "flat") return safe(tool.price);
  const people = Math.min(staff, tool.users ?? staff);
  return safe(tool.price) * safe(people);
}

export type Estimate = {
  staff: number;
  toolCount: number;
  currentMonthly: number;
  currentAnnual: number;
  current3Years: number;
  plan: PricedPlan | null;
  thapsusMonthly: number;
  thapsusYearOne: number;
  thapsusAnnualAfter: number;
  thapsus3Years: number;
  /** Negative when Thapsus would cost more. */
  savingYearOne: number;
  saving3Years: number;
};

export function estimate(staff: number, tools: ToolInput[]): Estimate {
  const selected = tools.filter((t) => t.selected);
  const currentMonthly = selected.reduce((sum, t) => sum + toolMonthly(t, staff), 0);
  const currentAnnual = Math.round(currentMonthly * 12);
  const current3Years = currentAnnual * 3;

  const plan = pickPlan(staff, selected.length);
  const start = plan && site.calculator.includeStartFee ? startFee : 0;
  const thapsusMonthly = plan ? planMonthly(plan, selected.length) : 0;
  const thapsusAnnualAfter = thapsusMonthly * 12;
  const thapsusYearOne = plan ? start + thapsusAnnualAfter : 0;
  const thapsus3Years = plan ? start + thapsusAnnualAfter * 3 : 0;

  return {
    staff,
    toolCount: selected.length,
    currentMonthly,
    currentAnnual,
    current3Years,
    plan,
    thapsusMonthly,
    thapsusYearOne,
    thapsusAnnualAfter,
    thapsus3Years,
    savingYearOne: plan ? currentAnnual - thapsusYearOne : 0,
    saving3Years: plan ? current3Years - thapsus3Years : 0,
  };
}

/** The calculator's starting tools, as editable copies. */
export const defaultTools = (): ToolInput[] => site.calculator.tools.map((t) => ({ ...t, users: null }));

/** The worked example shown on the Home page, from the calculator's default settings. */
export function defaultEstimate() {
  return estimate(site.calculator.defaultStaff, defaultTools());
}

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
export const formatGBP = (n: number) => gbp.format(Math.round(n));
