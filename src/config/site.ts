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
  url: "https://tech.thapsus.uk",
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
    icoNumber: "[ICO REGISTRATION NUMBER]",
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
   * Pricing. While `isPlaceholder` is true, the site shows clearly marked
   * placeholder prices and labels the calculator as using sample figures.
   * Set it to false once the numbers below are real.
   */
  pricing: {
    isPlaceholder: true,
    plans: [
      {
        id: "starter",
        name: "Starter",
        summary: "One focused tool for a small team.",
        setupFee: 3000,
        monthlyFee: 250,
        users: 10,
        supportHours: "[X] hours a month",
        features: ["One core tool", "Hosting, backups and security updates", "Email support", "Small improvements each month"],
      },
      {
        id: "growth",
        name: "Growth",
        summary: "Several connected tools, one system.",
        setupFee: 6000,
        monthlyFee: 450,
        users: 30,
        supportHours: "[X] hours a month",
        features: ["Up to [X] connected tools", "Hosting, backups and security updates", "Priority phone and email support", "Monthly improvement time"],
      },
      {
        id: "custom",
        name: "Custom",
        summary: "Larger teams and bigger systems, including ERP.",
        setupFee: null,
        monthlyFee: null,
        users: null,
        supportHours: "Agreed with you",
        features: ["Unlimited scope, quoted to fit", "Dedicated support arrangement", "Data migration from multiple systems", "Code handover option"],
      },
    ],
  },

  /**
   * Savings calculator. Tool prices are per user, per month, and are examples
   * that visitors can edit. The Thapsus cost uses the cheapest plan above that
   * covers the number of staff entered.
   */
  calculator: {
    defaultStaff: 20,
    minStaff: 1,
    maxStaff: 200,
    /** Spread the one-off setup fee into the year-one and three-year figures. */
    includeSetupFee: true,
    tools: [
      { id: "crm", name: "CRM & sales pipeline", pricePerUser: 25, selected: true },
      { id: "projects", name: "Project & task boards", pricePerUser: 12, selected: true },
      { id: "helpdesk", name: "Helpdesk & ticketing", pricePerUser: 30, selected: false },
      { id: "booking", name: "Booking & scheduling", pricePerUser: 12, selected: true },
      { id: "forms", name: "Forms & approvals", pricePerUser: 10, selected: false },
      { id: "hr", name: "HR, leave & rotas", pricePerUser: 6, selected: true },
      { id: "portal", name: "Client portal", pricePerUser: 15, selected: false },
      { id: "inventory", name: "Stock & inventory", pricePerUser: 20, selected: false },
    ],
  },
} as const;

export type Site = typeof site;

/** True when a config value is still a [PLACEHOLDER]. */
export const isPlaceholder = (value: string | null | undefined) =>
  !value || /^\[.*\]$/.test(value.trim());
