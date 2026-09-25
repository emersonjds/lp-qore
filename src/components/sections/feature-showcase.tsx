"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  Search,
  ArrowRight,
  ToggleRight,
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";

/* ── Mockup 1: Busca contextual + Painel ── */
function SearchMockup() {
  const cards = [
    {
      edital: "045/2025 · Pref. Salvador",
      modalidade: "Pregão Eletrônico",
      valor: "R$ 347.850",
      prazo: "29 nov 2025",
      match: "87%",
    },
    {
      edital: "031/2025 · Gov. Bahia",
      modalidade: "Pregão Eletrônico",
      valor: "R$ 128.000",
      prazo: "15 dez 2025",
      match: "72%",
    },
    {
      edital: "019/2025 · DEFAR-PB",
      modalidade: "Concorrência",
      valor: "R$ 93.500",
      prazo: "08 jan 2026",
      match: "65%",
    },
  ];

  return (
    <div className="gradient-border overflow-hidden rounded-xl bg-white shadow-elevated">
      {/* Search bar + toggle */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="flex-1 text-sm text-muted-foreground">
            Serviços de tecnologia...
          </span>
        </div>
        {/* Toggle IA */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ToggleRight className="size-4 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-medium text-primary">
              Buscar termos contextuais
            </span>
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
              ON
            </span>
          </div>
        </div>
        {/* Chips contextuais */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["comunicacao", "marketing-digital", "design", "redes-sociais"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Cards de oportunidade */}
      <div className="divide-y">
        {cards.map((c) => (
          <div key={c.edital} className="px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                    Aberta
                  </span>
                  <span className="rounded bg-foreground/6 px-1.5 py-0.5 font-mono text-[9px] text-foreground/60">
                    {c.modalidade}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {c.edital}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {c.match}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="text-xs font-semibold text-foreground">{c.valor}</span>
              <div className="flex items-center gap-1">
                <Clock className="size-3 text-muted-foreground" aria-hidden="true" />
                <span className="text-[10px] text-muted-foreground">{c.prazo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mockup 2: Wizard de Proposta — etapa Documentos ── */
function ProposalMockup() {
  const stepLabels = ["Ident.", "Itens", "Preço", "Cond.", "Docs", "Revisão"];
  const categorias = [
    {
      label: "Habilitação Jurídica",
      status: "3/3",
      ok: true,
      items: [
        { name: "Contrato Social", validade: "—", ok: true },
        { name: "Cartão CNPJ", validade: "31/12/2025", ok: true },
      ],
    },
    {
      label: "Regularidade Fiscal",
      status: "2/3",
      ok: false,
      items: [
        { name: "CND Federal (PGFN)", validade: "15/08/2025", ok: true },
        { name: "CND Estadual SP", validade: null, ok: false },
      ],
    },
    {
      label: "Qualificação Técnica",
      status: "1/2",
      ok: false,
      items: [
        { name: "Atestado Técnico", validade: "—", ok: true },
      ],
    },
  ];

  return (
    <div className="gradient-border overflow-hidden rounded-xl bg-white shadow-elevated">
      {/* Stepper */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between gap-1">
          {stepLabels.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-0.5">
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold ${
                  i < 4
                    ? "bg-primary text-white"
                    : i === 4
                      ? "border-2 border-primary text-primary"
                      : "border border-border bg-white text-muted-foreground"
                }`}
              >
                {i < 4 ? "✓" : i + 1}
              </div>
              <span className="text-[9px] text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">Documentos habilitadores</span>
          <span className="font-bold text-primary">8 de 11 prontos</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[73%] rounded-full bg-primary transition-all" />
        </div>
      </div>

      {/* Categorias */}
      <div className="px-4 py-3 space-y-3">
        {categorias.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-foreground">
                {cat.label}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  cat.ok ? "text-primary" : "text-warning"
                }`}
              >
                {cat.status} {cat.ok ? "✓" : ""}
              </span>
            </div>
            <ul className="space-y-1">
              {cat.items.map((item) => (
                <li key={item.name} className="flex items-center gap-1.5">
                  {item.ok ? (
                    <ShieldCheck className="size-3 shrink-0 text-primary" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="size-3 shrink-0 text-warning" aria-hidden="true" />
                  )}
                  <span className="font-mono text-[10px] text-muted-foreground flex-1 truncate">
                    {item.name}
                  </span>
                  {item.validade && item.ok && (
                    <span className="text-[9px] text-muted-foreground">
                      val. {item.validade}
                    </span>
                  )}
                  {!item.ok && (
                    <span className="text-[9px] text-warning font-medium">
                      Atualizando...
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          <span className="text-xs font-semibold text-primary">
            Avançar para Revisão →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup 3: Detalhe do Edital com Gauge de Compatibilidade ── */
function AnalyticsMockup() {
  const itens = [
    "Dipirona sódica 500mg",
    "Paracetamol 750mg",
    "Seringa descartável 10ml",
  ];

  return (
    <div className="gradient-border overflow-hidden rounded-xl bg-white shadow-elevated">
      {/* Header edital */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            Ativo
          </span>
          <span className="rounded bg-foreground/6 px-1.5 py-0.5 font-mono text-[9px] text-foreground/60">
            Pregão Eletrônico
          </span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary">
            Saúde
          </span>
        </div>
        <p className="text-sm font-bold text-foreground">Aquisição de Medicamentos</p>
        <p className="text-[10px] text-muted-foreground">
          Edital nº 045/2025 · Prefeitura de Salvador · Salvador, BA
        </p>
      </div>

      {/* KPIs + Gauge */}
      <div className="grid grid-cols-2 divide-x border-b">
        {/* KPIs */}
        <div className="px-3 py-3 space-y-1.5">
          {[
            { label: "Valor Estimado", val: "R$ 347.850" },
            { label: "Prazo Final", val: "29 nov 2025" },
            { label: "Itens", val: "15 itens" },
          ].map((kpi) => (
            <div key={kpi.label}>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </p>
              <p className="text-xs font-bold text-foreground">{kpi.val}</p>
            </div>
          ))}
        </div>

        {/* Gauge circular */}
        <div className="flex flex-col items-center justify-center px-3 py-3">
          <div className="relative flex size-16 items-center justify-center">
            {/* SVG gauge */}
            <svg viewBox="0 0 64 64" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/40"
              />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26 * 0.87} ${2 * Math.PI * 26 * 0.13}`}
                className="text-primary"
              />
            </svg>
            <span className="text-base font-black text-primary">87%</span>
          </div>
          <p className="mt-1 text-center text-[9px] font-bold text-foreground">
            Alta compatibilidade
          </p>
          <p className="text-center text-[9px] text-muted-foreground">
            13 de 15 itens
          </p>
        </div>
      </div>

      {/* Palavras-chave */}
      <div className="px-4 pt-2.5 pb-1 flex flex-wrap gap-1.5">
        {["medicamento", "saúde", "equipamento"].map((kw) => (
          <span
            key={kw}
            className="rounded-full bg-foreground/6 px-2 py-0.5 font-mono text-[9px] text-foreground/60"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Itens compatíveis */}
      <div className="px-4 pb-3">
        <p className="mb-1.5 text-[10px] font-semibold text-foreground">
          Itens compatíveis com seu catálogo
        </p>
        <ul className="space-y-1">
          {itens.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-mono text-[10px] text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MOCKUP_COMPONENTS = [SearchMockup, ProposalMockup, AnalyticsMockup] as const;

/* Thresholds: section is divided into 3 equal thirds. */
const THRESHOLDS = [1 / 3, 2 / 3] as const;

function getActiveIndex(progress: number): number {
  if (progress >= THRESHOLDS[1]) return 2;
  if (progress >= THRESHOLDS[0]) return 1;
  return 0;
}

interface ShowcaseItem {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  link: string;
}

const showcases: ShowcaseItem[] = [
  {
    eyebrow: "Painel & Busca",
    title: "O painel só mostra editais com a sua cara",
    description:
      "Cadastre seu catálogo e cada licitação ganha um % de compatibilidade. A busca contextual com IA expande o vocabulário do seu segmento — você encontra editais que keyword puro perderia.",
    points: [
      "Análise de Compatibilidade com seu catálogo (% por edital)",
      "Busca contextual com IA — expande termos relacionados",
      "Filtros por UF, modalidade, valor, prazo e status",
    ],
    link: "Ver o painel",
  },
  {
    eyebrow: "Wizard de Proposta",
    title: "Da licitação à proposta enviada em 6 etapas",
    description:
      "Identificação, Itens & Lotes, Precificação, Condições, Documentos e Revisão. Cada etapa guiada, com validação automática das certidões via Receita Federal, PGFN e SERPRO. Você só clica em Enviar.",
    points: [
      "6 etapas guiadas com modelos da sua empresa",
      "Validação automática de documentos (Receita, PGFN, SERPRO, Cartórios)",
      "Pré-visualização do PDF antes do envio",
    ],
    link: "Ver o wizard",
  },
  {
    eyebrow: "Catálogo & Match",
    title: "Seu catálogo casa com cada edital, automaticamente",
    description:
      "Cadastre seus produtos uma vez. Quando uma licitação nova é publicada, mostramos quais itens do edital estão no seu catálogo, com porcentagem de compatibilidade e palavras-chave encontradas.",
    points: [
      "Catálogo próprio com SKU, categoria e tags",
      "Análise de compatibilidade item por item",
      "Palavras-chave do edital cruzadas com seu catálogo",
    ],
    link: "Ver o catálogo",
  },
];

/* ── Sticky scroll desktop layout ── */
function StickyShowcase() {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = getActiveIndex(latest);
    if (next !== activeIndex) setActiveIndex(next);
  });

  const ActiveMockup = MOCKUP_COMPONENTS[activeIndex];

  return (
    <div ref={wrapperRef} className="relative">
      {/* Two-column grid: text scrolls left, mockup sticks right */}
      <div className="grid grid-cols-2 gap-16 xl:gap-24">
        {/* LEFT — scrollable text steps */}
        <div>
          {showcases.map((item) => (
            <div
              key={item.title}
              className="flex min-h-[100vh] flex-col justify-center py-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-eyebrow mb-3 text-primary">{item.eyebrow}</p>
                <h3 className="text-display-l font-display font-bold">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#features"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {item.link}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          ))}
        </div>

        {/* RIGHT — sticky mockup column */}
        <div
          className="sticky top-24 h-[calc(100vh-8rem)] self-start"
          aria-hidden="true"
        >
          <div className="flex h-full items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
                  animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                  exit={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ActiveMockup />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile stacked layout (fallback for < lg) ── */
function StackedShowcase() {
  return (
    <div className="space-y-32">
      {showcases.map((item, index) => {
        const Mockup = MOCKUP_COMPONENTS[index];
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-12"
          >
            {/* Text */}
            <div>
              <p className="text-eyebrow mb-3 text-primary">{item.eyebrow}</p>
              <h3 className="text-display-l font-display font-bold">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#features"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {item.link}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            {/* Mockup */}
            <div aria-hidden="true">
              <Mockup />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <SectionWrapper>
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow mb-3 text-primary">Funcionalidades em detalhe</p>
        <h2 className="text-display-xl font-display font-bold">
          Feito para quem leva licitações a sério
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cada funcionalidade remove uma burocracia. O resultado aparece na taxa de aprovação.
        </p>
      </AnimatedSection>

      {/* Desktop: sticky scroll */}
      <div className="mt-16 hidden lg:block">
        <StickyShowcase />
      </div>

      {/* Mobile: stacked */}
      <div className="mt-24 lg:hidden">
        <StackedShowcase />
      </div>
    </SectionWrapper>
  );
}
