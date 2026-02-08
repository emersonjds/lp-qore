"use client";

import { motion } from "motion/react";
import {
  CheckCircle2,
  Search,
  Bell,
  FileText,
  Clock,
  TrendingUp,
  BarChart3,
  Filter,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Badge } from "@/components/ui/badge";

/* ── Mockup: Busca & Alertas ── */
function SearchMockup() {
  const results = [
    {
      org: "Prefeitura de São Paulo",
      title: "Pregão Eletrônico - Serviços de TI",
      value: "R$ 2.450.000",
      deadline: "3 dias",
      status: "Aberta",
    },
    {
      org: "Governo Federal - SERPRO",
      title: "Concorrência - Infraestrutura Cloud",
      value: "R$ 8.120.000",
      deadline: "7 dias",
      status: "Aberta",
    },
    {
      org: "Gov. Minas Gerais",
      title: "Pregão - Equipamentos de Rede",
      value: "R$ 890.000",
      deadline: "12 dias",
      status: "Nova",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Search bar */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Serviços de tecnologia...</span>
        </div>
        <div className="mt-2 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Filter className="size-3" /> CNAE: 62.01
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <MapPin className="size-3" /> SP, MG, RJ
          </span>
        </div>
      </div>
      {/* Results */}
      <div className="divide-y">
        {results.map((r) => (
          <div key={r.title} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">{r.org}</p>
              <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
            </div>
            <div className="ml-4 shrink-0 text-right">
              <p className="text-sm font-semibold text-foreground">{r.value}</p>
              <div className="flex items-center justify-end gap-1">
                <Clock className="size-3 text-warning" />
                <span className="text-xs text-muted-foreground">{r.deadline}</span>
                <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${r.status === "Nova" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>
                  {r.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Alert notification */}
      <div className="border-t bg-primary/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-primary" />
          <span className="text-xs font-medium text-primary">
            3 novas licitações encontradas no seu perfil
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Gestão de Propostas ── */
function ProposalMockup() {
  const checklist = [
    { label: "Certidão Negativa Federal", done: true },
    { label: "Balanço Patrimonial 2024", done: true },
    { label: "Atestado de Capacidade Técnica", done: true },
    { label: "Proposta Comercial", done: false },
    { label: "Declaração ME/EPP", done: false },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Pregão Eletrônico #2024/0847</p>
            <p className="text-sm font-semibold text-foreground">Prefeitura de São Paulo</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1">
            <AlertCircle className="size-3.5 text-warning" />
            <span className="text-xs font-medium text-warning">Prazo: 3 dias</span>
          </div>
        </div>
      </div>
      {/* Progress */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">Documentos enviados</span>
          <span className="font-semibold text-primary">3/5</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[60%] rounded-full bg-primary transition-all" />
        </div>
      </div>
      {/* Checklist */}
      <div className="px-4 py-3">
        <ul className="space-y-2.5">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <div className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${item.done ? "border-primary bg-primary" : "border-border"}`}>
                {item.done && <CheckCircle2 className="size-3.5 text-white" />}
              </div>
              <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground font-medium"}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Action */}
      <div className="border-t px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          <span className="text-xs font-medium text-primary">Próximo: Anexar Proposta Comercial</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Inteligência ── */
function AnalyticsMockup() {
  const bars = [
    { label: "Jan", h: 40 },
    { label: "Fev", h: 55 },
    { label: "Mar", h: 35 },
    { label: "Abr", h: 70 },
    { label: "Mai", h: 85 },
    { label: "Jun", h: 95 },
  ];

  const competitors = [
    { name: "Sua empresa", wins: 12, rate: "68%" },
    { name: "Concorrente A", wins: 8, rate: "45%" },
    { name: "Concorrente B", wins: 5, rate: "31%" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Painel de Desempenho</span>
          </div>
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs text-accent-foreground">
            Últimos 6 meses
          </span>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-3 divide-x border-b">
        {[
          { label: "Participações", val: "47" },
          { label: "Taxa de Sucesso", val: "68%" },
          { label: "Volume Ganho", val: "R$ 4.2M" },
        ].map((kpi) => (
          <div key={kpi.label} className="px-3 py-2.5 text-center">
            <p className="text-lg font-bold text-foreground">{kpi.val}</p>
            <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="px-4 py-3">
        <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm bg-primary/80"
                style={{ height: `${bar.h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Competitors */}
      <div className="border-t px-4 py-2.5">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Top concorrentes no seu segmento</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {competitors.map((c, i) => (
            <div key={c.name} className="flex items-center justify-between">
              <span className={`text-xs ${i === 0 ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                {c.name}
              </span>
              <span className={`text-xs font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                {c.wins} vitórias ({c.rate})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockups = [SearchMockup, ProposalMockup, AnalyticsMockup];

const showcases = [
  {
    badge: "Busca & Alertas",
    title: "Encontre as licitações certas para o seu negócio",
    description:
      "O Qore monitora dezenas de portais e publica editais organizados por segmento, região e modalidade. Configure alertas e seja notificado assim que surgir uma oportunidade.",
    points: [
      "Monitoramento de portais federais, estaduais e municipais",
      "Filtros por CNAE, modalidade, valor e região",
      "Alertas por e-mail e push em tempo real",
    ],
  },
  {
    badge: "Gestão de Propostas",
    title: "Monte propostas completas sem perder prazos",
    description:
      "Organize documentos, monte checklists de habilitação e controle deadlines de cada licitação. O Qore garante que você nunca perca uma oportunidade por falta de organização.",
    points: [
      "Checklist inteligente de documentos exigidos",
      "Controle de prazos com lembretes automáticos",
      "Histórico completo de propostas enviadas",
    ],
  },
  {
    badge: "Inteligência",
    title: "Dados que aumentam sua taxa de aprovação",
    description:
      "Analise seus resultados, identifique padrões de concorrentes e entenda quais licitações oferecem as melhores oportunidades para a sua empresa.",
    points: [
      "Dashboards de desempenho por período e segmento",
      "Análise de concorrência e histórico de vencedores",
      "Previsão de oportunidades com base em tendências",
    ],
  },
];

export function FeatureShowcase() {
  return (
    <SectionWrapper>
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">Mergulho Profundo</Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Feito para quem leva licitações a sério
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cada funcionalidade foi desenhada para remover a burocracia e aumentar
          suas chances de vencer.
        </p>
      </AnimatedSection>

      <div className="mt-20 space-y-28">
        {showcases.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Mockup */}
              <div className="w-full flex-1 lg:max-w-md">
                {(() => { const Mockup = mockups[index]; return <Mockup />; })()}
              </div>

              {/* Text */}
              <div className="flex-1">
                <Badge variant="secondary" className="mb-3">{item.badge}</Badge>
                <h3 className="text-2xl font-bold sm:text-3xl">{item.title}</h3>
                <p className="mt-4 text-muted-foreground">{item.description}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
