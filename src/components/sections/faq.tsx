import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { faqItems } from "@/config/faq";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-surface-tinted py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow mb-3 text-primary">FAQ</p>
            <h2
              id="faq-heading"
              className="text-display-l font-display font-bold"
            >
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tudo que você precisa saber sobre o Qore.
            </p>

            {/* Card "Ainda tem dúvidas?" */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <MessageCircle
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-semibold text-foreground">
                Ainda tem dúvidas?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Nossa equipe responde em até 1 dia útil.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                asChild
              >
                <a href="mailto:suporte@qore.com.br">Falar com suporte</a>
              </Button>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/60"
                >
                  <AccordionTrigger className="text-left text-base font-semibold leading-snug">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}
