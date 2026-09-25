import { Files, FileSearch, FileX } from "lucide-react";
import type { HowItWorksStep, IconCard, PlatformTab, SummaryItem } from "@/types";

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

export const howItWorksContent: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly HowItWorksStep[];
} = {
  eyebrow: "Como funciona",
  title: "Três passos, com você no controle",
  description: "Do CNPJ à proposta, a decisão continua com a sua equipe.",
  steps: [
    {
      number: "01",
      title: "Informe o CNPJ",
      description: "A partir do CNPJ, o Qore identifica o que a sua empresa fornece e monta o perfil de busca.",
    },
    {
      number: "02",
      title: "Receba o radar",
      description: "Você recebe as licitações abertas em órgãos de São Paulo que combinam com o que a sua empresa vende.",
    },
    {
      number: "03",
      title: "Entenda e responda",
      description:
        "A IA resume o edital citando a página de origem, sinaliza risco de preço e ajuda a montar a proposta para você revisar.",
    },
  ],
};

export const platformTabs: readonly PlatformTab[] = [
  {
    id: "painel",
    label: "Painel do gestor",
    caption: "Valor em disputa, sessões do mês e a carga de cada pessoa da equipe.",
    image: "manager-dashboard",
    alt: "Painel do gestor com indicadores do mês, calendário de sessões e equipe, com dados de demonstração",
  },
  {
    id: "radar",
    label: "Radar",
    caption: "Licitações abertas que combinam com o seu CNPJ.",
    image: "radar",
    alt: "Radar de licitações com filtros e lista de oportunidades, com dados de demonstração",
  },
  {
    id: "busca",
    label: "Busca",
    caption: "Busque por objeto, órgão ou modalidade.",
    image: "search",
    alt: "Tela de busca de licitações com campo de pesquisa e resultados, com dados de demonstração",
  },
  {
    id: "precificacao",
    label: "Precificação",
    caption: "Preencha os preços da proposta e veja quando um valor merece revisão.",
    image: "pricing",
    alt: "Etapa de precificação da proposta com preços por item, com dados de demonstração",
  },
  {
    id: "calendario",
    label: "Calendário",
    caption: "Sessões e prazos das licitações que você acompanha.",
    image: "calendar",
    alt: "Calendário mensal com sessões e prazos de licitações, com dados de demonstração",
  },
];
