/**
 * Example screens of the kinds of tools Thapsus builds. All data is generic
 * sample content: no real clients, people or results.
 */
import { AppShell } from "./AppShell";

/* ── Today: the everyday overview ─────────────────────────── */
export function ScreenToday() {
  return (
    <AppShell active="Today">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Good morning</div>
          <div className="mk-sub">Monday · 12 jobs booked, 2 new enquiries</div>
        </div>
        <div className="mk-actions">
          <div className="mk-search">Search customers, jobs…</div>
          <div className="mk-btn">+ New job</div>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="mk-card mk-card--soft mk-stat">
          <small>Jobs today</small>
          <b>12</b>
          <em>3 done</em>
        </div>
        <div className="mk-card mk-card--soft mk-stat">
          <small>Quotes out</small>
          <b>£14.2k</b>
        </div>
        <div className="mk-card mk-card--soft mk-stat">
          <small>Invoices due</small>
          <b>3</b>
        </div>
        <div className="mk-card mk-card--soft mk-stat">
          <small>Team on shift</small>
          <b>6/7</b>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "1.55fr 1fr", flex: 1 }}>
        <div className="mk-card">
          <div className="mk-card__head">
            Today’s schedule <span>View all</span>
          </div>
          <div className="mk-rows">
            {[
              ["08:30", "Boiler service", "Hazel Grove", "AK", "Done", "green"],
              ["10:00", "Kitchen survey", "Bramhall", "JS", "Done", "green"],
              ["11:30", "Annual inspection", "Cheadle", "RT", "On site", "dark"],
              ["13:30", "Bathroom fit, day 2", "Marple", "AK", "Next", ""],
              ["15:00", "Quote visit", "Didsbury", "JS", "Next", ""],
              ["16:30", "Handover", "Stockport", "RT", "Next", ""],
            ].map(([time, job, place, who, status, tone]) => (
              <div className="mk-row" key={time}>
                <span className="mk-time">{time}</span>
                <span className="mk-row__main">
                  <b>{job}</b>
                  <small>{place}</small>
                </span>
                <span className="mk-avatar">{who}</span>
                <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-grid" style={{ gridTemplateRows: "auto 1fr" }}>
          <div className="mk-card">
            <div className="mk-card__head">
              New enquiries <span className="mk-pill mk-pill--green">2 new</span>
            </div>
            <div className="mk-rows">
              {[
                ["Loft conversion", "Website form · 9 min ago"],
                ["Service contract", "Phone · 1 hr ago"],
                ["Garden office", "Email · yesterday"],
              ].map(([title, meta]) => (
                <div className="mk-row" key={title}>
                  <span className="mk-row__main">
                    <b>{title}</b>
                    <small>{meta}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mk-card">
            <div className="mk-card__head">
              This week <span>Jobs</span>
            </div>
            <div className="mk-bars">
              {[55, 72, 64, 90, 48, 28, 18].map((h, i) => (
                <i key={i} className={i === 0 ? "is-on" : ""} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mk-bars-labels">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── CRM & sales pipeline ─────────────────────────────────── */
const PIPELINE: { name: string; count: number; total: string; deals: [string, string, string, string, boolean?][] }[] = [
  {
    name: "New",
    count: 4,
    total: "£9,400",
    deals: [
      ["Loft conversion", "£4,800", "AK", "Today"],
      ["Office refit", "£2,900", "JS", "1d"],
      ["Garden office", "£1,700", "RT", "2d"],
    ],
  },
  {
    name: "Contacted",
    count: 3,
    total: "£12,150",
    deals: [
      ["Service contract", "£3,600", "JS", "1d", true],
      ["Kitchen refit", "£6,250", "AK", "3d"],
      ["Rewire", "£2,300", "RT", "4d"],
    ],
  },
  {
    name: "Quoted",
    count: 3,
    total: "£15,800",
    deals: [
      ["Bathroom suite", "£7,400", "AK", "2d"],
      ["Extension plans", "£5,200", "JS", "5d"],
      ["New boiler", "£3,200", "RT", "6d"],
    ],
  },
  {
    name: "Won",
    count: 2,
    total: "£11,250",
    deals: [
      ["Shop fit-out", "£8,900", "JS", "Mon"],
      ["Annual service", "£2,350", "AK", "Fri"],
    ],
  },
];

export function ScreenCRM() {
  return (
    <AppShell active="Customers">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Sales pipeline</div>
          <div className="mk-sub">12 open deals · £48,600 in play</div>
        </div>
        <div className="mk-actions">
          <span className="mk-pill mk-pill--dark">All</span>
          <span className="mk-pill">Mine</span>
          <span className="mk-pill">This month</span>
          <div className="mk-btn">+ Add lead</div>
        </div>
      </div>
      <div className="mk-kanban">
        {PIPELINE.map((col) => (
          <div className="mk-col" key={col.name}>
            <div className="mk-col__head">
              {col.name} <span>{col.total}</span>
            </div>
            {col.deals.map(([title, value, who, when, hot]) => (
              <div className={`mk-deal ${hot ? "is-hot" : ""}`} key={title}>
                <b>{title}</b>
                <span className="mk-money">{value}</span>
                <div className="mk-deal__foot">
                  <span className="mk-avatar">{who}</span>
                  {hot ? <span className="mk-pill mk-pill--green">Follow up</span> : <span>{when}</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ── Booking & scheduling ─────────────────────────────────── */
type Ev = [day: number, start: number, length: number, title: string, meta: string, tone?: "grey" | "solid"];
const EVENTS: Ev[] = [
  [0, 0, 1.5, "Consultation", "09:00 · Room 1"],
  [0, 2, 1, "Follow-up", "11:00", "grey"],
  [0, 4.5, 2, "Group session", "13:30 · 6 booked"],
  [1, 0.5, 1, "Assessment", "09:30", "grey"],
  [1, 2, 2, "Site visit", "11:00 · Marple"],
  [1, 5, 1.5, "Consultation", "14:00"],
  [2, 1, 1.5, "Consultation", "10:00 · Room 2", "solid"],
  [2, 3.5, 1, "Call back", "12:30", "grey"],
  [2, 5, 2, "Workshop", "14:00 · 8 booked"],
  [3, 0, 2, "Training", "09:00 · Team"],
  [3, 3, 1, "Assessment", "12:00", "grey"],
  [3, 4.5, 1.5, "Consultation", "13:30"],
  [4, 0.5, 1.5, "Review", "09:30"],
  [4, 3, 1, "Follow-up", "12:00", "grey"],
  [4, 5, 1.5, "Consultation", "14:00"],
];

export function ScreenBookings() {
  const days = [
    ["Mon", "6"],
    ["Tue", "7"],
    ["Wed", "8"],
    ["Thu", "9"],
    ["Fri", "10"],
  ];
  return (
    <AppShell active="Bookings">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Bookings</div>
          <div className="mk-sub">6–10 October · 15 booked, 9 slots free</div>
        </div>
        <div className="mk-actions">
          <div className="mk-avatars">
            <span className="mk-avatar mk-avatar--g">AK</span>
            <span className="mk-avatar">JS</span>
            <span className="mk-avatar">RT</span>
          </div>
          <div className="mk-btn mk-btn--ghost">Week</div>
          <div className="mk-btn">+ New booking</div>
        </div>
      </div>
      <div className="mk-cal" style={{ gridTemplateRows: "auto 1fr" }}>
        <div />
        {days.map(([d, n], i) => (
          <div key={d} className={`mk-cal__day ${i === 2 ? "is-today" : ""}`}>
            {d} {n}
            <small>{i === 2 ? "Today" : `${[3, 2, 0, 1, 3][i]} free`}</small>
          </div>
        ))}
        <div className="mk-cal__times">
          {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {days.map(([d], day) => (
          <div className="mk-cal__col" key={d}>
            {EVENTS.filter((e) => e[0] === day).map(([, s, h, title, meta, tone]) => (
              <div
                key={`${day}-${s}`}
                className={`mk-event ${tone ? `mk-event--${tone}` : ""}`}
                style={{ ["--s" as string]: s, ["--h" as string]: h }}
              >
                <b>{title}</b>
                <small>{meta}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ── Job management ───────────────────────────────────────── */
export function ScreenJobs() {
  return (
    <AppShell active="Jobs">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Jobs</div>
          <div className="mk-sub">8 live · 3 awaiting sign-off</div>
        </div>
        <div className="mk-actions">
          <div className="mk-search">Search jobs…</div>
          <div className="mk-btn">+ New job</div>
        </div>
      </div>
      <div className="mk-split">
        <div className="mk-card">
          <div className="mk-rows">
            {[
              ["#1042", "Boiler service", "In progress", "green", true],
              ["#1041", "Kitchen refit", "Awaiting parts", "amber"],
              ["#1040", "Annual inspection", "Sign-off", ""],
              ["#1039", "Bathroom suite", "Sign-off", ""],
              ["#1038", "Rewire, ground floor", "Booked", ""],
              ["#1037", "Shop fit-out", "Complete", "green"],
            ].map(([ref, title, status, tone, on]) => (
              <div className={`mk-row mk-job ${on ? "is-on" : ""}`} key={ref as string}>
                <span className="mk-row__main">
                  <b>{title}</b>
                  <small>{ref}</small>
                </span>
                <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-card" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <div className="mk-top">
            <div>
              <div style={{ fontSize: "1.45em", fontWeight: 700, letterSpacing: "-0.02em" }}>Boiler service · #1042</div>
              <div className="mk-sub">Hazel Grove · Thursday 14:00 · AK</div>
            </div>
            <span className="mk-pill mk-pill--green">In progress</span>
          </div>
          <div className="mk-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.4em" }}>
            <div>
              {[
                ["Gas safety check", true],
                ["Flue inspected", true],
                ["Parts replaced", true],
                ["Pressure tested", false],
                ["Customer walkthrough", false],
              ].map(([label, done]) => (
                <div className={`mk-check ${done ? "is-done" : ""}`} key={label as string}>
                  <i />
                  {label}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8em" }}>
              <div className="mk-card__head" style={{ marginBottom: 0 }}>
                Photos <span>3</span>
              </div>
              <div className="mk-photos">
                <span className="mk-photo" />
                <span className="mk-photo" />
                <span className="mk-photo" />
                <span className="mk-photo mk-photo--add">+</span>
              </div>
              <div className="mk-card__head" style={{ marginBottom: 0, marginTop: "0.3em" }}>
                Parts used <span>£86.40</span>
              </div>
              <div className="mk-progress">
                <i style={{ width: "60%" }} />
              </div>
            </div>
          </div>
          <div className="mk-sign" style={{ marginTop: "auto" }}>
            <span>
              <b style={{ fontWeight: 600 }}>Customer sign-off</b>
              <br />
              <small style={{ color: "var(--mk-muted)" }}>Signed on the engineer’s phone</small>
            </span>
            <svg className="mk-signature" viewBox="0 0 120 36" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round">
              <path d="M4 26c8-14 14-20 18-18s-6 18-2 18 10-16 14-15-2 13 2 13 8-10 12-10 2 8 6 8 10-6 14-6 6 4 10 3 10-5 16-6" />
            </svg>
            <span className="mk-btn">Send report</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Client portal ────────────────────────────────────────── */
export function ScreenPortal() {
  return (
    <div className="mk-app mk-app--full" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="mk-portal-top">
        <div className="mk-brand" style={{ margin: 0 }}>
          <i />
          Your business · Client portal
        </div>
        <div className="mk-actions">
          <span className="mk-sub" style={{ margin: 0 }}>
            Messages
          </span>
          <span className="mk-sub" style={{ margin: 0 }}>
            Documents
          </span>
          <span className="mk-avatar mk-avatar--g">SM</span>
        </div>
      </div>
      <div className="mk-main" style={{ padding: "2em 3.2em" }}>
        <div className="mk-top">
          <div>
            <div className="mk-h1">Welcome back, Sam</div>
            <div className="mk-sub">Your project is on track for handover on 24 October.</div>
          </div>
          <div className="mk-btn">Message the team</div>
        </div>

        <div className="mk-card">
          <div className="mk-card__head">
            Project progress <span>Stage 3 of 4</span>
          </div>
          <div className="mk-steps">
            {[
              ["Brief agreed", "12 Sep", "is-done"],
              ["Design approved", "26 Sep", "is-done"],
              ["Build", "In progress", "is-now"],
              ["Handover", "24 Oct", ""],
            ].map(([title, when, state]) => (
              <div className={`mk-step ${state}`} key={title}>
                <i />
                <b style={{ fontWeight: 600 }}>{title}</b>
                <small>{when}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="mk-grid" style={{ gridTemplateColumns: "1.2fr 1fr", flex: 1 }}>
          <div className="mk-card">
            <div className="mk-card__head">
              Documents <span>Upload</span>
            </div>
            <div className="mk-rows">
              {[
                ["PDF", "Signed agreement", "12 Sep"],
                ["PDF", "Approved designs", "26 Sep"],
                ["XLS", "Product list", "2 Oct"],
              ].map(([ext, name, date]) => (
                <div className="mk-row" key={name}>
                  <span className="mk-file" data-ext={ext} />
                  <span className="mk-row__main">
                    <b>{name}</b>
                    <small>Added {date}</small>
                  </span>
                </div>
              ))}
            </div>
            <div className="mk-drop" style={{ marginTop: "0.8em" }}>
              Drop files here to share them with the team
            </div>
          </div>
          <div className="mk-card">
            <div className="mk-card__head">
              Invoices <span>£4,200 paid</span>
            </div>
            <div className="mk-rows">
              {[
                ["Deposit", "£1,800", "Paid", "green"],
                ["Stage 2", "£2,400", "Paid", "green"],
                ["Stage 3", "£2,400", "Due 20 Oct", "amber"],
                ["Final", "£1,400", "On handover", ""],
              ].map(([name, amount, status, tone]) => (
                <div className="mk-row" key={name}>
                  <span className="mk-row__main">
                    <b>{name}</b>
                  </span>
                  <span className="mk-money">{amount}</span>
                  <span className={`mk-pill ${tone ? `mk-pill--${tone}` : ""}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboards & reporting ───────────────────────────────── */
export function ScreenReports() {
  // Sample monthly figures for the chart (illustrative only).
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const values = [42, 48, 46, 57, 61, 68];
  const max = 80;
  const w = 600;
  const h = 200;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <AppShell active="Reports">
      <div className="mk-top">
        <div>
          <div className="mk-h1">Reports</div>
          <div className="mk-sub">April – September · updated live</div>
        </div>
        <div className="mk-actions">
          <span className="mk-pill">Month</span>
          <span className="mk-pill mk-pill--dark">6 months</span>
          <span className="mk-pill">Year</span>
          <div className="mk-btn mk-btn--ghost">Export</div>
        </div>
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          ["Revenue", "£322k", "+12%"],
          ["Jobs completed", "418", "+8%"],
          ["Avg. job value", "£770", "+4%"],
          ["Repeat customers", "61%", "+5 pts"],
        ].map(([label, value, delta]) => (
          <div className="mk-card mk-card--soft mk-stat" key={label}>
            <small>{label}</small>
            <b>{value}</b>
            <em>{delta}</em>
          </div>
        ))}
      </div>

      <div className="mk-grid" style={{ gridTemplateColumns: "1.7fr 1fr", flex: 1 }}>
        <div className="mk-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="mk-card__head">
            Monthly revenue <span>£k</span>
          </div>
          <svg className="mk-chart" viewBox={`-8 -12 ${w + 16} ${h + 40}`} preserveAspectRatio="none" style={{ flex: 1 }}>
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="#e8e8ed" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={area} fill="var(--accent)" opacity="0.1" />
            <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 6 : 0} fill="var(--accent)" stroke="#fff" strokeWidth="3" />
            ))}
          </svg>
          <div className="mk-bars-labels">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        <div className="mk-card" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <div className="mk-card__head" style={{ marginBottom: 0 }}>
            Work by type
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.4em" }}>
            <div className="mk-donut" />
            <div style={{ display: "grid", gap: "0.55em" }}>
              <span className="mk-legend">
                <span>Servicing 46%</span>
              </span>
              <span className="mk-legend" style={{ ["--c" as string]: "var(--accent-on-dark)" }}>
                <span>Installs 25%</span>
              </span>
              <span className="mk-legend" style={{ ["--c" as string]: "#c7c7cc" }}>
                <span>Repairs 17%</span>
              </span>
              <span className="mk-legend" style={{ ["--c" as string]: "#e3e3e8" }}>
                <span>Other 12%</span>
              </span>
            </div>
          </div>
          <div className="mk-rows" style={{ marginTop: "auto" }}>
            {[
              ["Busiest day", "Thursday"],
              ["Quote win rate", "38%"],
            ].map(([k, v]) => (
              <div className="mk-row" key={k}>
                <span className="mk-row__main">
                  <small>{k}</small>
                </span>
                <span className="mk-money">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Phone: job sheet ─────────────────────────────────────── */
export function PhoneJobSheet() {
  return (
    <div className="mk-phone">
      <div className="mk-phone__bar">
        <span>‹ Jobs</span>
        <span className="mk-pill mk-pill--green">In progress</span>
      </div>
      <div>
        <div className="mk-phone__title">Boiler service</div>
        <div className="mk-sub">#1042 · Thu 14:00 · Hazel Grove</div>
      </div>
      <div className="mk-card">
        {[
          ["Gas safety check", true],
          ["Flue inspected", true],
          ["Parts replaced", true],
          ["Pressure tested", false],
        ].map(([label, done]) => (
          <div className={`mk-check ${done ? "is-done" : ""}`} key={label as string}>
            <i />
            {label}
          </div>
        ))}
      </div>
      <div className="mk-photos" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <span className="mk-photo" />
        <span className="mk-photo" />
        <span className="mk-photo mk-photo--add">+</span>
      </div>
      <div className="mk-phone__cta">Get customer sign-off</div>
    </div>
  );
}
