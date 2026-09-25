import { Files, FileSearch, FileX } from "lucide-react";
import type { IconCard, SummaryItem } from "@/types";

export const heroContent = {
  eyebrow: "Piloto em São Paulo",
  titleLead: "A IA lê o edital.",
  titleEmphasis: "Você decide.",
  subtitle:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
  microcopy: "Sem cadastro e sem cartão",
} as const;

export const heroSummaryItems: readonly SummaryItem[] = [
  {
    title: "Exigência técnica",
    citation: "pág. 12, item 4.2",
    summary: "Responsável técnico com registro ativo no conselho e atestado compatível com o objeto.",
    isRisk: false,
  },
  {
    title: "Prazo de entrega",
    citation: "pág. 18, item 7.1",
    summary: "30 dias corridos após a ordem de fornecimento, em remessa única.",
    isRisk: false,
  },
  {
    title: "Garantia da proposta",
    citation: "pág. 24, item 9.3",
    summary: "1% do valor estimado, até 24 horas antes da sessão pública.",
    isRisk: false,
  },
  {
    title: "Alerta de risco",
    citation: "pág. 8",
    summary: "Visita técnica facultativa, com declaração formal assinada pelo responsável legal.",
    isRisk: true,
  },
];

export const problemContent: { eyebrow: string; title: string; items: readonly IconCard[] } = {
  eyebrow: "O desafio",
  title: "Os gargalos de quem disputa licitações todos os dias",
  items: [
    {
      icon: Files,
      title: "Editais espalhados em vários portais",
      description:
        "Prefeituras, secretarias e autarquias publicam em portais diferentes. Acompanhar todos à mão toma o dia e ainda deixa oportunidade passar.",
    },
    {
      icon: FileSearch,
      title: "80 páginas lidas na véspera do prazo",
      description:
        "O edital chega com anexos longos, e a cláusula que elimina a sua empresa costuma estar no meio deles, lida às pressas.",
    },
    {
      icon: FileX,
      title: "Proposta desclassificada por preço ou documento faltando",
      description:
        "Uma certidão vencida ou um preço fora da faixa aceitável derruba semanas de trabalho da equipe.",
    },
  ],
};
