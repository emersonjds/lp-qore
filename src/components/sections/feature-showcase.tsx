"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Badge } from "@/components/ui/badge";

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

      <div className="mt-20 space-y-24">
        {showcases.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image placeholder */}
              <div className="flex-1">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-muted to-primary/5">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      {item.badge} — Preview
                    </p>
                  </div>
                </div>
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
