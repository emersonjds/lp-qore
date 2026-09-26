"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types";

export interface PersonaView extends Pick<Persona, "id" | "toggleLabel" | "title"> {
  features: ReactNode;
  visual: ReactNode;
}

interface PersonaToggleProps {
  heading?: ReactNode;
  personas: readonly [PersonaView, PersonaView];
}

export const PersonaToggle = ({ heading, personas }: PersonaToggleProps) => {
  const [activeId, setActiveId] = useState<Persona["id"]>(personas[0].id);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => setIsEnhanced(true), []);

  return (
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        {heading}
        <div
          role="group"
          aria-label="Escolha a função"
          className={cn(
            "flex w-full shrink-0 gap-1 self-start rounded-xl bg-surface-container p-1.5 shadow-xs sm:inline-flex sm:w-auto md:self-auto",
            !isEnhanced && "hidden",
          )}
        >
          {personas.map((persona) => (
            <button
              key={persona.id}
              type="button"
              aria-pressed={persona.id === activeId}
              onClick={() => setActiveId(persona.id)}
              className={cn(
                "min-h-11 flex-1 rounded-lg px-5 py-2 text-label-md sm:flex-none",
                persona.id === activeId ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {persona.toggleLabel}
            </button>
          ))}
        </div>
      </div>
      <div className={cn("mt-10", isEnhanced ? "grid" : "flex flex-col gap-12")}>
        {personas.map((persona) => {
          const isActive = persona.id === activeId;
          return (
            <article
              key={persona.id}
              aria-labelledby={`persona-${persona.id}-title`}
              className={cn(
                "flex min-w-0 flex-col gap-8 transition-[opacity,translate,visibility] duration-300 ease-out",
                isEnhanced && "col-start-1 row-start-1",
                isEnhanced && !isActive && "invisible translate-y-2 opacity-0 max-md:hidden",
              )}
            >
              <div key={isActive ? `${persona.id}-active` : persona.id}>{persona.visual}</div>
              <div className="rounded-xl bg-surface-low p-6 md:p-8">
                <p className="text-label-sm uppercase tracking-wider text-primary">{persona.toggleLabel}</p>
                <h3 id={`persona-${persona.id}-title`} className="mt-2 mb-6 text-headline-md">
                  {persona.title}
                </h3>
                {persona.features}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
