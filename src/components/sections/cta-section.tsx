"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/layout/animated-section";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Pronto para vencer mais licitações?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Junte-se a milhares de empresas que já usam o Qore para encontrar
              oportunidades e enviar propostas com confiança.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                asChild
              >
                <Link href="/login">
                  Começar Agora
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Falar com Vendas
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
