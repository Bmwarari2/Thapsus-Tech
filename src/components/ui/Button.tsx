import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-medium tracking-[-0.01em] " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "min-h-8 px-3.5 text-[14px]",
  md: "min-h-11 px-[22px] text-[17px]",
  lg: "min-h-14 px-[30px] text-[19px]",
};

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "border-transparent bg-accent text-white hover:bg-accent-hover",
    secondary: "border-accent bg-transparent text-accent hover:bg-accent hover:text-white",
  },
  dark: {
    primary: "border-transparent bg-accent-on-dark text-black hover:bg-accent-on-dark-hover",
    secondary: "border-accent-on-dark bg-transparent text-accent-on-dark hover:bg-accent-on-dark hover:text-black",
  },
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  tone = "light",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
}) {
  return `${base} ${sizes[size]} ${variants[tone][variant]} ${className}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, tone, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} className={buttonClasses({ variant, size, tone, className })}>
      {children}
    </Link>
  );
}

type LinkMoreProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
};

/** "Learn more ›" style text link. */
export function LinkMore({ className = "", children, ...props }: LinkMoreProps) {
  return (
    <Link {...props} className={`link-more ${className}`}>
      {children}
    </Link>
  );
}
