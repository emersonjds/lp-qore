import { BrainCircuit, Eye, Sparkles, TriangleAlert } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { SimulatedWindow } from "@/components/simulated-screens/simulated-window";
import { editalSplitView } from "@/config/simulated-screens";
import { HeroSplitViewAnimator } from "./hero-split-view-animator";

const { document, summary } = editalSplitView;

const pageChipClass = "shrink-0 rounded-sm bg-surface-container px-1.5 py-0.5 text-caption text-muted-foreground";

export const HeroSplitView = () => (
  <div data-split-view className="animate-hero-enter relative">
    <SimulatedWindow
      title={editalSplitView.windowTitle}
      label={editalSplitView.label}
      badge={
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-fixed px-2.5 py-0.5 text-label-sm text-primary-deep">
          <Sparkles aria-hidden="true" className="size-3.5" />
          <span>
            Compatibilidade <CountUp value={editalSplitView.compatibility} />
          </span>
        </span>
      }
    >
      <HeroSplitViewAnimator />
      <div className="grid grid-cols-1 md:min-h-[380px] md:grid-cols-12">
        <div className="flex flex-col justify-between gap-3 bg-card p-4 md:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-label-sm text-muted-foreground">{document.title}</span>
            <span className={pageChipClass}>{document.pageIndicator}</span>
          </div>
          <div className="flex flex-col gap-2 text-caption leading-relaxed">
            <p aria-hidden="true" className="text-muted-foreground/60">
              {document.before}
            </p>
            <p
              data-source-clause
              className="rounded-sm bg-primary-fixed/40 p-2.5 text-[13px] leading-snug font-medium text-foreground"
            >
              <span className="font-bold text-primary-deep">{document.clauseNumber}</span> {document.clause}
            </p>
            {document.after.map((line) => (
              <p key={line} aria-hidden="true" className="text-muted-foreground/60">
                {line}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye aria-hidden="true" className="size-4" />
              {document.readerLabel}
            </span>
            <span className="text-primary">{document.verifiedLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-surface-low/60 p-4 sm:p-5 md:col-span-7">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 font-display text-title-md text-foreground">
              <BrainCircuit aria-hidden="true" className="size-5 text-primary" />
              {summary.title}
            </p>
            <span className="shrink-0 text-caption text-muted-foreground">{summary.count}</span>
          </div>
          <ul className="flex flex-col gap-3">
            {summary.items.map((item, index) => (
              <li key={item.label} data-summary-card={index} className="rounded-md bg-card p-3 shadow-sm">
                <p className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-label-sm uppercase text-primary">{item.label}</span>
                  <span data-page-chip className={pageChipClass}>
                    {item.page}
                  </span>
                </p>
                <p className="text-caption text-foreground">{item.text}</p>
              </li>
            ))}
            <li data-risk-alert className="rounded-md bg-destructive-tint p-3 shadow-sm">
              <p className="mb-1 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-label-sm text-destructive-text">
                  <TriangleAlert aria-hidden="true" className="size-3.5" />
                  {summary.alert.label}
                </span>
                <span data-page-chip className="shrink-0 rounded-sm bg-rose-100 px-1.5 py-0.5 text-caption text-destructive-text">
                  {summary.alert.page}
                </span>
              </p>
              <p className="text-caption text-foreground">{summary.alert.text}</p>
            </li>
          </ul>
        </div>
      </div>
    </SimulatedWindow>
  </div>
);
