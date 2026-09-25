import { SectionWrapper } from "@/components/layout/section-wrapper";
import { responsibleAiContent } from "@/config/home-content";
import { AiReadingPoster } from "./ai-reading-poster";

export const ResponsibleAi = () => (
  <SectionWrapper id="ia-responsavel" aria-labelledby="responsible-ai-title">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase text-primary">{responsibleAiContent.eyebrow}</p>
        <h2 id="responsible-ai-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {responsibleAiContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{responsibleAiContent.description}</p>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-low">
        <AiReadingPoster className="absolute inset-0 size-full" />
      </div>
    </div>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {responsibleAiContent.commitments.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Icon aria-hidden="true" className="size-6 text-primary" />
          <h3 className="mt-4 text-title-md">{title}</h3>
          <p className="mt-2 text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
