import { SectionWrapper } from "@/components/layout/section-wrapper";
import { features, featuresContent } from "@/config/features";

export const Features = () => (
  <SectionWrapper id="funcionalidades" aria-labelledby="features-title">
    <p className="text-label-sm uppercase tracking-wider text-primary">{featuresContent.eyebrow}</p>
    <h2 id="features-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {featuresContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{featuresContent.description}</p>
    <ul aria-label="Funcionalidades do Qore" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, description }) => (
        <li
          key={title}
          data-reveal
          className="flex flex-col gap-3 rounded-xl bg-card p-6 shadow-sm"
        >
          <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <h3 className="text-title-md">{title}</h3>
          <p className="text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
