/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THAPSUS SITE SETTINGS
 *  Everything you're likely to change lives in this one file: contact details,
 *  legal details, the accent colour, prices, the savings calculator, booking
 *  and analytics. Edit a value, save, and the whole site updates.
 *
 *  Anything in [SQUARE BRACKETS] is a placeholder that still needs a real value.
 *  See PLACEHOLDERS.md for the full checklist.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Thapsus",
  /** Live web address, no trailing slash. Used for SEO, sitemap and social cards. */
  url: "https://app.thapsus.uk",
  locale: "en_GB",

  /** Default search/social description. Each page also sets its own. */
  description:
    "Thapsus designs, builds and looks after custom software for UK businesses, replacing costly subscriptions with tools built around how you work. Based in Stockport.",

  contact: {
    /** Shown on the site, and where enquiries are sent unless CONTACT_TO_EMAIL is set. */
    email: "admin@thapsus.uk",
    phoneDisplay: "07346 813917",
    /** International format for tap-to-call links. */
    phoneHref: "+447346813917",
    /** Public location. Only the town is shown in marketing copy. */
    locality: "Stockport",
    region: "Greater Manchester",
    country: "United Kingdom",
    countryCode: "GB",
    serviceArea: "United Kingdom",
  },

  /** Required by UK company law on business websites. Shown in the footer and legal pages. */
  legal: {
    companyName: "Thapsus Cargo Ltd",
    tradingName: "Thapsus",
    companyNumber: "17309722",
    registeredIn: "England and Wales",
    registeredOffice: "31 Collingwood Close, Hazel Grove, Stockport, SK7 4LB",
    /** ICO data protection registration number, if you have one. Leave empty to hide. */
    icoNumber: "",
  },

  /**
   * Accent colour (Evergreen). Used only for buttons, links and small UI details.
   * If you change it, keep white text on `accent` at a contrast of 4.5:1 or more
   * (check at https://webaim.org/resources/contrastchecker/).
   */
  brand: {
    accent: "#0a7560",
    accentHover: "#08604f",
    /** Lighter version for links and buttons on black sections. */
    accentOnDark: "#3ccaa5",
    accentOnDarkHover: "#5fd8b9",
    /** Very light tint for status pills and selected states. */
    accentWash: "#e5f3ef",
  },

  /** Cal.com booking link, e.g. "thapsus/software-review". Loads only after cookie consent. */
  booking: {
    calLink: "thapsusadmin/30min",
  },

  /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Loads only after cookie consent. Leave empty to disable. */
  analytics: {
    gaMeasurementId: "",
  },

  /**
   * Pricing. All prices exclude VAT. A plan's monthly price is its team fee
   * (set by how many people log in) plus `toolFee` for each tool.
   * While `isPlaceholder` is true, the site shows "£[X]" instead of the
   * numbers below and labels the calculator as using sample figures.
   */
  pricing: {
    isPlaceholder: false,
    /** Paid when the client signs their proposal. */
    startFee: 200,
    /** Monthly price of each tool, on top of the team fee. */
    toolFee: 39,
    /** Most tools on a standard plan. More than this is a custom quote. */
    maxTools: 5,
    /** Included improvement time each month, per tool. */
    improvementMinutesPerTool: 30,
    /** Monthly fees start at go-live and run for at least this many months. */
    minimumTermMonths: 12,
    /** Discount on the monthly fee for charities and churches. 0 hides the line. */
    charityDiscountPercent: 10,
    plans: [
      {
        id: "essentials",
        name: "Essentials",
        summary: "Our ready-made tools, set up for a small team.",
        teamFee: 110,
        users: 5,
        supportHours: "working hours, 24/7 for emergencies",
        features: ["Ready-made tools with your branding and settings", "Hosting, backups and security updates", "Email support"],
      },
      {
        id: "starter",
        name: "Starter",
        summary: "Tools shaped around how a small team works.",
        teamFee: 170,
        users: 10,
        supportHours: "working hours, 24/7 for emergencies",
        features: ["Built around how you work", "Hosting, backups and security updates", "Email support"],
      },
      {
        id: "team",
        name: "Team",
        summary: "Connected tools for a growing team.",
        teamFee: 230,
        users: 20,
        supportHours: "working hours, 24/7 for emergencies",
        features: ["Built around how you work", "Hosting, backups and security updates", "Priority phone and email support"],
      },
      {
        id: "growth",
        name: "Growth",
        summary: "One connected system for a bigger team.",
        teamFee: 290,
        users: 30,
        supportHours: "working hours, 24/7 for emergencies",
        features: ["Built around how you work", "Hosting, backups and security updates", "Priority phone and email support"],
      },
      {
        id: "custom",
        name: "Custom",
        summary: "More than 30 people or 5 tools, and bigger systems including ERP.",
        teamFee: null,
        users: null,
        supportHours: "Agreed with you",
        features: ["Unlimited scope, quoted to fit", "Setup paid in stages", "Dedicated support arrangement", "Data migration from multiple systems", "Code handover option"],
      },
    ],
  },

  /**
   * Savings calculator. Tool prices are monthly examples, excluding VAT, that
   * visitors can edit. `unit: "user"` is per person (and visitors can say how
   * many people use it); `unit: "flat"` is one price for the whole account.
   * The Thapsus cost uses the smallest plan that covers the number of people,
   * plus the tool fee for each tool ticked.
   */
  calculator: {
    defaultStaff: 20,
    minStaff: 1,
    maxStaff: 200,
    /** Include the start fee in the year-one and three-year figures. */
    includeStartFee: true,
    tools: [
      { id: "crm", name: "CRM & sales pipeline", price: 25, unit: "user", selected: true },
      { id: "projects", name: "Project & task boards", price: 10, unit: "user", selected: true },
      { id: "booking", name: "Booking & scheduling", price: 8, unit: "user", selected: true },
      { id: "hr", name: "HR, leave & rotas", price: 6, unit: "user", selected: true },
      { id: "jobs", name: "Job management", price: 37, unit: "user", selected: false },
      { id: "helpdesk", name: "Helpdesk & ticketing", price: 30, unit: "user", selected: false },
      { id: "forms", name: "Forms & approvals", price: 30, unit: "flat", selected: false },
      { id: "portal", name: "Client portal", price: 40, unit: "flat", selected: false },
      { id: "inventory", name: "Stock & inventory", price: 60, unit: "flat", selected: false },
    ],
  },
} as const;

export type Site = typeof site;

/** True when a config value is still a [PLACEHOLDER]. */
export const isPlaceholder = (value: string | null | undefined) =>
  !value || /^\[.*\]$/.test(value.trim());
