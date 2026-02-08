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
          <div className="overflow-hidden rounded-2xl bg-foreground px-6 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto para vencer mais licitações?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Junte-se a milhares de empresas que já usam o Qore para encontrar
              oportunidades e enviar propostas com confiança.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2"
                asChild
              >
                <Link href="/login">
                  Buscar Licitações Grátis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                asChild
              >
                <a href="#pricing">Falar com Vendas</a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
