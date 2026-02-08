"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { faqItems } from "@/config/faq";

export function FAQ() {
  return (
    <SectionWrapper
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-muted/30"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">FAQ</Badge>
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Perguntas frequentes
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tudo que você precisa saber sobre o Qore. Não encontrou sua resposta?
          Entre em contato com nossa equipe.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto mt-12 max-w-3xl" delay={0.15}>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </SectionWrapper>
  );
}
