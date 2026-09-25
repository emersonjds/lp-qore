import { FileText, Sparkles, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { heroSummaryItems } from "@/config/home-content";
import { cn } from "@/lib/utils";

export const HeroSummaryCard = () => (
  <figure
    aria-labelledby="hero-summary-title"
    className="animate-hero-enter rounded-lg border border-border bg-card p-5 shadow-lg md:p-6"
  >
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2">
        <Sparkles aria-hidden="true" className="size-5 text-primary" />
        <figcaption id="hero-summary-title" className="font-display text-title-md text-foreground">
          Resumo Inteligente Qore
        </figcaption>
      </div>
      <Badge variant="outline">Tela ilustrativa</Badge>
    </div>
    <p className="mt-3 flex items-center gap-2 text-caption text-muted-foreground">
      <FileText aria-hidden="true" className="size-4" />
      Edital de pregão eletrônico, exemplo
    </p>
    <ul className="mt-4 flex flex-col gap-3">
      {heroSummaryItems.map((item) => (
        <li
          key={item.title}
          className={cn(
            "rounded-md p-3",
            item.isRisk ? "border border-rose-200 bg-rose-50" : "border-l-4 border-primary bg-primary-tint",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-label-sm uppercase text-foreground">
              {item.isRisk && <TriangleAlert aria-hidden="true" className="size-4 text-destructive-text" />}
              {item.title}
            </span>
            <span className="rounded-sm bg-card px-1.5 py-0.5 text-caption text-muted-foreground tabular-nums">
              {item.citation}
            </span>
          </div>
          <p className="mt-1 text-label-md text-foreground">{item.summary}</p>
        </li>
      ))}
    </ul>
  </figure>
);
