import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export const LogoMark = ({ className }: LogoMarkProps) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={cn("size-8", className)}>
    <rect width="48" height="48" rx="12" fill="#047857" />
    <circle cx="23" cy="24" r="10" fill="none" stroke="#ffffff" strokeWidth="5" />
    <path d="M28 29 L34 35" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <circle cx="33" cy="14" r="4" fill="#34d399" />
  </svg>
);

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2", className)}>
    <LogoMark />
    <span className="font-display text-title-md font-bold text-foreground">
      Qore<span className="text-primary">.</span>
    </span>
  </span>
);
