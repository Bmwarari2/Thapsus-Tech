/**
 * More example screens (sample data only). Laptop screens use AppShell;
 * tablet screens use the full-width layout with a larger base size.
 */
import type { ReactNode } from "react";
import { AppShell } from "./AppShell";

function TabletApp({ title, sub, action, children }: { title: string; sub: string; action?: string; children: ReactNode }) {
  return (
    <div className="mk-app mk-app--full mk-app--tablet" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="mk-portal-top" style={{ padding: "1.1em 1.6em" }}>
        <div className="mk-brand" style={{ margin: 0 }}>
          <i />
          Your business
        </div>
        <span className="mk-avatar">JS</span>
      </div>
      <div className="mk-main" style={{ padding: "1.5em 1.6em", gap: "1.1em" }}>
        <div className="mk-top">
          <div>
            <div className="mk-h1">{title}</div>
            <div className="mk-sub">{sub}</div>
          </div>
          {action ? <div className="mk-btn">{action}</div> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── ERP: orders through production ───────────────────────── */
export function ScreenERP() {
  const orders: [string, string, string, string, string][] = [
    ["SO-4821", "Trade counter order", "Picking", "dark", "£2,140"],
    ["SO-4820", "Wholesale, 40 units", "In production", "green", "£8,600"],
    ["SO-4819", "Repeat order", "Awaiting stock", "amber", "£1,320"],
    ["SO-4818", "Custom fabrication", "In production", "green", "£5,980"],
    ["SO-4817", "Online order", "Dispatched", "", "£460"],
    ["SO-4816", "Contract supply", "Invoiced", "", "£12,400"],
  ];
  return (
    <AppShell active="Jobs">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Operations</div>
          <div className="mk-sub">Orders, production and stock, live</div>
        </div>
        <div className="mk-actions">
          <span className="mk-pill mk-pill--dark">Orders</span>
          <span className="mk-pill">Production</span>
          <span className="mk-pill">Purchasing</span>
          <div className="mk-btn">+ New order</div>
        </div>
      </div>
      <div className="mk-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          ["Open orders", "38"],
          ["In production", "12"],
          ["Due this week", "9"],
          ["Stock alerts", "4"],
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
            Orders <span>Sorted by due date</span>
          </div>
          <div className="mk-rows">
            {orders.map(([ref, title, status, tone, value]) => (
              <div className="mk-row" key={ref}>
                <span className="mk-time" style={{ width: "4.6em" }}>
                  {ref}
                </span>
                <span className="mk-row__main">
                  <b>{title}</b>
                </span>
                <span className="mk-money">{value}</span>
                <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateRows: "auto 1fr" }}>
          <div className="mk-card">
            <div className="mk-card__head">Production line</div>
            {[
              ["Cutting", 82],
              ["Assembly", 64],
              ["Finishing", 40],
              ["Quality check", 25],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: "0.75em" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35em" }}>
                  <span>{k}</span>
                  <span className="mk-sub" style={{ margin: 0 }}>
                    {v}%
                  </span>
                </div>
                <div className="mk-progress">
                  <i style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mk-card">
            <div className="mk-card__head">
              Reorder soon <span className="mk-pill mk-pill--amber">4</span>
            </div>
            <div className="mk-rows">
              {[
                ["Steel sheet 2mm", "12 left"],
                ["Fixings, M8", "140 left"],
                ["Packaging, large", "30 left"],
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
        </div>
      </div>
    </AppShell>
  );
}

/* ── Church discipleship & membership ─────────────────────── */
export function ScreenDiscipleship() {
  return (
    <div className="mk-app" style={{ gridTemplateColumns: "17.5% 1fr" }}>
      <aside className="mk-side">
        <div className="mk-brand">
          <i />
          Your church
        </div>
        {["Home", "People", "Groups", "Pathways", "Events", "Volunteers", "Giving"].map((item) => (
          <div key={item} className={`mk-nav ${item === "Pathways" ? "is-on" : ""}`}>
            {item}
          </div>
        ))}
      </aside>
      <div className="mk-main">
        <div className="mk-top">
          <div>
            <div className="mk-h1">Discipleship pathways</div>
            <div className="mk-sub">142 people on a pathway · 18 small groups</div>
          </div>
          <div className="mk-actions">
            <div className="mk-btn mk-btn--ghost">Groups</div>
            <div className="mk-btn">+ Add person</div>
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            ["Exploring", "36", 30],
            ["Foundations", "48", 55],
            ["Growing", "41", 70],
            ["Leading", "17", 90],
          ].map(([k, v, p]) => (
            <div className="mk-card mk-card--soft mk-stat" key={k as string}>
              <small>{k}</small>
              <b>{v}</b>
              <div className="mk-progress" style={{ marginTop: "0.6em", background: "#fff" }}>
                <i style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mk-grid" style={{ gridTemplateColumns: "1.5fr 1fr", flex: 1 }}>
          <div className="mk-card">
            <div className="mk-card__head">
              Small groups <span>This week</span>
            </div>
            <div className="mk-rows">
              {[
                ["Tuesday evening group", "Leader: AK · 9 attending", "Foundations", "green"],
                ["Young adults", "Leader: RT · 14 attending", "Growing", "green"],
                ["Wednesday mornings", "Leader: JS · 7 attending", "Exploring", ""],
                ["Leaders’ huddle", "Leader: SM · 6 attending", "Leading", "dark"],
                ["Thursday prayer", "Leader: AK · 11 attending", "Growing", ""],
              ].map(([title, meta, stage, tone]) => (
                <div className="mk-row" key={title}>
                  <span className="mk-row__main">
                    <b>{title}</b>
                    <small>{meta}</small>
                  </span>
                  <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{stage}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mk-grid" style={{ gridTemplateRows: "auto 1fr" }}>
            <div className="mk-card">
              <div className="mk-card__head">Next steps</div>
              {[
                ["Follow up with 6 new guests", true],
                ["Assign mentors for Foundations", true],
                ["Confirm volunteers for Sunday", false],
              ].map(([label, done]) => (
                <div className={`mk-check ${done ? "is-done" : ""}`} key={label as string}>
                  <i />
                  {label}
                </div>
              ))}
            </div>
            <div className="mk-card">
              <div className="mk-card__head">
                Attendance <span>8 weeks</span>
              </div>
              <div className="mk-bars" style={{ height: "5em" }}>
                {[60, 64, 58, 70, 72, 68, 78, 82].map((h, i) => (
                  <i key={i} className={i === 7 ? "is-on" : ""} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tablet: project board ────────────────────────────────── */
export function TabletProjects() {
  const cols: [string, [string, string, string?][]][] = [
    ["To do", [["Site survey", "Due Fri"], ["Order materials", "Due Mon"], ["Client sign-off", "Due 14 Oct"]]],
    ["Doing", [["Design drawings", "AK · 60%", "on"], ["Planning pack", "JS · 30%"]]],
    ["Done", [["Kick-off call", "Done"], ["Budget agreed", "Done"]]],
  ];
  return (
    <TabletApp title="Projects" sub="Office refit · 12 tasks" action="+ Task">
      <div className="mk-kanban" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {cols.map(([name, cards]) => (
          <div className="mk-col" key={name}>
            <div className="mk-col__head">
              {name} <span>{cards.length}</span>
            </div>
            {cards.map(([t, m, on]) => (
              <div className={`mk-deal ${on ? "is-hot" : ""}`} key={t}>
                <b>{t}</b>
                <div className="mk-deal__foot">
                  <span>{m}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </TabletApp>
  );
}

/* ── Tablet: stock & inventory ────────────────────────────── */
export function TabletInventory() {
  const items: [string, string, number, string?][] = [
    ["Copper pipe 15mm", "Van 2", 18],
    ["Radiator valves", "Warehouse", 64],
    ["Boiler filters", "Van 1", 4, "low"],
    ["Pressure gauges", "Warehouse", 22],
    ["Flue kits", "Warehouse", 2, "low"],
    ["Sealant", "Van 3", 35],
  ];
  return (
    <TabletApp title="Stock" sub="3 locations · 2 items low" action="Scan item">
      <div className="mk-card" style={{ flex: 1 }}>
        <div className="mk-rows">
          {items.map(([name, where, qty, low]) => (
            <div className="mk-row" key={name}>
              <span className="mk-row__main">
                <b>{name}</b>
                <small>{where}</small>
              </span>
              <span style={{ width: "6em" }}>
                <span className="mk-progress" style={{ display: "block" }}>
                  <i style={{ width: `${Math.min(100, qty * 1.4)}%`, background: low ? "var(--mk-amber)" : undefined }} />
                </span>
              </span>
              <span className="mk-money" style={{ width: "2.4em", textAlign: "right" }}>
                {qty}
              </span>
              {low ? <span className="mk-pill mk-pill--amber">Low</span> : <span className="mk-pill">OK</span>}
            </div>
          ))}
        </div>
      </div>
    </TabletApp>
  );
}

/* ── Tablet: HR leave ─────────────────────────────────────── */
export function TabletHR() {
  return (
    <TabletApp title="Leave" sub="October · 2 requests waiting">
      <div className="mk-card">
        <div className="mk-card__head">
          New request <span className="mk-pill mk-pill--amber">Waiting</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
          <span className="mk-avatar mk-avatar--g">RT</span>
          <span className="mk-row__main">
            <b>Annual leave · 4 days</b>
            <small style={{ color: "var(--mk-muted)" }}>Mon 20 – Thu 23 October · 14 days left</small>
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.6em", marginTop: "1em" }}>
          <span className="mk-btn">Approve</span>
          <span className="mk-btn mk-btn--ghost">Decline</span>
        </div>
      </div>
      <div className="mk-card" style={{ flex: 1 }}>
        <div className="mk-card__head">Who’s off</div>
        <div className="mk-rows">
          {[
            ["AK", "Annual leave", "6–8 Oct"],
            ["JS", "Training day", "15 Oct"],
            ["SM", "Annual leave", "27–31 Oct"],
          ].map(([who, what, when]) => (
            <div className="mk-row" key={who + when}>
              <span className="mk-avatar">{who}</span>
              <span className="mk-row__main">
                <b>{what}</b>
              </span>
              <small style={{ color: "var(--mk-muted)" }}>{when}</small>
            </div>
          ))}
        </div>
      </div>
    </TabletApp>
  );
}

/* ── Tablet: forms & approvals ────────────────────────────── */
export function TabletForms() {
  return (
    <TabletApp title="Site inspection" sub="Form #INS-208 · Unit 4" action="Submit">
      <div className="mk-card">
        {[
          ["Fire exits clear", true],
          ["Extinguishers in date", true],
          ["First aid kit stocked", true],
          ["Lighting working", false],
        ].map(([label, done]) => (
          <div className={`mk-check ${done ? "is-done" : ""}`} key={label as string}>
            <i />
            {label}
          </div>
        ))}
      </div>
      <div className="mk-card" style={{ flex: 1 }}>
        <div className="mk-card__head">Approval</div>
        <div className="mk-rows">
          {[
            ["Inspector", "Signed", "green"],
            ["Site manager", "Waiting", "amber"],
            ["Director", "Next", ""],
          ].map(([who, state, tone]) => (
            <div className="mk-row" key={who}>
              <span className="mk-row__main">
                <b>{who}</b>
              </span>
              <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{state}</span>
            </div>
          ))}
        </div>
      </div>
    </TabletApp>
  );
}

/* ── Tablet: helpdesk ─────────────────────────────────────── */
export function TabletHelpdesk() {
  return (
    <TabletApp title="Tickets" sub="14 open · 3 due today" action="+ Ticket">
      <div className="mk-card" style={{ flex: 1 }}>
        <div className="mk-rows">
          {[
            ["#882", "Heating not working, Unit 2", "Urgent", "dark", "1h left"],
            ["#881", "Access card request", "Normal", "", "Today"],
            ["#880", "Leaking tap, kitchen", "High", "amber", "3h left"],
            ["#879", "New starter laptop", "Normal", "", "Tomorrow"],
            ["#878", "Invoice query", "Low", "", "Fri"],
            ["#877", "Broken blind, office 3", "Resolved", "green", "Done"],
          ].map(([ref, title, pri, tone, due]) => (
            <div className="mk-row" key={ref}>
              <span className="mk-time">{ref}</span>
              <span className="mk-row__main">
                <b>{title}</b>
                <small>{due}</small>
              </span>
              <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{pri}</span>
            </div>
          ))}
        </div>
      </div>
    </TabletApp>
  );
}

/* ── Laptop: a business website ───────────────────────────── */
export function ScreenWebsite() {
  return (
    <div className="mk-app mk-app--full" style={{ gridTemplateRows: "auto auto 1fr" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em", padding: "0.7em 1em", background: "#f5f5f7", borderBottom: "1px solid #e8e8ed" }}>
        <span style={{ display: "flex", gap: "0.35em" }}>
          {[0, 1, 2].map((i) => (
            <i key={i} style={{ width: "0.7em", height: "0.7em", borderRadius: "50%", background: "#d2d2d7", display: "block" }} />
          ))}
        </span>
        <span style={{ margin: "0 auto", padding: "0.3em 6em", borderRadius: "0.5em", background: "#fff", color: "#6e6e73" }}>yourbusiness.co.uk</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4em 3em" }}>
        <div className="mk-brand" style={{ margin: 0 }}>
          <i />
          Your business
        </div>
        <div style={{ display: "flex", gap: "2em", color: "#6e6e73" }}>
          <span>Services</span>
          <span>Our work</span>
          <span>Reviews</span>
          <span>Contact</span>
        </div>
        <span className="mk-btn">Get a quote</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2.5em", padding: "2em 3em 3em", alignItems: "center" }}>
        <div>
          <span className="mk-pill mk-pill--green">Serving Greater Manchester</span>
          <div style={{ fontSize: "4em", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, marginTop: "0.35em" }}>
            Heating, done properly.
          </div>
          <div className="mk-sub" style={{ fontSize: "1.3em", marginTop: "0.8em", maxWidth: "24em" }}>
            Book a service online in under a minute. We’ll confirm by text.
          </div>
          <div style={{ display: "flex", gap: "0.8em", marginTop: "1.6em" }}>
            <span className="mk-btn" style={{ padding: "0.8em 1.5em" }}>
              Book a service
            </span>
            <span className="mk-btn mk-btn--ghost" style={{ padding: "0.8em 1.5em" }}>
              Call us
            </span>
          </div>
        </div>
        <div style={{ position: "relative", aspectRatio: "4 / 3.4", borderRadius: "1.4em", background: "linear-gradient(150deg, #e5f3ef, #cfe7df 55%, #b6d9cd)" }}>
          <div className="mk-card" style={{ position: "absolute", left: "-1.5em", bottom: "1.5em", width: "60%", boxShadow: "0 12px 30px -12px rgba(0,0,0,0.25)" }}>
            <b style={{ fontWeight: 600 }}>Next available</b>
            <div className="mk-sub">Thursday · 9:00, 11:00, 14:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
