"use client";

import { motion } from "motion/react";
import { Search, ToggleRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { features } from "@/config/features";
import { cn } from "@/lib/utils";

const mockResults = [
  {
    tag: "Pregão",
    org: "Pref. Salvador",
    title: "Aquisição de Medicamentos",
    value: "R$ 347k",
    match: "87%",
  },
  {
    tag: "Pregão",
    org: "DEFAR-PB",
    title: "Materiais Hospitalares",
    value: "R$ 128k",
    match: "72%",
  },
  {
    tag: "Concorr.",
    org: "Assemb. Leg. BA",
    title: "Equipamentos de Saúde",
    value: "R$ 93k",
    match: "65%",
  },
];

const contextualChips = ["marketing-digital", "comunicacao", "design", "redes-sociais"];

function FeatureSearchMockup() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden lg:block"
    >
      {/* Glow ambiente atrás do mockup */}
      <div className="bg-primary/8 absolute -inset-4 rounded-3xl blur-2xl" />

      <div className="border-border/70 shadow-card relative overflow-hidden rounded-xl border bg-white">
        {/* Search bar + toggle IA */}
        <div className="border-border/60 bg-muted/40 border-b px-4 py-3">
          <div className="border-border/60 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
            <Search className="text-muted-foreground size-3.5" />
            <span className="text-muted-foreground flex-1 text-xs">
              Serviços de tecnologia...
            </span>
          </div>
          {/* Toggle busca contextual */}
          <div className="mt-2 flex items-center gap-1.5">
            <ToggleRight className="size-3.5 text-primary" />
            <span className="text-[10px] font-medium text-primary">
              Buscar termos contextuais
            </span>
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-bold text-white">
              ON
            </span>
          </div>
          {/* Chips contextuais */}
          <div className="mt-2 flex flex-wrap gap-1">
            {contextualChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-primary/20 bg-primary/8 px-1.5 py-0.5 text-[9px] font-medium text-primary"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <ul className="divide-border/50 divide-y">
          {mockResults.map((r) => (
            <li
              key={r.title}
              className="flex items-center justify-between gap-3 px-4 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="bg-foreground/[0.06] text-foreground/70 rounded px-1.5 py-px font-mono text-[9px] font-semibold uppercase">
                    {r.tag}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {r.org}
                  </span>
                </div>
                <p className="text-foreground mt-0.5 truncate text-xs font-medium">
                  {r.title}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                <span className="text-foreground font-mono text-xs font-bold">
                  {r.value}
                </span>
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                  {r.match}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="bg-accent/30 border-border/60 flex items-center justify-between border-t px-4 py-2">
          <span className="text-muted-foreground text-[10px]">
            Busca contextual ativa — 30+ portais
          </span>
          <span className="text-primary text-[10px] font-semibold">
            Ver todos →
          </span>
        </div>
      </div>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <SectionWrapper id="features" aria-labelledby="features-heading">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow mb-3 text-primary">Funcionalidades</p>
        <h2
          id="features-heading"
          className="text-display-xl font-display font-bold"
        >
          Do alerta ao contrato assinado
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cada funcionalidade remove uma burocracia do seu caminho.
        </p>
      </AnimatedSection>

      <motion.div
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {features.map((feature, i) => {
          const isFirst = i === 0;
          return (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(isFirst && "sm:col-span-2 lg:col-span-2")}
            >
              <div
                className={cn(
                  "group bg-card relative h-full overflow-hidden rounded-2xl border p-6 shadow-card transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/20",
                  isFirst &&
                    "lg:grid lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:items-center lg:gap-8 lg:p-8",
                )}
              >
                {/* Bloco texto */}
                <div>
                  <div
                    className={cn(
                      "mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10",
                      "transition-colors duration-300 group-hover:bg-primary/15",
                    )}
                  >
                    <feature.icon
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className={cn(
                      "font-semibold text-foreground",
                      isFirst ? "text-xl tracking-[-0.01em] lg:text-2xl" : "text-base",
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 leading-relaxed text-muted-foreground",
                      isFirst ? "text-base" : "text-sm",
                    )}
                  >
                    {feature.description}
                  </p>

                  {isFirst && (
                    <div
                      className="mt-6 flex flex-wrap gap-1.5"
                      aria-hidden="true"
                    >
                      {["PNCP", "Compras.gov.br", "BEC/SP", "BLL", "BNCP", "+portais"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="border-primary/15 bg-primary/5 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* Mockup do card hero — desktop only */}
                {isFirst && <FeatureSearchMockup />}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
