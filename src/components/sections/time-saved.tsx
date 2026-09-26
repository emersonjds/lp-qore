import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { timeSavedContent } from "@/config/home-content";
import { staggerStyle } from "@/lib/stagger-style";

const ROW_COLUMNS = "md:grid-cols-[1fr_1fr_auto_1fr] md:gap-6";
const COLUMN_LABEL = "text-label-sm uppercase tracking-wider";

export const TimeSaved = () => (
  <SectionWrapper id="resultados" aria-labelledby="time-saved-title">
    <p className="text-label-sm uppercase tracking-wider text-primary">{timeSavedContent.eyebrow}</p>
    <h2 id="time-saved-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {timeSavedContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{timeSavedContent.description}</p>
    <div aria-hidden="true" data-column-header className={`mt-12 hidden px-6 ${ROW_COLUMNS} md:grid ${COLUMN_LABEL} text-muted-foreground`}>
      <span />
      <span>{timeSavedContent.beforeLabel}</span>
      <span className="size-5" />
      <span className="text-primary">{timeSavedContent.afterLabel}</span>
    </div>
    <ul className="mt-12 flex flex-col gap-3 md:mt-3">
      {timeSavedContent.comparisons.map((comparison, index) => (
        <li
          key={comparison.task}
          data-before-after
          data-reveal
          style={staggerStyle(index)}
          className={`grid items-center gap-3 rounded-xl bg-card p-5 shadow-sm md:p-6 ${ROW_COLUMNS}`}
        >
          <h3 className="text-title-md text-foreground">{comparison.task}</h3>
          <div className="flex min-w-0 flex-col gap-1">
            <span data-column-label className={`${COLUMN_LABEL} text-muted-foreground md:sr-only`}>
              {timeSavedContent.beforeLabel}
            </span>
            <p data-before className="text-body-md text-muted-foreground line-through decoration-input">
              {comparison.before}
            </p>
          </div>
          <ArrowRight aria-hidden="true" className="hidden size-5 text-primary md:block" />
          <div className="flex min-w-0 flex-col items-start gap-1">
            <span data-column-label className={`${COLUMN_LABEL} text-primary md:sr-only`}>
              {timeSavedContent.afterLabel}
            </span>
            <p
              data-after
              className="relative isolate inline-flex w-fit items-center rounded-2xl px-3 py-1 text-label-md font-semibold text-primary before:absolute before:inset-0 before:-z-10 before:origin-left before:rounded-2xl before:bg-primary-tint-strong"
            >
              {comparison.after}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
