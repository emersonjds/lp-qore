import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { heroContent, platformTabs } from "@/config/home-content";
import { CONTACT_HREF, HOW_IT_WORKS_HREF } from "@/config/navigation";
import { PanelScreenshot } from "./panel-screenshot";

const managerDashboard = platformTabs.find((tab) => tab.image === "manager-dashboard");

export const Hero = () => (
  <section id="inicio" aria-labelledby="hero-title" className="pt-28 pb-16 md:pt-36 md:pb-24">
    <Container className="grid items-center gap-12 lg:grid-cols-2">
      <div className="flex flex-col items-start gap-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary-tint-strong bg-primary-tint px-3 py-1 text-label-sm text-primary">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {heroContent.eyebrow}
        </p>
        <h1 id="hero-title" className="text-headline-xl-mobile text-foreground md:text-headline-xl">
          {heroContent.titleLead}{" "}
          <br />
          <span className="text-primary">{heroContent.titleEmphasis}</span>
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground">{heroContent.subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal py-3 text-center">
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
        <p className="text-label-md text-muted-foreground">{heroContent.microcopy}</p>
      </div>
      {managerDashboard && (
        <PanelScreenshot
          title={managerDashboard.label}
          image={managerDashboard.image}
          alt={managerDashboard.alt}
          sizes="(min-width: 1024px) 36rem, 100vw"
          loading="eager"
          className="animate-hero-enter w-full lg:max-w-xl lg:justify-self-end"
        />
      )}
    </Container>
  </section>
);
