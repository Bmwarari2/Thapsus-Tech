/** The tools shown in the pinned "Tools we build" story on the Home page. */
export const showcaseTools = [
  {
    id: "crm",
    screen: "crm",
    eyebrow: "CRM & sales",
    title: "Every lead. Nothing lost.",
    text: "Enquiries, quotes and follow-ups in one place, set up the way your team actually sells.",
    href: "/solutions#crm",
    label: "Example sales pipeline with leads grouped into new, contacted, quoted and won",
  },
  {
    id: "booking",
    screen: "bookings",
    eyebrow: "Booking & scheduling",
    title: "Your diary, sorted.",
    text: "Customers book online, your team sees their day, and double bookings stop.",
    href: "/solutions#booking",
    label: "Example weekly booking calendar showing appointments across five days",
  },
  {
    id: "jobs",
    screen: "jobs",
    eyebrow: "Job management",
    title: "From quote to sign-off.",
    text: "Job sheets, checklists, photos and customer signatures, all from a phone on site.",
    href: "/solutions#jobs",
    label: "Example job sheet with a checklist, site photos and customer sign-off",
  },
  {
    id: "portals",
    screen: "portal",
    eyebrow: "Client portals",
    title: "Clients, kept in the loop.",
    text: "Progress, documents and invoices in one secure place, so fewer emails ask for updates.",
    href: "/solutions#portals",
    label: "Example client portal showing project progress, shared documents and invoices",
  },
  {
    id: "reports",
    screen: "reports",
    eyebrow: "Dashboards & reporting",
    title: "Your numbers, at a glance.",
    text: "Live figures from across your business, without exporting a single spreadsheet.",
    href: "/solutions#reports",
    label: "Example reporting dashboard with revenue, completed jobs and work by type",
  },
] as const;

export type ShowcaseTool = (typeof showcaseTools)[number];
