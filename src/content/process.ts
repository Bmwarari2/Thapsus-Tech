import type { IconName } from "@/components/ui/Icon";

export type Step = {
  number: string;
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  /** Shown as "Typical timeline" on the How it works page. Leave out if there isn't one. */
  timeline?: string;
  you: string;
  we: string;
  get: string;
};

export const steps: Step[] = [
  {
    number: "01",
    id: "review",
    icon: "chat",
    title: "Free software review",
    summary: "We look at the tools you pay for and how your team really works. No cost, no obligation.",
    you: "Tell us which tools you use, what they cost and what slows your team down. A short call or visit is all it takes.",
    we: "Map how work flows through your business, spot overlaps and gaps, and work out what’s worth replacing, and what isn’t.",
    get: "A plain-English summary of what we found. It’s yours to keep, even if you go no further.",
  },
  {
    number: "02",
    id: "proposal",
    icon: "forms",
    title: "Proposal & fixed quote",
    summary: "A clear plan and a fixed price, so you know exactly what you’re getting before anything starts.",
    you: "Read the proposal, ask questions and decide what matters most.",
    we: "Write a clear scope, sketch the key screens and set a fixed setup fee and monthly fee.",
    get: "A fixed price, in writing. No surprise invoices.",
  },
  {
    number: "03",
    id: "build",
    icon: "projects",
    title: "Build & move your data",
    summary: "We build your system in stages and bring your data across, with you trying it along the way.",
    timeline: "About 1 month, including testing",
    you: "Try early versions and tell us what works. A few short check-ins, not endless meetings.",
    we: "Build in stages, move your data across from your current tools, and train your team.",
    get: "A system your team has already tested, with your data in it from day one.",
  },
  {
    number: "04",
    id: "support",
    icon: "shield",
    title: "Ongoing support",
    summary: "We host it, back it up, keep it secure and improve it as your business grows.",
    timeline: "Every month",
    you: "Use it. Ask for changes when you need them.",
    we: "Host and monitor it, back it up daily, apply security updates, fix small issues in working hours and emergencies 24/7, and make improvements.",
    get: "One monthly fee, a team who knows your system inside out, and no per-seat bills.",
  },
];
