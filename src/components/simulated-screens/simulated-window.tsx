import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SimulatedWindowProps {
  title: string;
  label: string;
  badge?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const SimulatedWindow = ({ title, label, badge, className, children }: SimulatedWindowProps) => (
  <figure aria-label={label} className={cn("@container relative overflow-hidden rounded-lg bg-card shadow-lg", className)}>
    <div className="flex items-center justify-between gap-3 bg-surface-low px-4 py-3">
      <span aria-hidden="true" className="flex shrink-0 gap-2">
        <span className="size-3 rounded-full bg-rose-400" />
        <span className="size-3 rounded-full bg-amber-400" />
        <span className="size-3 rounded-full bg-emerald-400" />
      </span>
      <span className="min-w-0 flex-1 truncate text-center text-caption text-muted-foreground">{title}</span>
      {badge}
    </div>
    {children}
  </figure>
);
