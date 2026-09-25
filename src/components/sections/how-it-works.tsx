import { SectionWrapper } from "@/components/layout/section-wrapper";
import { howItWorksContent } from "@/config/home-content";

export const HowItWorks = () => (
  <SectionWrapper id="como-funciona" aria-labelledby="how-it-works-title" className="relative">
    <p className="text-label-sm uppercase text-primary">{howItWorksContent.eyebrow}</p>
    <h2 id="how-it-works-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
      {howItWorksContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{howItWorksContent.description}</p>
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        data-step-line="horizontal"
        className="absolute top-6 left-6 hidden h-0.5 w-[calc(100%-3rem)] origin-left bg-primary md:block"
      />
      <div
        aria-hidden="true"
        data-step-line="vertical"
        className="absolute top-6 left-6 h-[calc(100%-3rem)] w-0.5 origin-top bg-primary md:hidden"
      />
      <ol className="relative grid gap-8 md:grid-cols-3">
        {howItWorksContent.steps.map((step) => (
          <li key={step.number} className="relative flex flex-col gap-3 pl-16 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute left-0 flex size-12 items-center justify-center rounded-full bg-primary font-display text-title-md text-primary-foreground tabular-nums md:static"
            >
              {step.number}
            </span>
            <h3 className="text-headline-sm">
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
