import { SectionWrapper } from "@/components/layout/section-wrapper";
import { cnpjRadarContent } from "@/config/cnpj-radar";
import { CnpjRadarForm } from "./cnpj-radar-form";

export const CnpjRadar = () => (
  <SectionWrapper id="radar" aria-labelledby="radar-title">
    <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-2xl bg-surface-low p-6 sm:p-10">
      <div>
        <p className="text-label-sm uppercase tracking-wider text-primary">{cnpjRadarContent.eyebrow}</p>
        <h2 id="radar-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {cnpjRadarContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{cnpjRadarContent.description}</p>
      </div>
      <CnpjRadarForm />
    </div>
  </SectionWrapper>
);
