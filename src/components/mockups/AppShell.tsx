import type { ReactNode } from "react";

export const NAV_ITEMS = ["Today", "Customers", "Bookings", "Jobs", "Portal", "Reports", "Team"] as const;
export type NavItem = (typeof NAV_ITEMS)[number];

type Props<T extends string> = {
  active: T;
  children: ReactNode;
  /** Sidebar items; defaults to the general business app menu. */
  items?: readonly T[];
  brand?: string;
};

/** Shared sidebar + content frame for laptop app screens. */
export function AppShell<T extends string = NavItem>({ active, children, items, brand = "Your business" }: Props<T>) {
  const menu = (items ?? NAV_ITEMS) as readonly string[];
  return (
    <div className="mk-app">
      <aside className="mk-side">
        <div className="mk-brand">
          <i />
          {brand}
        </div>
        {menu.map((item) => (
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
