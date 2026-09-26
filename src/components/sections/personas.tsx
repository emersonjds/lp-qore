import { AlarmClock } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CountUp } from "@/components/motion/count-up";
import { personasContent } from "@/config/home-content";
import { cn } from "@/lib/utils";
import type { Persona, RoleKpi } from "@/types";
import { PersonaToggle, type PersonaView } from "./persona-toggle";

const footnoteTone: Record<RoleKpi["tone"], string> = {
  neutral: "text-muted-foreground",
  positive: "text-primary",
  urgent: "text-destructive-text",
};

const KpiCards = ({ kpis }: { kpis: Persona["kpis"] }) => (
  <div>
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <li key={kpi.label} data-role-kpi className="flex flex-col justify-between rounded-xl bg-card p-6 shadow-sm">
          <div>
            <span data-kpi-label className="block text-label-sm text-muted-foreground">
              {kpi.label}
            </span>
            {kpi.isCounted ? (
              <CountUp
                value={kpi.value}
                className={cn("mt-2 font-display text-headline-lg", kpi.tone === "positive" ? "text-primary" : "text-foreground")}
              />
            ) : (
              <p className="mt-2 font-display text-title-md text-foreground">{kpi.value}</p>
            )}
            <p className="mt-1 text-caption text-muted-foreground">{kpi.caption}</p>
          </div>
          <p className={cn("flex items-center gap-1 pt-4 text-caption", footnoteTone[kpi.tone])}>
            {kpi.tone === "urgent" && <AlarmClock aria-hidden="true" className="size-4 shrink-0" />}
            {kpi.footnote}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const FeatureList = ({ features }: { features: Persona["features"] }) => (
  <ul className="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
    {features.map(({ icon: Icon, title, description }) => (
      <li key={title} className="flex gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
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
  visual: <KpiCards kpis={persona.kpis} />,
});

export const Personas = () => {
  const [first, second] = personasContent.personas;

  return (
    <SectionWrapper id="funcoes" aria-labelledby="personas-title">
      <PersonaToggle
        heading={
          <div>
            <p className="text-label-sm uppercase tracking-wider text-primary">{personasContent.eyebrow}</p>
            <h2 id="personas-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
              {personasContent.title}
            </h2>
          </div>
        }
        personas={[toView(first), toView(second)]}
      />
    </SectionWrapper>
  );
};
