import { SectionWrapper } from "@/components/layout/section-wrapper";
import { responsibleAiContent } from "@/config/home-content";
import { AiReadingExample } from "./ai-reading-example";

export const ResponsibleAi = () => (
  <SectionWrapper id="ia-responsavel" aria-labelledby="responsible-ai-title">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-label-sm uppercase text-primary">{responsibleAiContent.eyebrow}</p>
        <h2 id="responsible-ai-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {responsibleAiContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{responsibleAiContent.description}</p>
        <ul aria-label="Compromissos da IA" className="mt-8 grid gap-6 sm:grid-cols-2">
          {responsibleAiContent.commitments.map(({ icon: Icon, title, description }) => (
            <li key={title} data-reveal className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-title-md">{title}</h3>
                <p className="mt-1 text-body-md text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AiReadingExample />
    </div>
  </SectionWrapper>
);
