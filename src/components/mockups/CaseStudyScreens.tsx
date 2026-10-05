/**
 * Illustrations of the client systems featured on the Work page. They follow
 * each system's real workflow but use sample data only.
 */
import { AppShell } from "./AppShell";

/* ── Sourcing & export ERP (Heritage Global Solutions) ─────── */
const EXPORT_MENU = ["Dashboard", "RFQs", "Proformas", "Purchase orders", "Dispatch", "Packing lists", "Tax invoices", "Clients"] as const;

export function ScreenExportERP() {
  const pipeline: [string, string][] = [
    ["RFQs", "12"],
    ["Proformas", "8"],
    ["Purchase orders", "15"],
    ["Dispatches", "6"],
    ["Shipping docs", "18"],
  ];
  const orders: [string, string, number, number, string?][] = [
    ["PO260031", "Industrial pumps", 5, 5],
    ["PO260030", "Electric motors, 75 kW", 3, 4, "short"],
    ["PO260029", "Mining drill bits", 2, 6],
    ["PO260028", "Combustion engine parts", 0, 3],
    ["PO260027", "Conveyor rollers", 4, 4],
  ];
  return (
    <AppShell active="Dashboard" items={EXPORT_MENU} brand="Your business">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Dashboard</div>
          <div className="mk-sub">Sourcing and export · GBP / USD</div>
        </div>
        <div className="mk-actions">
          <div className="mk-search">Search orders, clients, invoices…</div>
          <div className="mk-btn">Upload RFQ (PDF)</div>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {pipeline.map(([label, value], i) => (
          <div key={label} className="mk-card mk-card--soft mk-stat" style={{ position: "relative" }}>
            <small>
              {i + 1}. {label}
            </small>
            <b>{value}</b>
            {i < pipeline.length - 1 ? (
              <span style={{ position: "absolute", right: "-0.85em", top: "50%", transform: "translateY(-50%)", color: "#a1a1a6", fontWeight: 700 }}>›</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "1.5fr 1fr", flex: 1 }}>
        <div className="mk-card">
          <div className="mk-card__head">
            Purchase orders <span>Lines shipped</span>
          </div>
          <div className="mk-rows">
            {orders.map(([ref, title, shipped, total, flag]) => (
              <div className="mk-row" key={ref}>
                <span className="mk-time" style={{ width: "5.2em" }}>
                  {ref}
                </span>
                <span className="mk-row__main">
                  <b>{title}</b>
                </span>
                <span style={{ width: "6em" }}>
                  <span className="mk-progress" style={{ display: "block" }}>
                    <i style={{ width: `${(shipped / total) * 100}%`, background: flag ? "var(--mk-amber)" : undefined }} />
                  </span>
                </span>
                <span className="mk-money" style={{ width: "2.6em", textAlign: "right" }}>
                  {shipped}/{total}
                </span>
                {flag ? <span className="mk-pill mk-pill--amber">Short</span> : shipped === total ? <span className="mk-pill mk-pill--green">Shipped</span> : <span className="mk-pill">Open</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateRows: "auto 1fr" }}>
          <div className="mk-card">
            <div className="mk-card__head">
              New RFQ <span className="mk-pill mk-pill--green">Read by AI</span>
            </div>
            <div className="mk-rows">
              {[
                ["Customer", "Filled in"],
                ["6 line items", "Filled in"],
                ["Delivery terms", "CIF"],
              ].map(([k, v]) => (
                <div className="mk-row" key={k}>
                  <span className="mk-row__main">
                    <b>{k}</b>
                  </span>
                  <small style={{ color: "var(--mk-muted)" }}>{v}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="mk-card">
            <div className="mk-card__head">
              Dispatch DS260014 <span className="mk-pill mk-pill--dark">One click</span>
            </div>
            <div className="mk-rows">
              {[
                ["PDF", "Commercial invoice", "CI260014"],
                ["PDF", "Tax invoice", "TI260014"],
                ["PDF", "Packing list", "PL260014"],
              ].map(([ext, name, ref]) => (
                <div className="mk-row" key={ref}>
                  <span className="mk-file" data-ext={ext} />
                  <span className="mk-row__main">
                    <b>{name}</b>
                    <small>{ref}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Church follow-up and discipleship (Potter's House Church) ── */
const CHURCH_MENU = ["Today", "People", "Journey", "Attendance", "Prayer", "Groups", "Reports"] as const;

export function ScreenChurchFollowUp() {
  const today: [string, string, string, string, string?][] = [
    ["AO", "First contact due", "Responded on Sunday · call today", "New believer", "amber"],
    ["KM", "Invite to New Believers Class", "Called twice · keen to start", "New believer"],
    ["DT", "Missed 2 Sundays", "Gentle check-in suggested", "Consistent attendance", "amber"],
    ["RB", "Baptism date to confirm", "Class completed last week", "Baptism"],
    ["SL", "Introduce to a ministry", "Interested in Hospitality", "Ministry or small group"],
  ];
  const stages: [string, number][] = [
    ["New believer", 24],
    ["New Believers Class", 18],
    ["Baptism", 11],
    ["Consistent attendance", 15],
    ["Ministry or small group", 9],
    ["Integrated", 31],
  ];
  const max = Math.max(...stages.map(([, n]) => n));
  return (
    <AppShell active="Today" items={CHURCH_MENU} brand="Your church">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Today</div>
          <div className="mk-sub">5 people need a next step · sorted by urgency</div>
        </div>
        <div className="mk-actions">
          <div className="mk-btn mk-btn--ghost">Sunday check-in</div>
          <div className="mk-btn">+ Add person</div>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "1.55fr 1fr", flex: 1 }}>
        <div className="mk-card">
          <div className="mk-card__head">
            Your people <span>One next step each</span>
          </div>
          <div className="mk-rows">
            {today.map(([who, step, meta, stage, tone]) => (
              <div className="mk-row" key={who}>
                <span className="mk-avatar mk-avatar--g">{who}</span>
                <span className="mk-row__main">
                  <b>{step}</b>
                  <small>{meta}</small>
                </span>
                <span className={`mk-pill ${tone ? "mk-pill--amber" : ""}`}>{stage}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateRows: "1fr auto" }}>
          <div className="mk-card">
            <div className="mk-card__head">
              Journey <span>6 stages</span>
            </div>
            {stages.map(([label, n]) => (
              <div key={label} style={{ marginBottom: "0.6em" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3em" }}>
                  <span>{label}</span>
                  <span className="mk-sub" style={{ margin: 0 }}>
                    {n}
                  </span>
                </div>
                <div className="mk-progress">
                  <i style={{ width: `${(n / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mk-card">
            <div className="mk-card__head">
              Reminders <span className="mk-pill mk-pill--amber">3</span>
            </div>
            <div className="mk-sub" style={{ margin: 0 }}>
              Checked every hour. They clear themselves once someone has been followed up.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Tender, bid and trade ERP (Cebuka) ───────────────────── */
const TENDER_MENU = ["Triage", "Opportunities", "Manufacturers", "Authorisations", "Compliance", "Clients", "Documents", "Trade"] as const;

export function ScreenTenderERP() {
  const tenders: [string, string, string, string, string][] = [
    ["Slurry pumps and spares", "Mining", "3 days", "Ready to bid", "green"],
    ["Conveyor belt idlers", "Mining", "7 days", "1 letter missing", "amber"],
    ["Crusher wear parts", "Processing", "14 days", "Ready to bid", "green"],
    ["Site PPE, annual supply", "Safety", "21 days", "Needs review", ""],
    ["Instrumentation upgrade", "Electrical", "30 days", "Ready to bid", "green"],
  ];
  return (
    <AppShell active="Opportunities" items={TENDER_MENU} brand="Your business">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Opportunities</div>
          <div className="mk-sub">Found by daily source checks · matched to your manufacturers</div>
        </div>
        <div className="mk-actions">
          <span className="mk-pill mk-pill--dark">Open</span>
          <span className="mk-pill">Bidding</span>
          <span className="mk-pill">Won</span>
          <div className="mk-btn">Create EOI pack</div>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          ["New this week", "9"],
          ["Ready to bid", "6"],
          ["Letters to chase", "4"],
          ["Documents expiring", "2"],
        ].map(([k, v]) => (
          <div className="mk-card mk-card--soft mk-stat" key={k}>
            <small>{k}</small>
            <b>{v}</b>
          </div>
        ))}
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "1.6fr 1fr", flex: 1 }}>
        <div className="mk-card">
          <div className="mk-card__head">
            Tenders <span>Closing soonest first</span>
          </div>
          <div className="mk-rows">
            {tenders.map(([title, group, closes, state, tone]) => (
              <div className="mk-row" key={title}>
                <span className="mk-row__main">
                  <b>{title}</b>
                  <small>
                    {group} · closes in {closes}
                  </small>
                </span>
                <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{state}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateRows: "auto 1fr" }}>
          <div className="mk-card">
            <div className="mk-card__head">
              Deadline alerts <span className="mk-pill mk-pill--amber">3</span>
            </div>
            <div className="mk-rows">
              {[
                ["Slurry pumps", "3 days left"],
                ["Authorisation letter", "Expires in 45 days"],
                ["Tax clearance", "Renew this month"],
              ].map(([k, v]) => (
                <div className="mk-row" key={k}>
                  <span className="mk-row__main">
                    <b>{k}</b>
                  </span>
                  <small style={{ color: "var(--mk-muted)" }}>{v}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="mk-card">
            <div className="mk-card__head">Bid documents</div>
            <div className="mk-rows">
              {[
                ["PDF", "EOI response"],
                ["PDF", "Quotation"],
                ["PDF", "Authorisation request"],
              ].map(([ext, name]) => (
                <div className="mk-row" key={name}>
                  <span className="mk-file" data-ext={ext} />
                  <span className="mk-row__main">
                    <b>{name}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
