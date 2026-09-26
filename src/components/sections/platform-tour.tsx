import { SectionWrapper } from "@/components/layout/section-wrapper";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "./platform-tour-tabs";

export const PlatformTour = () => (
  <SectionWrapper id="plataforma" aria-labelledby="platform-title" className="bg-surface-low">
    <div className="mb-10 max-w-3xl">
      <p className="text-label-sm uppercase text-primary">Recursos e módulos</p>
      <h2 id="platform-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        Conheça a plataforma
      </h2>
      <p className="mt-2 text-body-lg text-muted-foreground">
        Uma visão completa da licitação, da triagem do edital até a preparação da proposta.
      </p>
    </div>
    <PlatformTourTabs tabs={platformTabs} />
  </SectionWrapper>
);
