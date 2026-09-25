import { SectionWrapper } from "@/components/layout/section-wrapper";
import { personasContent } from "@/config/home-content";
import { PersonaToggle } from "./persona-toggle";

export const Personas = () => (
  <SectionWrapper id="funcoes" aria-labelledby="personas-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">{personasContent.eyebrow}</p>
    <h2 id="personas-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {personasContent.title}
    </h2>
    <PersonaToggle personas={personasContent.personas} />
  </SectionWrapper>
);
