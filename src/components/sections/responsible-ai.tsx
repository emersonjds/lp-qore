import { SectionWrapper } from "@/components/layout/section-wrapper";
import { responsibleAiContent } from "@/config/home-content";
import { AuditCard } from "./audit-card";
import { accessibleLabels } from "@/config/accessible-labels";

export const ResponsibleAi = () => (
  <SectionWrapper id="ia-responsavel" aria-labelledby="responsible-ai-title" className="bg-surface-low">
    <div className="mb-12 grid items-center gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="text-label-sm uppercase tracking-wider text-primary">{responsibleAiContent.eyebrow}</p>
        <h2 id="responsible-ai-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {responsibleAiContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{responsibleAiContent.description}</p>
      </div>
      <div className="min-w-0 lg:col-span-5">
        <AuditCard />
      </div>
    </div>
    <ul aria-label={accessibleLabels.responsibleAiList} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {responsibleAiContent.commitments.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-xl bg-card p-6 shadow-sm">
          <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <h3 className="mb-2 text-title-md">{title}</h3>
          <p className="text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
