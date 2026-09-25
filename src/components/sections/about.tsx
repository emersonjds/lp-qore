import { SectionWrapper } from "@/components/layout/section-wrapper";
import { aboutContent } from "@/config/home-content";

export const About = () => (
  <SectionWrapper id="quem-somos" aria-labelledby="about-title" className="bg-surface-low">
    <div className="max-w-3xl">
      <p className="text-label-sm uppercase text-primary">{aboutContent.eyebrow}</p>
      <h2 id="about-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        {aboutContent.title}
      </h2>
      <p className="mt-4 text-body-lg text-muted-foreground">{aboutContent.mission}</p>
    </div>
  </SectionWrapper>
);
