import { SectionWrapper } from "@/components/layout/section-wrapper";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "./platform-tour-tabs";

export const PlatformTour = () => (
  <SectionWrapper id="plataforma" aria-labelledby="platform-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">Conheça a plataforma</p>
    <h2 id="platform-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
      Do radar à proposta, no mesmo lugar
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
      Telas do painel com dados de demonstração.
    </p>
    <PlatformTourTabs tabs={platformTabs} />
  </SectionWrapper>
);
