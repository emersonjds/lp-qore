import { Check } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { contactContent } from "@/config/home-content";
import { ContactForm } from "./contact-form";

export const Contact = () => (
  <SectionWrapper id="contato" aria-labelledby="contact-title" className="bg-surface-low">
    <div className="grid items-start gap-12 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div>
          <p className="text-label-sm uppercase tracking-wider text-primary">{contactContent.eyebrow}</p>
          <h2 id="contact-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
            {contactContent.title}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{contactContent.description}</p>
        </div>
        <ul className="flex flex-col gap-4 pt-2">
          {contactContent.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-body-md text-foreground">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary-deep">
                <Check aria-hidden="true" className="size-4" />
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 rounded-xl bg-card p-6 shadow-md sm:p-8 lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
