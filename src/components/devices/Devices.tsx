import type { ReactNode } from "react";

type DeviceProps = {
  children: ReactNode;
  /** Describes what's on screen for screen-reader users. */
  label: string;
  className?: string;
};

export function Laptop({ children, label, className = "" }: DeviceProps) {
  return (
    <figure className={`dv-laptop ${className}`} role="img" aria-label={label}>
      <div className="dv-laptop__lid">
        <div className="dv-laptop__screen" aria-hidden="true">
          {children}
        </div>
      </div>
      <div className="dv-laptop__base" aria-hidden="true" />
      <div className="dv-laptop__shadow" aria-hidden="true" />
    </figure>
  );
}

export function Phone({ children, label, className = "" }: DeviceProps) {
  return (
    <figure className={`dv-phone ${className}`} role="img" aria-label={label}>
      <div className="dv-phone__screen" aria-hidden="true">
        {children}
      </div>
    </figure>
  );
}

export function Tablet({
  children,
  label,
  className = "",
  landscape = false,
}: DeviceProps & { landscape?: boolean }) {
  return (
    <figure className={`dv-tablet ${landscape ? "dv-tablet--landscape" : ""} ${className}`} role="img" aria-label={label}>
      <div className="dv-tablet__screen" aria-hidden="true">
        {children}
      </div>
    </figure>
  );
}
