/** Simple, original line icons drawn on a 24px grid. */
const paths = {
  crm: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 14.2c1.7.6 2.8 2.2 3.1 4.8" />
    </>
  ),
  booking: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8.5 14.5l2 2 4-4" />
    </>
  ),
  jobs: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2.5" />
      <path d="M9 4.5V3.5h6v1" />
      <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  portals: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <path d="M3 9h18" />
      <circle cx="6" cy="6.8" r=".4" fill="currentColor" />
      <circle cx="12" cy="13.2" r="1.8" />
      <path d="M8.8 17.5c.6-1.4 1.8-2.2 3.2-2.2s2.6.8 3.2 2.2" />
    </>
  ),
  projects: (
    <>
      <rect x="3.5" y="4" width="5" height="16" rx="1.6" />
      <rect x="9.5" y="4" width="5" height="11" rx="1.6" />
      <rect x="15.5" y="4" width="5" height="13.5" rx="1.6" />
    </>
  ),
  inventory: (
    <>
      <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
      <path d="M4 7.2l8 4.2 8-4.2M12 11.4V21" />
    </>
  ),
  reports: (
    <>
      <path d="M4 20h16" />
      <rect x="5.5" y="12" width="3" height="6" rx="1" />
      <rect x="10.5" y="8" width="3" height="10" rx="1" />
      <rect x="15.5" y="4.5" width="3" height="13.5" rx="1" />
    </>
  ),
  hr: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="3" />
      <circle cx="12" cy="10" r="2.6" />
      <path d="M8 17c.7-1.9 2.2-3 4-3s3.3 1.1 4 3" />
    </>
  ),
  forms: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
      <path d="M8 8.5l1.3 1.3L11.5 7.5M8 14.5l1.3 1.3 2.2-2.3M13.5 9h3M13.5 15h3" />
    </>
  ),
  helpdesk: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M6 6l3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" />
    </>
  ),
  membership: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 15.5c.5-1.2 1.6-1.9 3-1.9s2.5.7 3 1.9M14 10h4M14 13.5h3" />
    </>
  ),
  erp: (
    <>
      <path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z" />
      <path d="M3.5 12L12 16.5 20.5 12" />
      <path d="M3.5 16L12 20.5 20.5 16" />
    </>
  ),
  websites: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.2c0 4.4-3 8.2-7 9.8-4-1.6-7-5.4-7-9.8V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  backup: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5v4h4" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  unlock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" />
      <path d="M12 14.5v2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3.5 18c.5-2.4 2.3-3.8 4.5-3.8s4 1.4 4.5 3.8M11.5 18c.5-2.4 2.3-3.8 4.5-3.8s4 1.4 4.5 3.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  chat: <path d="M4.5 6.5a2.5 2.5 0 0 1 2.5-2.5h10a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4.5 13.5z" />,
  sparkle: <path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8zM18.5 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
