import { FileText, Sparkles } from "lucide-react";
import { aiReadingExample } from "@/config/home-content";
import { AiReadingAnimator } from "./ai-reading-animator";

export const AiReadingExample = () => (
  <figure data-ai-reading aria-label={aiReadingExample.label} className="relative">
    <AiReadingAnimator />
    <div className="rounded-lg border border-border bg-card p-5 shadow-md md:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <p className="flex items-center gap-2 text-label-md font-semibold text-foreground">
          <FileText aria-hidden="true" className="size-4 text-muted-foreground" />
          {aiReadingExample.documentTitle}
        </p>
        <span className="shrink-0 rounded-full bg-surface-low px-2 py-0.5 text-caption text-muted-foreground">
          Exemplo ilustrativo
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {aiReadingExample.excerpts.map((excerpt) => (
          <li key={excerpt.page} className="relative">
            <span
              aria-hidden="true"
              data-excerpt-highlight
              className="absolute -inset-x-1.5 -inset-y-0.5 origin-left rounded-sm bg-primary-tint-strong"
            />
            <p className="relative text-body-md text-foreground">
              <strong className="font-semibold">{excerpt.label}</strong> {excerpt.text}{" "}
              <span className="whitespace-nowrap text-caption text-muted-foreground">pág. {excerpt.page}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
    <div className="relative mt-4 rounded-lg border border-primary-tint-strong bg-primary-tint p-5 shadow-lg sm:ml-auto sm:w-[88%] md:p-6">
      <p className="flex items-center gap-2 text-label-md font-semibold text-primary">
        <Sparkles aria-hidden="true" className="size-4" />
        {aiReadingExample.summaryTitle}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {aiReadingExample.excerpts.map((excerpt) => (
          <li key={excerpt.page} data-summary-item className="flex items-start justify-between gap-3 text-body-md text-foreground">
            <span className="flex gap-2">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {excerpt.summary}
            </span>
            <span
              data-summary-chip
              className="shrink-0 rounded-full bg-card px-2 py-0.5 text-caption font-semibold text-primary ring-1 ring-primary-tint-strong"
            >
              pág. {excerpt.page}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <span
      aria-hidden="true"
      data-traveler
      className="pointer-events-none absolute top-0 left-0 size-3 rounded-full bg-primary opacity-0 shadow-[0_0_0_6px_rgb(4_120_87/0.18)]"
    />
  </figure>
);
