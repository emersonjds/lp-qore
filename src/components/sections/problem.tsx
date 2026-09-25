import { SectionWrapper } from "@/components/layout/section-wrapper";
import { problemContent } from "@/config/home-content";

export const Problem = () => (
  <SectionWrapper id="problema" aria-labelledby="problem-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">{problemContent.eyebrow}</p>
    <h2 id="problem-title" className="mt-2 max-w-2xl text-headline-lg-mobile md:text-headline-lg">
      {problemContent.title}
    </h2>
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {problemContent.items.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Icon aria-hidden="true" className="size-6 text-primary" />
          <h3 className="mt-4 text-headline-sm">{title}</h3>
          <p className="mt-2 text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
