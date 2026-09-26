import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/config/home-content";
import { CONTACT_HREF, HOW_IT_WORKS_HREF } from "@/config/navigation";
import { HeroParallax } from "./hero-parallax";
import { HeroSplitView } from "./hero-split-view";

export const Hero = () => (
  <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
    <div
      aria-hidden="true"
      className="absolute -top-24 left-1/2 -z-10 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-primary-fixed/30 blur-[120px]"
    />
    <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="flex flex-col items-start gap-4 lg:col-span-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-fixed/40 px-3 py-1.5 text-label-sm text-primary-deep">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {heroContent.eyebrow}
        </p>
        <h1 id="hero-title" className="text-headline-xl-mobile text-foreground md:text-headline-xl">
          {heroContent.titleLead}{" "}
          <br />
          <span className="text-primary">{heroContent.titleEmphasis}</span>
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground">{heroContent.subtitle}</p>
        <div className="flex w-full flex-col gap-2 pt-2 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal py-3 text-center shadow-md">
            <a href={CONTACT_HREF} data-cta="hero-primary">
              {heroContent.primaryAction}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={HOW_IT_WORKS_HREF} data-cta="hero-secondary">
              {heroContent.secondaryAction}
            </a>
          </Button>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-caption text-muted-foreground">
          {heroContent.trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden="true" className="size-[18px] text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative isolate w-full lg:col-span-6">
        <div
          aria-hidden="true"
          data-hero-glow
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary-light/40 opacity-75 blur-3xl md:-inset-10"
        />
        <HeroParallax>
          <HeroSplitView />
        </HeroParallax>
      </div>
    </Container>
  </section>
);
