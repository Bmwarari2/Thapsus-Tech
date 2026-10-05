import { Laptop, Phone, Tablet } from "@/components/devices/Devices";
import { ScreenDiscipleship, ScreenERP, ScreenWebsite, TabletForms, TabletHelpdesk, TabletHR, TabletInventory, TabletProjects } from "./MoreScreens";
import { PhoneJobSheet, ScreenBookings, ScreenCRM, ScreenJobs, ScreenPortal, ScreenReports } from "./Screens";

const laptops = {
  crm: ScreenCRM,
  booking: ScreenBookings,
  portals: ScreenPortal,
  reports: ScreenReports,
  erp: ScreenERP,
  membership: ScreenDiscipleship,
  websites: ScreenWebsite,
} as const;

const tablets = {
  projects: TabletProjects,
  inventory: TabletInventory,
  hr: TabletHR,
  forms: TabletForms,
  helpdesk: TabletHelpdesk,
} as const;

/** The device + example screen shown for each solution. */
export function SolutionVisual({ id, name }: { id: string; name: string }) {
  const label = `Example ${name.toLowerCase()} screen with sample data`;

  if (id === "jobs") {
    return (
      <div className="relative">
        <Laptop label={label}>
          <ScreenJobs />
        </Laptop>
        <div className="absolute -bottom-[8%] right-[2%] w-[22%] min-w-[84px]">
          <Phone label="Example job sheet on a phone">
            <PhoneJobSheet />
          </Phone>
        </div>
      </div>
    );
  }
  if (id in laptops) {
    const Screen = laptops[id as keyof typeof laptops];
    return (
      <Laptop label={label}>
        <Screen />
      </Laptop>
    );
  }
  if (id in tablets) {
    const Screen = tablets[id as keyof typeof tablets];
    return (
      <div className="mx-auto w-[86%]">
        <Tablet landscape label={label}>
          <Screen />
        </Tablet>
      </div>
    );
  }
  return null;
}
