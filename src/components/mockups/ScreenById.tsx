import { ScreenBookings, ScreenCRM, ScreenJobs, ScreenPortal, ScreenReports, ScreenToday } from "./Screens";

const screens = {
  today: ScreenToday,
  crm: ScreenCRM,
  bookings: ScreenBookings,
  jobs: ScreenJobs,
  portal: ScreenPortal,
  reports: ScreenReports,
} as const;

export type ScreenId = keyof typeof screens;

export function ScreenById({ id }: { id: ScreenId }) {
  const Screen = screens[id];
  return <Screen />;
}
