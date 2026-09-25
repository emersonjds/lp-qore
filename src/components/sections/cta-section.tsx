"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/layout/animated-section";
import { siteConfig } from "@/config/site";

/* Mini mockup CTA — painel com cards de oportunidade + % compatível */
function CtaMockup() {
  const cards = [
    {
      edital: "045/2025",
      org: "Pref. Salvador",
      modalidade: "Pregão Eletrônico",
      valor: "R$ 347.850",
      prazo: "29 nov",
      match: "87%",
      matchColor: "text-primary/90",
    },
    {
      edital: "031/2025",
      org: "DEFAR Paraíba",
      modalidade: "Pregão Eletrônico",
      valor: "R$ 128.000",
      prazo: "15 dez",
      match: "72%",
      matchColor: "text-primary/90",
    },
    {
      edital: "019/2025",
      org: "Assemb. Leg. BA",
      modalidade: "Concorrência",
      valor: "R$ 93.500",
      prazo: "08 jan",
      match: "65%",
      matchColor: "text-amber-400",
    },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm"
      aria-hidden="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-sm font-semibold text-white/70">Painel</span>
        <span className="rounded-full bg-primary/80 px-2 py-0.5 text-[9px] font-bold text-white">
          12 em perfil
        </span>
      </div>

      {/* Cards */}
      <div className="divide-y divide-white/8">
        {cards.map((card) => (
          <div
            key={card.edital}
            className="px-4 py-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                    Aberta
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {card.modalidade}
                  </span>
                </div>
                <p className="text-xs font-semibold text-white/80">
                  {card.edital} · {card.org}
                </p>
              </div>
              <span className={`shrink-0 text-xs font-black ${card.matchColor}`}>
                {card.match}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-[11px] font-bold text-white/60">{card.valor}</span>
              <span className="text-[10px] text-white/35">Prazo: {card.prazo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-white/10 bg-primary/15 px-4 py-2.5">
        <CheckCircle2 className="size-3.5 text-primary" />
        <span className="text-xs font-medium text-primary/90">
          3 editais com alta compatibilidade hoje
        </span>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section className="bg-mesh-cta relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.04]"
      />
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Text — 60% */}
          <AnimatedSection className="flex-[3] text-center lg:text-left">
            <p className="text-eyebrow mb-4 text-primary">
              Pronto para começar?
            </p>
            <h2 className="text-display-xl font-display font-bold text-white">
              Seu próximo contrato público está no PNCP agora.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Cadastre seu CNPJ, receba os dados da Receita Federal e veja as primeiras licitações compatíveis em menos de 5 minutos.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Button
                size="lg"
                className="gap-2 glow-primary px-8"
                asChild
              >
                <a href={`${siteConfig.appUrl}/signup`}>
                  Começar gratuitamente
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#contact">Falar com vendas</a>
              </Button>
            </div>

            <p className="mt-4 text-sm text-white/35">
              Sem cartão de crédito. Cancele quando quiser.
            </p>

            {/* Trust items */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
              {[
                "LGPD Compliance",
                "SOC 2 Type II",
                "Dados no Brasil",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5"
                >
                  <CheckCircle2
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Mockup — 40% */}
          <motion.div
            className="w-full flex-[2] lg:max-w-sm"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CtaMockup />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
