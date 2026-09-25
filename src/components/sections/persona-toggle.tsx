"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types";

interface PersonaToggleProps {
  personas: readonly [Persona, Persona];
}

export const PersonaToggle = ({ personas }: PersonaToggleProps) => {
  const [activeId, setActiveId] = useState<Persona["id"]>(personas[0].id);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => setIsEnhanced(true), []);

  return (
    <div className="mt-8">
      <div
        role="group"
        aria-label="Escolha a visão"
        className={cn("inline-flex gap-1 rounded-lg border border-border bg-card p-1", !isEnhanced && "hidden")}
      >
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={persona.id === activeId}
            onClick={() => setActiveId(persona.id)}
            className={cn(
              "min-h-11 rounded-md px-4 text-label-md",
              persona.id === activeId ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
            )}
          >
            {persona.toggleLabel}
          </button>
        ))}
      </div>
      <div className={cn("mt-6", isEnhanced ? "grid" : "flex flex-col gap-8")}>
        {personas.map((persona) => (
          <article
            key={persona.id}
            aria-labelledby={`persona-${persona.id}-title`}
            className={cn(
              "rounded-lg border border-border bg-card p-6 shadow-sm md:p-8",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && persona.id !== activeId && "invisible",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id={`persona-${persona.id}-title`} className="text-headline-sm">
                {persona.title}
              </h3>
              <Badge variant="outline">Exemplo ilustrativo</Badge>
            </div>
            <p className="mt-2 text-body-md text-muted-foreground">{persona.description}</p>
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {persona.metrics.map((metric) => (
                <div key={metric.label} className="rounded-md bg-surface-low p-4">
                  <dt className="text-label-md text-muted-foreground">{metric.label}</dt>
                  <dd className="mt-1 font-display text-headline-sm text-foreground tabular-nums">{metric.value}</dd>
                  <dd className="text-caption text-muted-foreground">{metric.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
};
