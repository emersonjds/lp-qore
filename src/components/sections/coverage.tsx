import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { coverageContent } from "@/config/home-content";
import { CONTACT_HREF } from "@/config/navigation";
import type { CoverageRegion } from "@/types";
import { BrazilMap } from "./brazil-map";

const RegionList = ({ regions }: { regions: readonly CoverageRegion[] }) => (
  <ul className="flex flex-col gap-2">
    {regions.map((region) => (
      <li key={region.name} data-testid="coverage-region">
        <span className="block text-label-md font-semibold text-foreground">{region.name}</span>
        {region.cities ? <span className="text-caption text-muted-foreground">{region.cities}</span> : null}
      </li>
    ))}
  </ul>
);

export const Coverage = () => (
  <SectionWrapper id="cobertura" aria-labelledby="coverage-title">
    <div className="rounded-lg bg-card p-6 shadow-md md:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="text-label-sm uppercase text-primary">{coverageContent.eyebrow}</p>
          <h2 id="coverage-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
            {coverageContent.title}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{coverageContent.description}</p>
          <p className="mt-6 text-body-md text-foreground">
            Atua em outro estado?{" "}
            <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
              Deixe seu contato
            </a>
          </p>
        </div>
        <div className="min-w-0">
          <BrazilMap />
        </div>
      </div>
      <div data-testid="coverage-clusters-desktop" className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {coverageContent.clusters.map((cluster) => (
          <section key={cluster.name} className="rounded-md bg-surface-low p-4">
            <h3 className="mb-3 text-label-md font-semibold text-primary">{cluster.name}</h3>
            <RegionList regions={cluster.regions} />
          </section>
        ))}
      </div>
      <div data-testid="coverage-clusters-mobile" className="mt-8 flex flex-col gap-2 md:hidden">
        {coverageContent.clusters.map((cluster, index) => (
          <details key={cluster.name} open={index === 0} className="group rounded-md bg-surface-low px-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-label-md font-semibold text-primary [&::-webkit-details-marker]:hidden">
              {cluster.name}
              <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-4">
              <RegionList regions={cluster.regions} />
            </div>
          </details>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
