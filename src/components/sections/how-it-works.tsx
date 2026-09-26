import { SectionWrapper } from "@/components/layout/section-wrapper";
import { howItWorksContent } from "@/config/home-content";
import { cn } from "@/lib/utils";
import { HowItWorksLineAnimator } from "./how-it-works-line-animator";

export const HowItWorks = () => (
  <SectionWrapper id="como-funciona" aria-labelledby="how-it-works-title" className="relative">
    <HowItWorksLineAnimator sectionId="como-funciona" />
    <div className="max-w-2xl">
      <p className="text-label-sm uppercase tracking-wider text-primary">{howItWorksContent.eyebrow}</p>
      <h2 id="how-it-works-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        {howItWorksContent.title}
      </h2>
      <p className="mt-2 text-body-lg text-muted-foreground">{howItWorksContent.description}</p>
    </div>
    <div className="relative mt-16">
      <div
        aria-hidden="true"
        data-step-line
        className="absolute top-7 right-12 left-12 hidden h-0.5 origin-left bg-surface-container-high md:block"
      />
      <ol className="relative grid gap-8 md:grid-cols-3">
        {howItWorksContent.steps.map((step, index) => (
          <li
            key={step.number}
            className="flex flex-col rounded-lg bg-card p-6 shadow-sm md:rounded-none md:bg-transparent md:p-0 md:shadow-none"
          >
            <span
              aria-hidden="true"
              data-step-badge
              className={cn(
                "mb-6 flex size-14 items-center justify-center rounded-full font-display text-headline-sm font-bold tabular-nums",
                index === 0 ? "bg-primary text-primary-foreground shadow-md" : "bg-surface-container-high text-primary shadow-sm",
              )}
            >
              {step.number}
            </span>
            <h3 className="mb-3 text-title-md text-foreground">
              <span className="sr-only">Passo {step.number}: </span>
              {step.title}
            </h3>
            <p className="text-body-md text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </SectionWrapper>
);
