import { SectionWrapper } from "@/components/layout/section-wrapper";
import { coverageContent } from "@/config/home-content";
import { CONTACT_HREF } from "@/config/navigation";
import { BrazilMap } from "./brazil-map";

export const Coverage = () => (
  <SectionWrapper id="cobertura" aria-labelledby="coverage-title">
    <div className="grid items-center gap-10 rounded-lg bg-card p-6 shadow-md md:p-12 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase text-primary">{coverageContent.eyebrow}</p>
        <h2 id="coverage-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {coverageContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{coverageContent.description}</p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {coverageContent.regions.map((region) => (
            <li key={region.name} className="rounded-md bg-surface-low p-3">
              <span className="block text-label-md font-semibold text-primary">{region.name}</span>
              <span className="text-caption text-muted-foreground">{region.cities}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-body-md text-foreground">
          Atua em outro estado?{" "}
          <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
            Deixe seu contato
          </a>
        </p>
      </div>
      <BrazilMap />
    </div>
  </SectionWrapper>
);
