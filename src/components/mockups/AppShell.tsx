import type { ReactNode } from "react";

export const NAV_ITEMS = ["Today", "Customers", "Bookings", "Jobs", "Portal", "Reports", "Team"] as const;
export type NavItem = (typeof NAV_ITEMS)[number];

/** Shared sidebar + content frame for laptop app screens. */
export function AppShell({ active, children }: { active: NavItem; children: ReactNode }) {
  return (
    <div className="mk-app">
      <aside className="mk-side">
        <div className="mk-brand">
          <i />
          Your business
        </div>
        {NAV_ITEMS.map((item) => (
          <div key={item} className={`mk-nav ${item === active ? "is-on" : ""}`}>
            {item}
          </div>
        ))}
        <div className="mk-side__foot">
          <span className="mk-avatar mk-avatar--d">JS</span>
          Settings
        </div>
      </aside>
      <div className="mk-main">{children}</div>
    </div>
  );
}
