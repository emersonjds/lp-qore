import type { ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { analystMatchExample, managerMetricsExample, personasContent } from "@/config/home-content";
import type { Persona } from "@/types";
import { PersonaToggle, type PersonaView } from "./persona-toggle";

const AnalystMatchPanel = () => (
  <figure
    aria-label="Exemplo ilustrativo de aderência de um edital ao CNPJ"
    className="rounded-lg border border-border bg-surface-low p-6 lg:sticky lg:top-24"
  >
    <div className="flex items-center justify-between gap-4">
      <p className="text-label-md text-muted-foreground">Match por CNPJ</p>
      <Badge variant="outline">Exemplo ilustrativo</Badge>
    </div>
    <div className="mt-4 rounded-md bg-card p-5 shadow-sm">
      <p className="font-display text-title-md text-foreground">{analystMatchExample.tender}</p>
      <p className="mt-1 text-caption text-muted-foreground">{analystMatchExample.agency}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-label-md text-muted-foreground">Aderência ao seu CNPJ</span>
        <span
          data-match-score={analystMatchExample.score}
          className="font-display text-headline-lg text-primary tabular-nums"
        >
          {analystMatchExample.score}%
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
        {analystMatchExample.criteria.map((criterion) => (
          <li key={criterion} className="flex items-center gap-2 text-body-md text-foreground">
            <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-primary" />
            {criterion}
          </li>
        ))}
      </ul>
    </div>
  </figure>
);

const ManagerMetricsPanel = () => (
  <figure
    aria-label="Exemplo ilustrativo do painel do gestor"
    className="rounded-lg border border-border bg-surface-low p-6 lg:sticky lg:top-24"
  >
    <div className="flex items-center justify-between gap-4">
      <p className="text-label-md text-muted-foreground">Painel do gestor</p>
      <Badge variant="outline">Exemplo ilustrativo</Badge>
    </div>
    <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {managerMetricsExample.map((metric) => (
        <div key={metric.label} className="rounded-md bg-card p-4 shadow-sm">
          <dt className="text-label-md text-muted-foreground">{metric.label}</dt>
          <dd className="mt-1 font-display text-headline-sm text-foreground tabular-nums">{metric.value}</dd>
          <dd className="text-caption text-muted-foreground">{metric.detail}</dd>
        </div>
      ))}
    </dl>
  </figure>
);

const defaultVisuals: Record<Persona["id"], ReactNode> = {
  analyst: <AnalystMatchPanel />,
  manager: <ManagerMetricsPanel />,
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

interface PersonasProps {
  visuals?: Record<Persona["id"], ReactNode>;
}

const toView = (persona: Persona, visuals: Record<Persona["id"], ReactNode>): PersonaView => ({
  id: persona.id,
  toggleLabel: persona.toggleLabel,
  title: persona.title,
  features: <FeatureList features={persona.features} />,
  visual: visuals[persona.id],
});

export const Personas = ({ visuals = defaultVisuals }: PersonasProps) => {
  const [first, second] = personasContent.personas;

  return (
    <SectionWrapper id="funcoes" aria-labelledby="personas-title" className="bg-surface-low">
      <p className="text-label-sm uppercase text-primary">{personasContent.eyebrow}</p>
      <h2 id="personas-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
        {personasContent.title}
      </h2>
      <PersonaToggle personas={[toView(first, visuals), toView(second, visuals)]} />
    </SectionWrapper>
  );
};
