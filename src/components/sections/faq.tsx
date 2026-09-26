import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { faqItems } from "@/config/faq";
import { CONTACT_HREF } from "@/config/navigation";

export const Faq = () => (
  <SectionWrapper id="faq" aria-labelledby="faq-title">
    <div className="grid gap-10 lg:grid-cols-3">
      <div>
        <p className="text-label-sm uppercase tracking-wider text-primary">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          Perguntas frequentes
        </h2>
        <p className="mt-3 text-body-md text-muted-foreground">
          Não achou sua dúvida?{" "}
          <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
            Fale com a gente
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:col-span-2">
        {faqItems.map((item) => (
          <details key={item.question} data-faq className="rounded-lg border border-border bg-card">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-display text-title-md text-foreground">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                data-faq-icon
                className="size-5 shrink-0 text-muted-foreground transition-transform duration-200"
              />
            </summary>
            <p data-faq-answer className="px-5 pb-5 text-body-md text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
