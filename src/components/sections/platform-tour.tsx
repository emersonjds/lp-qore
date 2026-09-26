import { SectionWrapper } from "@/components/layout/section-wrapper";
import { platformContent, platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "./platform-tour-tabs";

export const PlatformTour = () => (
  <SectionWrapper id="plataforma" aria-labelledby="platform-title" className="bg-surface-low">
    <div className="mb-10 max-w-3xl">
      <p className="text-label-sm uppercase tracking-wider text-primary">{platformContent.eyebrow}</p>
      <h2 id="platform-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        {platformContent.title}
      </h2>
      <p className="mt-2 text-body-lg text-muted-foreground">
        {platformContent.description}
      </p>
    </div>
    <PlatformTourTabs tabs={platformTabs} />
  </SectionWrapper>
);
