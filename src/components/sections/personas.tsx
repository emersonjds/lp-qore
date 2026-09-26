import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { personasContent } from "@/config/home-content";
import { mobileScreenshots } from "@/config/screenshots";
import type { Persona } from "@/types";
import { PanelScreenshot } from "./panel-screenshot";
import { PersonaToggle, type PersonaView } from "./persona-toggle";

const visuals: Record<Persona["id"], ReactNode> = {
  analyst: <PanelScreenshot device="mobile" sizes="18rem" {...mobileScreenshots.radar} />,
  manager: <PanelScreenshot device="mobile" sizes="18rem" {...mobileScreenshots.managerDashboard} />,
};

const FeatureList = ({ features }: { features: Persona["features"] }) => (
  <ul className="mt-8 flex flex-col gap-5">
    {features.map(({ icon: Icon, title, description }) => (
      <li key={title} className="flex gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h4 className="text-title-md text-foreground">{title}</h4>
          <p className="mt-1 text-body-md text-muted-foreground">{description}</p>
        </div>
      </li>
    ))}
  </ul>
);

const toView = (persona: Persona): PersonaView => ({
  id: persona.id,
  toggleLabel: persona.toggleLabel,
  title: persona.title,
  features: <FeatureList features={persona.features} />,
  visual: visuals[persona.id],
});

export const Personas = () => {
  const [first, second] = personasContent.personas;

  return (
    <SectionWrapper id="funcoes" aria-labelledby="personas-title" className="bg-surface-low">
      <p className="text-label-sm uppercase text-primary">{personasContent.eyebrow}</p>
      <h2 id="personas-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
        {personasContent.title}
      </h2>
      <PersonaToggle personas={[toView(first), toView(second)]} />
    </SectionWrapper>
  );
};
