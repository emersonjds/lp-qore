import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { audienceContent } from "@/config/home-content";
import { CONTACT_HREF } from "@/config/navigation";
import { accessibleLabels } from "@/config/accessible-labels";

export const Audience = () => (
  <SectionWrapper id="para-quem-e" aria-labelledby="audience-title">
    <p className="text-label-sm uppercase tracking-wider text-primary">{audienceContent.eyebrow}</p>
    <h2 id="audience-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {audienceContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{audienceContent.description}</p>
    <ul aria-label={accessibleLabels.audienceList} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {audienceContent.audiences.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="flex flex-col gap-3 rounded-xl bg-card p-6 shadow-sm">
          <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <h3 className="text-title-md">{title}</h3>
          <p className="text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
    <Button asChild size="lg" className="mt-10 h-auto min-h-12 w-full whitespace-normal py-3 text-center md:w-auto">
      <a href={CONTACT_HREF} data-cta="audience">
        {audienceContent.actionLabel}
      </a>
    </Button>
  </SectionWrapper>
);
