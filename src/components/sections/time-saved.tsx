import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { timeSavedContent } from "@/config/home-content";
import { staggerStyle } from "@/lib/stagger-style";

export const TimeSaved = () => (
  <SectionWrapper id="resultados" aria-labelledby="time-saved-title">
    <p className="text-label-sm uppercase text-primary">{timeSavedContent.eyebrow}</p>
    <h2 id="time-saved-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {timeSavedContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{timeSavedContent.description}</p>
    <ul className="mt-12 flex flex-col gap-3">
      {timeSavedContent.comparisons.map((comparison, index) => (
        <li
          key={comparison.task}
          data-before-after
          data-reveal
          style={staggerStyle(index)}
          className="grid items-center gap-3 rounded-lg border border-border bg-card p-5 shadow-sm md:grid-cols-[1fr_1fr_auto_1fr] md:gap-6 md:p-6"
        >
          <h3 className="text-title-md text-foreground">{comparison.task}</h3>
          <p data-before className="text-body-md text-muted-foreground line-through decoration-input">
            <span className="sr-only">Antes: </span>
            {comparison.before}
          </p>
          <ArrowRight aria-hidden="true" className="hidden size-5 text-primary md:block" />
          <p
            data-after
            className="relative isolate inline-flex w-fit items-center rounded-full px-3 py-1 text-label-md font-semibold text-primary before:absolute before:inset-0 before:-z-10 before:origin-left before:rounded-full before:bg-primary-tint-strong"
          >
            <span className="sr-only">Com a Qore: </span>
            {comparison.after}
          </p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
