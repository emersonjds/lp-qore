import { SectionWrapper } from "@/components/layout/section-wrapper";
import { testimonials, testimonialsContent } from "@/config/testimonials";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  items?: readonly Testimonial[];
}

export const Testimonials = ({ items = testimonials }: TestimonialsProps) => {
  if (items.length === 0) return null;

  return (
    <SectionWrapper id="clientes" aria-labelledby="testimonials-title">
      <p className="text-label-sm uppercase tracking-wider text-primary">{testimonialsContent.eyebrow}</p>
      <h2 id="testimonials-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
        {testimonialsContent.title}
      </h2>
      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={`${item.company}-${item.name}`}>
            <figure className="flex h-full flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm">
              <blockquote className="flex-1 text-body-lg text-foreground">{item.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                {item.logoSrc && (
                  <img src={item.logoSrc} alt={item.company} width={40} height={40} loading="lazy" className="size-10 rounded-md object-contain" />
                )}
                <span className="flex flex-col">
                  <span className="text-label-md font-semibold text-foreground">{item.name}</span>
                  <span className="text-caption text-muted-foreground">
                    {item.role}, {item.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};
