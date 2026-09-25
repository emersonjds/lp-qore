"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types";

export interface PersonaView extends Pick<Persona, "id" | "toggleLabel" | "title"> {
  features: ReactNode;
  visual: ReactNode;
}

interface PersonaToggleProps {
  personas: readonly [PersonaView, PersonaView];
}

export const PersonaToggle = ({ personas }: PersonaToggleProps) => {
  const [activeId, setActiveId] = useState<Persona["id"]>(personas[0].id);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => setIsEnhanced(true), []);

  return (
    <div className="mt-8">
      <div
        role="group"
        aria-label="Escolha a função"
        className={cn("flex w-full gap-1 rounded-lg border border-border bg-card p-1 sm:inline-flex sm:w-auto", !isEnhanced && "hidden")}
      >
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={persona.id === activeId}
            onClick={() => setActiveId(persona.id)}
            className={cn(
              "min-h-11 flex-1 rounded-md px-3 py-2 text-label-md sm:flex-none sm:px-4",
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
              "grid items-start gap-10 rounded-xl border border-border bg-card p-6 shadow-sm md:p-10 lg:grid-cols-2 lg:gap-16",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && persona.id !== activeId && "invisible",
            )}
          >
            <div>
              <p className="text-label-sm uppercase text-primary">{persona.toggleLabel}</p>
              <h3 id={`persona-${persona.id}-title`} className="mt-2 text-headline-md">
                {persona.title}
              </h3>
              {persona.features}
            </div>
            {persona.visual}
          </article>
        ))}
      </div>
    </div>
  );
};
