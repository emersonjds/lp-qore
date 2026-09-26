import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CountUp } from "@/components/motion/count-up";
import { ManagerOverviewScreen, RadarScreen } from "@/components/simulated-screens/platform-screens";
import { personasContent } from "@/config/home-content";
import type { Persona } from "@/types";
import { PersonaToggle, type PersonaView } from "./persona-toggle";

const visuals: Record<Persona["id"], ReactNode> = {
  analyst: (
    <div className="relative w-full min-w-0">
      <RadarScreen label="Exemplo ilustrativo: Radar de oportunidades" />
      <div
        data-testid="match-chip"
        data-reveal
        className="absolute -right-2 -bottom-6 rounded-lg bg-card px-4 py-3 shadow-lg ring-1 ring-primary-tint-strong sm:-right-10"
      >
        <p className="flex items-center gap-2 text-caption text-muted-foreground">
          Aderência
          <span className="rounded-full bg-surface-low px-1.5 text-caption">Exemplo</span>
        </p>
        <CountUp value="87%" className="font-display text-headline-md text-primary" />
      </div>
    </div>
  ),
  manager: <ManagerOverviewScreen label="Exemplo ilustrativo: Painel do gestor" />,
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
