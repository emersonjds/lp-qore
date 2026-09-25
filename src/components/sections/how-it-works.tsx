"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";

interface Step {
  number: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
}

/* ── Mini mockup: Onboarding ── */
function OnboardingMockup() {
  const etapas = [
    { label: "Identificação", done: true },
    { label: "Empresa", done: true },
    { label: "Certificado", done: false, active: true },
    { label: "Licitações", done: false },
    { label: "Concluído", done: false },
  ];
  return (
    <div
      className="w-full shrink-0 overflow-hidden rounded-xl border border-primary/20 bg-accent p-4 md:w-64"
      aria-hidden="true"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" />
        <span className="text-xs font-semibold text-foreground">
          Cadastro em 5 minutos
        </span>
      </div>
      <ul className="space-y-2">
        {etapas.map((e) => (
          <li key={e.label} className="flex items-center gap-2">
            <div
              className={`flex size-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                e.done
                  ? "border-primary bg-primary text-white"
                  : e.active
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              }`}
            >
              {e.done ? (
                <CheckCircle2 className="size-3 text-white" />
              ) : (
                <span>{etapas.indexOf(e) + 1}</span>
              )}
            </div>
            <span
              className={`font-mono text-[11px] ${
                e.done
                  ? "text-muted-foreground line-through"
                  : e.active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {e.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-lg bg-primary/10 px-2.5 py-1.5">
        <p className="font-mono text-[10px] text-primary">
          CNPJ 12.345.678/0001-99 ✓ Receita Federal
        </p>
      </div>
    </div>
  );
}

/* ── Mini mockup: Painel com compatibilidade ── */
function PainelMockup() {
  return (
    <div
      className="w-full shrink-0 overflow-hidden rounded-xl border border-warning/20 bg-warning/5 p-4 md:w-64"
      aria-hidden="true"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="size-2 rounded-full bg-warning" />
        <span className="text-xs font-semibold text-foreground">
          Editais compatíveis
        </span>
      </div>
      {[
        { edital: "045/2025 · Pref. Salvador", valor: "R$ 347.850", match: "87%" },
        { edital: "031/2025 · Gov. Bahia", valor: "R$ 128.000", match: "72%" },
        { edital: "019/2025 · DEFAR-PB", valor: "R$ 93.500", match: "65%" },
      ].map((card) => (
        <div
          key={card.edital}
          className="mb-2 rounded-lg border border-gray-100 bg-white px-3 py-2 last:mb-0"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground">
              {card.edital}
            </span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
              {card.match}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[11px] font-semibold text-foreground">
            {card.valor}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Mini mockup: Wizard 6 etapas ── */
function WizardMockup() {
  const steps = ["Ident.", "Itens", "Preço", "Cond.", "Docs", "Revisão"];
  const docs = [
    { label: "Habilitação Jurídica", status: "3/3", ok: true },
    { label: "Regularidade Fiscal", status: "2/3", ok: false },
    { label: "Qualif. Técnica", status: "1/2", ok: false },
  ];
  return (
    <div
      className="w-full shrink-0 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-4 md:w-64"
      aria-hidden="true"
    >
      {/* Stepper */}
      <div className="mb-3 flex items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-0.5">
            <div
              className={`flex size-5 items-center justify-center rounded-full text-[8px] font-bold ${
                i < 4
                  ? "bg-primary text-white"
                  : i === 4
                    ? "border-2 border-primary text-primary"
                    : "border border-border text-muted-foreground"
              }`}
            >
              {i < 4 ? "✓" : i + 1}
            </div>
            <span className="text-[8px] text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>
      {/* Barra de progresso */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-medium text-foreground">Documentos habilitadores</span>
          <span className="font-bold text-primary">8/11</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[73%] rounded-full bg-primary" />
        </div>
      </div>
      {/* Categorias */}
      <ul className="space-y-1.5">
        {docs.map((d) => (
          <li key={d.label} className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground">
              {d.label}
            </span>
            <span
              className={`font-mono text-[10px] font-semibold ${
                d.ok ? "text-primary" : "text-warning"
              }`}
            >
              {d.status} {d.ok ? "✓" : ""}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-end">
        <span className="text-[10px] font-semibold text-primary">
          Avançar para Revisão →
        </span>
      </div>
    </div>
  );
}

const steps: Step[] = [
  {
    number: "01",
    title: "Cadastro em 5 minutos",
    description:
      "Informe seu CNPJ. Buscamos os dados na Receita Federal, validamos seu certificado digital e configuramos os primeiros alertas de licitações compatíveis.",
    mockup: <OnboardingMockup />,
  },
  {
    number: "02",
    title: "Painel com compatibilidade",
    description:
      "Veja só os editais que combinam com seu catálogo. Cada oportunidade vem com % de compatibilidade, itens elegíveis e prazo final.",
    mockup: <PainelMockup />,
  },
  {
    number: "03",
    title: "Proposta guiada em 6 etapas",
    description:
      "Identificação → Itens → Precificação → Condições → Documentos → Revisão. Validamos suas certidões automaticamente. Você só clica em Enviar.",
    mockup: <WizardMockup />,
  },
];

export function HowItWorks() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.4,
  });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <SectionWrapper
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-surface-tinted"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow mb-3 text-primary">Como funciona</p>
        <h2
          id="how-it-works-heading"
          className="text-display-xl font-display font-bold"
        >
          Do edital à proposta em três passos
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sem planilha, sem portal manual, sem prazo perdido.
        </p>
      </AnimatedSection>

      {/* Timeline vertical */}
      <div ref={timelineRef} className="relative mt-20">
        {/* Linha conectora — trilho de fundo */}
        <div
          className="absolute left-[1.9rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-border/60 md:block"
          aria-hidden="true"
        />
        {/* Linha conectora — preenchimento animado */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScaleY, opacity: lineOpacity, originY: 0 }}
          className="absolute left-[1.9rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-primary via-primary to-primary/40 md:block"
        />

        <motion.div
          className="flex flex-col gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, x: -24 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8"
            >
              {/* Número círculo */}
              <div className="relative z-10 flex shrink-0 flex-col items-center md:items-start">
                <div className="flex size-16 items-center justify-center rounded-full bg-foreground shadow-card">
                  <span className="text-sm font-bold tracking-tight text-white">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start md:gap-10">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Mini mockup inline */}
                <div aria-hidden="true" className="w-full shrink-0 md:w-64">
                  {step.mockup}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
