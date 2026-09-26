import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { faqContent, faqItems } from "@/config/faq";
import { CONTACT_HREF } from "@/config/navigation";

export const Faq = () => (
  <SectionWrapper id="faq" aria-labelledby="faq-title">
    <div className="mb-12 max-w-2xl">
      <p className="text-label-sm uppercase tracking-wider text-primary">{faqContent.eyebrow}</p>
      <h2 id="faq-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        {faqContent.title}
      </h2>
    </div>
    <div className="flex max-w-3xl flex-col gap-4">
      {faqItems.map((item) => (
        <details key={item.question} data-faq className="overflow-hidden rounded-xl bg-card shadow-xs">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left font-display text-title-md text-foreground">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              data-faq-icon
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-200"
            />
          </summary>
          <p data-faq-answer className="px-6 pt-1 pb-5 text-body-md text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
    <p className="mt-8 text-body-md text-muted-foreground">
      {faqContent.contactPrompt}{" "}
      <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
        {faqContent.contactLabel}
      </a>
    </p>
  </SectionWrapper>
);
