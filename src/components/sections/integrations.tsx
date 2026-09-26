import { SectionWrapper } from "@/components/layout/section-wrapper";
import { integrationGroups, integrationsContent } from "@/config/integrations";

export const Integrations = () => (
  <SectionWrapper id="integracoes" aria-labelledby="integrations-title" className="bg-surface-low">
    <p className="text-label-sm uppercase tracking-wider text-primary">{integrationsContent.eyebrow}</p>
    <h2 id="integrations-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {integrationsContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{integrationsContent.description}</p>
    <div className="mt-12 grid gap-4 lg:grid-cols-2">
      {integrationGroups.map(({ icon: Icon, title, names }) => (
        <div key={title} className="rounded-xl bg-card p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-surface-container text-primary">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="text-title-md">{title}</h3>
          </div>
          <ul aria-label={title} className="mt-6 flex flex-wrap gap-2">
            {names.map((name) => (
              <li
                key={name}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-surface-low px-3 text-label-md text-foreground"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
