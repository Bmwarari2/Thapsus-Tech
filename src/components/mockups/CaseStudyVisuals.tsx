/**
 * One distinct illustration per case study. Each follows the real system's
 * workflow, using sample data only.
 */
import type { CSSProperties } from "react";
import { Laptop, Phone } from "@/components/devices/Devices";
import { AppShell } from "./AppShell";

const tilt = (deg: number): CSSProperties => ({ transform: `rotate(${deg}deg)` });

type VisualProps = {
  /** Hide from assistive tech, e.g. when the picture sits inside a link that already has a name. */
  decorative?: boolean;
};

const imgProps = (label: string, decorative?: boolean) =>
  decorative ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": label };

/* ── Heritage: order board + export paperwork ─────────────── */
const EXPORT_MENU = ["Dashboard", "RFQs", "Proformas", "Purchase orders", "Dispatch", "Packing lists", "Tax invoices", "Clients"] as const;

function OrderBoard() {
  const cols: [string, [string, string, string, string?][]][] = [
    ["RFQ", [["RQ260041", "Slurry pump spares", "Read by AI", "green"], ["RQ260040", "Gearbox, 90 kW", "USD"]]],
    ["Proforma", [["PI260033", "Industrial pumps", "£12,400"], ["PI260032", "Drill rods", "$8,950"]]],
    ["Purchase order", [["PO260030", "Electric motors", "3 of 4 lines", "amber"], ["PO260029", "Engine parts", "£4,180"]]],
    ["Dispatch", [["DS260014", "Electric motors", "Ready", "green"]]],
    ["Documents", [["CI260014", "Commercial invoice", "PDF"], ["PL260014", "Packing list", "PDF"]]],
  ];
  return (
    <AppShell active="Purchase orders" items={EXPORT_MENU}>
      <div className="mk-top">
        <div>
          <div className="mk-h1">Orders</div>
          <div className="mk-sub">From request for quotation to shipping documents</div>
        </div>
        <div className="mk-actions">
          <span className="mk-pill mk-pill--dark">GBP</span>
          <span className="mk-pill">USD</span>
          <div className="mk-btn">Upload RFQ (PDF)</div>
        </div>
      </div>
      <div className="mk-kanban" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {cols.map(([name, cards]) => (
          <div className="mk-col" key={name}>
            <div className="mk-col__head">
              {name} <span>{cards.length}</span>
            </div>
            {cards.map(([ref, title, meta, tone]) => (
              <div className={`mk-deal ${tone === "green" && name === "Dispatch" ? "is-hot" : ""}`} key={ref}>
                <small style={{ color: "var(--mk-muted)" }}>{ref}</small>
                <b>{title}</b>
                <div className="mk-deal__foot">
                  {tone ? <span className={`mk-pill mk-pill--${tone}`}>{meta}</span> : <span className="mk-money">{meta}</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Paper({ title, number, rows, total, footer }: { title: string; number: string; rows: [string, string, string][]; total?: string; footer: string }) {
  return (
    <div className="mk-paper">
      <div className="mk-paper__inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="mk-brand" style={{ margin: 0, padding: 0, gap: "0.5em" }}>
            <i />
            Your business
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mk-paper__title">{title}</div>
            <div style={{ color: "#6e6e73" }}>No. {number}</div>
          </div>
        </div>
        <div className="mk-paper__rule" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4em 1em", color: "#6e6e73" }}>
          <span>Ship to</span>
          <span>Terms</span>
          <span className="mk-paper__line" style={{ width: "80%" }} />
          <span style={{ color: "#1d1d1f", fontWeight: 600 }}>CIF · Sea freight</span>
          <span className="mk-paper__line" style={{ width: "60%" }} />
          <span className="mk-paper__line" style={{ width: "70%" }} />
        </div>
        <div className="mk-paper__table">
          <span className="h">Item</span>
          <span className="h">Qty</span>
          <span className="h" style={{ textAlign: "right" }}>
            {total ? "Total" : "Weight"}
          </span>
          {rows.map(([item, qty, value]) => (
            <span key={item} style={{ display: "contents" }}>
              <span>{item}</span>
              <span>{qty}</span>
              <span style={{ textAlign: "right" }}>{value}</span>
            </span>
          ))}
        </div>
        {total ? (
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.15em" }}>
            <span>Total (USD)</span>
            <span>{total}</span>
          </div>
        ) : null}
        <div style={{ marginTop: "auto", display: "grid", gap: "0.45em" }}>
          <span style={{ color: "#6e6e73" }}>{footer}</span>
          <span className="mk-paper__line" style={{ width: "90%" }} />
          <span className="mk-paper__line" style={{ width: "65%" }} />
        </div>
      </div>
    </div>
  );
}

export function HeritageVisual({ decorative }: VisualProps) {
  return (
    <div
      {...imgProps("Illustration: an order board moving from request for quotation to shipping documents, with a commercial invoice and packing list in front", decorative)}
      className="relative pb-[9%]"
    >
      <div aria-hidden="true" className="w-[84%]">
        <Laptop label="Order board">
          <OrderBoard />
        </Laptop>
      </div>
      <div aria-hidden="true" className="absolute bottom-[7%] right-[10%] w-[23%]" style={tilt(5)}>
        <Paper
          title="PACKING LIST"
          number="PL260014"
          rows={[
            ["Box 1 · 120×80×90 cm", "1", "412 kg"],
            ["Box 2 · 120×80×90 cm", "1", "398 kg"],
            ["Crate · 60×60×70 cm", "1", "96 kg"],
          ]}
          footer="Marks and numbers as per order"
        />
      </div>
      <div aria-hidden="true" className="absolute bottom-[3%] right-[1%] w-[25%]" style={tilt(-4)}>
        <Paper
          title="COMMERCIAL INVOICE"
          number="CI260014"
          rows={[
            ["Electric motor, 75 kW", "2", "18,400.00"],
            ["Motor mounts", "4", "1,240.00"],
            ["Spare bearings", "12", "960.00"],
          ]}
          total="20,600.00"
          footer="Bank details · GBP and USD accounts"
        />
      </div>
    </div>
  );
}

/* ── Cebuka: dark tender radar + alert ────────────────────── */
const TENDER_MENU = ["Triage", "Opportunities", "Manufacturers", "Authorisations", "Compliance", "Documents", "Trade"] as const;

function TenderRadar() {
  // Days until each tender closes, on a 30-day scale.
  const tenders: [string, number][] = [
    ["Slurry pumps and spares", 3],
    ["Conveyor belt idlers", 8],
    ["Crusher wear parts", 15],
    ["Site PPE, annual supply", 22],
    ["Instrumentation upgrade", 28],
  ];
  const pct = (d: number) => `${(d / 30) * 100}%`;
  const matrix: [string, ("yes" | "wait" | "no")[]][] = [
    ["Slurry pumps", ["yes", "yes", "no", "no"]],
    ["Conveyor idlers", ["yes", "wait", "no", "yes"]],
    ["Crusher wear parts", ["no", "yes", "yes", "no"]],
    ["Filtration", ["wait", "no", "yes", "no"]],
  ];
  return (
    <AppShell active="Opportunities" items={TENDER_MENU} dark>
      <div className="mk-top">
        <div>
          <div className="mk-h1">Tender radar</div>
          <div className="mk-sub">3 new tenders found today · 5 closing this month</div>
        </div>
        <div className="mk-actions">
          <div className="mk-search">Search tenders…</div>
          <div className="mk-btn">Create EOI pack</div>
        </div>
      </div>
      <div className="mk-grid" style={{ gridTemplateColumns: "1.5fr 1fr", flex: 1 }}>
        <div className="mk-card">
          <div className="mk-card__head">
            Closing dates <span>Alerts at 14, 7, 3 and 1 days</span>
          </div>
          <div className="mk-gantt">
            <span />
            <div className="mk-gantt__scale">
              <span>Today</span>
              <span>1 wk</span>
              <span>2 wks</span>
              <span>3 wks</span>
              <span>4 wks</span>
            </div>
            {tenders.map(([name, d]) => (
              <span key={name} style={{ display: "contents" }}>
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
                <span className="mk-gantt__track">
                  <span className={`mk-gantt__bar ${d <= 3 ? "is-urgent" : ""}`} style={{ left: 0, width: pct(d) }} />
                  {[14, 7, 3, 1]
                    .filter((a) => d - a > 0)
                    .map((a) => (
                      <span key={a} className="mk-gantt__mark" style={{ left: pct(d - a) }} />
                    ))}
                  <span className="mk-gantt__today" style={{ left: 0 }} />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="mk-card">
          <div className="mk-card__head">
            Bid readiness <span>Manufacturers</span>
          </div>
          <div className="mk-matrix">
            <span />
            {["A", "B", "C", "D"].map((h) => (
              <span key={h} className="h">
                {h}
              </span>
            ))}
            {matrix.map(([item, cells]) => (
              <span key={item} style={{ display: "contents" }}>
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item}</span>
                {cells.map((c, i) => (
                  <span key={i} className={`mk-cell ${c === "yes" ? "is-yes" : c === "wait" ? "is-wait" : ""}`}>
                    {c === "yes" ? "✓" : c === "wait" ? "…" : "–"}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <div className="mk-sub" style={{ marginTop: "1em" }}>
            ✓ letter held and confirmed · … being chased
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.6em", flexWrap: "wrap" }}>
        {["Procurement portal ✓", "Mining authority ✓", "Company notices ✓", "2 manual checks due"].map((s, i) => (
          <span key={s} className={`mk-pill ${i < 3 ? "mk-pill--green" : "mk-pill--amber"}`}>
            {s}
          </span>
        ))}
      </div>
    </AppShell>
  );
}

export function CebukaVisual({ decorative }: VisualProps) {
  return (
    <div
      {...imgProps("Illustration: a dark tender dashboard with closing-date timelines and a bid-readiness grid, and an alert that a tender closes in three days", decorative)}
      className="relative pt-[4%]"
    >
      <div aria-hidden="true" className="mx-auto w-[92%]">
        <Laptop label="Tender radar">
          <TenderRadar />
        </Laptop>
      </div>
      <div aria-hidden="true" className="absolute right-0 top-0 w-[34%] min-w-[150px]">
        <div className="mk-toast">
          <div className="mk-toast__inner">
            <span className="mk-toast__icon">3</span>
            <span>
              <b style={{ display: "block", fontWeight: 650 }}>Closes in 3 days</b>
              <span style={{ color: "#c7c7cc" }}>Slurry pumps and spares. Authorisation confirmed, ready to bid.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Potter's House: three phones ─────────────────────────── */
function PhoneRegister() {
  return (
    <div className="mk-phone">
      <div className="mk-phone__bar">
        <span>Welcome</span>
        <span className="mk-avatar mk-avatar--g">QR</span>
      </div>
      <div>
        <div className="mk-phone__title">We’re glad you’re here</div>
        <div className="mk-sub">Tell us a little about you</div>
      </div>
      {["First name", "Mobile number"].map((f) => (
        <div key={f} className="mk-card" style={{ color: "var(--mk-muted)" }}>
          {f}
        </div>
      ))}
      <div className="mk-sub" style={{ margin: 0 }}>
        Today I…
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em" }}>
        <span className="mk-pill mk-pill--green">Gave my life</span>
        <span className="mk-pill">Rededicated</span>
        <span className="mk-pill">Am new here</span>
      </div>
      <div className="mk-phone__cta">Send</div>
    </div>
  );
}

function PhoneToday() {
  const people: [string, string, string, boolean?][] = [
    ["AO", "First call due", "Responded Sunday", true],
    ["KM", "Invite to class", "Called twice"],
    ["DT", "Missed 2 Sundays", "Check in", true],
    ["RB", "Confirm baptism", "Class done"],
  ];
  return (
    <div className="mk-phone">
      <div className="mk-phone__bar">
        <span>Your church</span>
        <span className="mk-pill mk-pill--amber">1 late</span>
      </div>
      <div>
        <div className="mk-phone__title">Today</div>
        <div className="mk-sub">4 people · one next step each</div>
      </div>
      <div className="mk-card" style={{ padding: "0.3em 0.9em" }}>
        {people.map(([who, step, meta, late]) => (
          <div className="mk-row" key={who}>
            <span className={`mk-avatar ${late ? "" : "mk-avatar--g"}`}>{who}</span>
            <span className="mk-row__main">
              <b>{step}</b>
              <small>{meta}</small>
            </span>
          </div>
        ))}
      </div>
      <div className="mk-phone__cta">Log a contact</div>
    </div>
  );
}

function PhoneJourney() {
  const stages = ["New believer", "New Believers Class", "Baptism", "Consistent attendance", "Ministry or small group", "Integrated"];
  const current = 2;
  return (
    <div className="mk-phone">
      <div className="mk-phone__bar">
        <span>‹ People</span>
        <span>Edit</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
        <span className="mk-avatar mk-avatar--g" style={{ width: "2.6em", height: "2.6em", fontSize: "1em" }}>
          KM
        </span>
        <div>
          <div style={{ fontSize: "1.3em", fontWeight: 700, letterSpacing: "-0.02em" }}>Journey</div>
          <div className="mk-sub" style={{ margin: 0 }}>
            Joined 3 weeks ago
          </div>
        </div>
      </div>
      <div className="mk-card">
        {stages.map((s, i) => (
          <div key={s} className={`mk-check ${i < current ? "is-done" : ""}`} style={i === current ? { fontWeight: 650, color: "var(--accent)" } : undefined}>
            <i style={i === current ? { borderColor: "var(--accent)", boxShadow: "inset 0 0 0 0.25em #fff", background: "var(--accent)" } : undefined} />
            {s}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4em", marginTop: "auto" }}>
        {["Call", "Text", "WhatsApp"].map((b) => (
          <span key={b} className="mk-btn mk-btn--ghost" style={{ justifyContent: "center", padding: "0.6em 0.2em" }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ChurchVisual({ decorative }: VisualProps) {
  return (
    <div
      {...imgProps("Illustration: three phones showing QR registration, a Today list of people to follow up, and one person's six-stage journey", decorative)}
      className="relative mx-auto aspect-[16/10] max-w-[880px]"
    >
      <div aria-hidden="true" className="absolute left-[8%] top-[9%] w-[25%]" style={tilt(-7)}>
        <Phone label="Registration">
          <PhoneRegister />
        </Phone>
      </div>
      <div aria-hidden="true" className="absolute right-[8%] top-[9%] w-[25%]" style={tilt(7)}>
        <Phone label="Journey">
          <PhoneJourney />
        </Phone>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 w-[28%] -translate-x-1/2">
        <Phone label="Today">
          <PhoneToday />
        </Phone>
      </div>
    </div>
  );
}

export const caseStudyVisuals = {
  "export-erp": HeritageVisual,
  "tender-erp": CebukaVisual,
  church: ChurchVisual,
} as const;
