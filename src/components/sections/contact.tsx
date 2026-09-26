import { Check } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { contactContent } from "@/config/home-content";
import { ContactForm } from "./contact-form";

export const Contact = () => (
  <SectionWrapper id="contato" aria-labelledby="contact-title" className="bg-surface-low">
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase tracking-wider text-primary">{contactContent.eyebrow}</p>
        <h2 id="contact-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {contactContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{contactContent.description}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {contactContent.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-body-md text-foreground">
              <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-md md:p-8">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
