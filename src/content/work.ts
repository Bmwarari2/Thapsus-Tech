/**
 * Case studies, written from the systems Thapsus built for each client.
 * Highlights are features of the delivered system, not invented results.
 */
export type CaseStudy = {
  id: string;
  client: string;
  type: string;
  sector: string;
  location: string;
  headline: string;
  summary: string;
  challenge: string;
  built: string;
  features: string[];
  highlights: { value: string; label: string }[];
  /** Which illustration to show. */
  visual: "export-erp" | "tender-erp" | "church";
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "heritage",
    client: "Heritage Global Solutions",
    type: "ERP system",
    sector: "Industrial sourcing and export",
    location: "Preston, UK",
    headline: "From enquiry to export paperwork, in one system.",
    summary:
      "An ERP for a UK sourcing and export business that supplies mining equipment, machinery and industrial parts to customers around the world.",
    challenge:
      "Heritage Global Solutions buys from manufacturers on its customers’ behalf and handles inspection, paperwork, customs and freight. Every order moves through a chain of documents, from the customer’s request for quotation to the invoices and packing list that travel with the goods, in pounds or dollars. Each document has to match the one before it.",
    built:
      "A system that follows each order through five steps: request for quotation, proforma, purchase order, dispatch and shipping documents. Customers’ RFQs and purchase orders can be uploaded as PDFs and read by AI, which fills in the form. One click records a dispatch and produces the commercial invoice, tax invoice and packing list, numbered automatically. The same system runs the company’s public website and its quote-request form.",
    features: [
      "Five-step order flow, from RFQ to shipping documents",
      "AI reads uploaded RFQ and purchase order PDFs",
      "Part shipments tracked line by line, with short lines flagged",
      "One-click dispatch that creates the invoices and packing list",
      "Six branded PDF documents, numbered automatically",
      "Pounds and dollars, Incoterms and shipping references",
      "Public website and quote-request form, updated by the team",
    ],
    highlights: [
      { value: "5", label: "steps from enquiry to shipping documents" },
      { value: "1 click", label: "to dispatch and create three documents" },
      { value: "6", label: "types of branded PDF document" },
      { value: "2", label: "currencies, pounds and dollars" },
    ],
    visual: "export-erp",
    link: { href: "https://www.heritagegs.co.uk", label: "heritagegs.co.uk" },
  },
  {
    id: "cebuka",
    client: "Cebuka",
    type: "Tender, bid and trade ERP",
    sector: "Mining supply",
    location: "Tanzania",
    headline: "Finding tenders first, and bidding with confidence.",
    summary:
      "A system for a mining-sector supplier in Tanzania that finds tenders, tracks manufacturer authorisations and produces bid and trade documents.",
    challenge:
      "Cebuka bids on mining tenders using equipment from overseas manufacturers. Winning means spotting tenders early, holding the right authorisation letters and compliance documents, and getting the paperwork in before the deadline. Five separate jobs were being done by hand: finding tenders, chasing manufacturers, matching items to suppliers, preparing bids and recording orders.",
    built:
      "One system that brings those five jobs together. Tender sources are checked automatically every day, and new ones are suggested for a person to approve. Each opportunity is matched against the manufacturers who can supply it, and only counts as ready to bid once the authorisation letter is uploaded and confirmed. Deadlines and expiring documents are flagged in advance, bid documents are created in a few clicks, and a trade module records quotes, orders, shipments and invoices.",
    features: [
      "Daily checks for new tender sources, approved by a person",
      "AI reads tender notices and pulls out the key details",
      "Bid readiness matched against a registry of manufacturers",
      "Authorisation tracker with a queue of letters to chase",
      "Compliance documents tracked with their expiry dates",
      "Deadline alerts at 14, 7, 3 and 1 days before closing",
      "Six business documents, from EOI responses to invoices",
      "Trade module from RFQ to invoices and packing lists",
    ],
    highlights: [
      { value: "40+", label: "screens across the whole operation" },
      { value: "6", label: "business documents created for you" },
      { value: "4", label: "deadline alerts for every tender" },
      { value: "9", label: "equipment groups in the manufacturer registry" },
    ],
    visual: "tender-erp",
  },
  {
    id: "potters-house",
    client: "Potter’s House Church",
    type: "Discipleship and follow-up system",
    sector: "Church",
    location: "UK",
    headline: "Nobody falls through the cracks.",
    summary:
      "A phone-first system that follows every person who responds at a service, from the first phone call to being part of church life.",
    challenge:
      "When someone responds at a service, the next few weeks matter. The church wanted every person to be contacted, invited to their next step and looked after, without volunteers juggling lists or losing track of who needed a call.",
    built:
      "A workflow, not just a database. People register by scanning a QR code, or are added by the team. Each person moves through six stages, from new believer to fully part of church life, and volunteers see a Today list with one clear next step for everyone they look after. An hourly check sends reminders when a first call is late, a follow-up is missed or someone stops attending, and clears them once things are back on track.",
    features: [
      "QR-code registration, with checks for duplicates",
      "Six-stage journey with dated milestones",
      "A Today list with one recommended next step per person",
      "Sunday check-in and attendance tracking",
      "Prayer requests visible only to the people who need to see them",
      "13 kinds of automatic reminder, checked every hour",
      "Reports on each stage, attendance and where people wait longest",
      "A personal portal where people can follow their own progress",
    ],
    highlights: [
      { value: "6", label: "stages, from new believer to fully integrated" },
      { value: "13", label: "kinds of automatic reminder" },
      { value: "3", label: "roles: leaders, shepherds and disciples" },
      { value: "1", label: "clear next step for every person" },
    ],
    visual: "church",
  },
];
