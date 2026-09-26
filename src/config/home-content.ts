import {
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
} from "lucide-react";
import type {
  HowItWorksStep,
  IconCard,
  PlatformTab,
} from "@/types";

export const heroContent = {
  eyebrow: "Para quem vende ao governo",
  titleLead: "Licitações,",
  titleEmphasis: "do radar à proposta pronta.",
  subtitle:
    "A Qore encontra os editais que combinam com o seu CNPJ, resume cada um citando a página, entrega a proposta cerca de 80% pronta e avisa antes de uma certidão vencer.",
  rotatingLines: [
    "Editais que combinam com o seu CNPJ",
    "Resumo do edital com a página citada",
    "Proposta cerca de 80% pronta, com sua marca",
    "Certidões com aviso antes de vencer",
  ],
  trustPoints: [
    { icon: ShieldCheck, label: "Alinhado à Lei 14.133/2021" },
  ],
  primaryAction: "Agendar demonstração",
  secondaryAction: "Ver a plataforma",
} as const;

export const howItWorksContent: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly HowItWorksStep[];
} = {
  eyebrow: "Fluxo integrado",
  title: "Do CNPJ à proposta em três etapas",
  description:
    "Informe o CNPJ, receba o radar e responda com o edital resumido e a proposta encaminhada. A decisão continua com a sua equipe.",
  steps: [
    {
      number: "01",
      title: "Informe o CNPJ",
      description: "A partir do CNPJ, a Qore identifica o que a sua empresa fornece e monta o perfil de busca.",
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

export const platformContent = {
  eyebrow: "Recursos e módulos",
  title: "Uma tela para cada etapa da licitação",
  description: "Painel do gestor, radar, resumo com IA, precificação e calendário, todos com os mesmos dados da empresa.",
} as const;

export const platformTabs: readonly PlatformTab[] = [
  { id: "painel", label: "Painel do gestor" },
  { id: "radar", label: "Radar de oportunidades" },
  { id: "resumo", label: "Resumo do edital com IA" },
  { id: "precificacao", label: "Precificação inteligente" },
  { id: "calendario", label: "Calendário de prazos" },
];

export const audienceContent: {
  eyebrow: string;
  title: string;
  description: string;
  audiences: readonly IconCard[];
  actionLabel: string;
} = {
  eyebrow: "Para quem é",
  title: "Para quem vende a órgãos de São Paulo",
  description:
    "Fornecedoras, consultorias e equipes de licitação trabalham na mesma base de editais, preços e prazos.",
  audiences: [
    {
      icon: Building2,
      title: "Empresas fornecedoras",
      description:
        "Do MEI à grande empresa: radar pelo CNPJ, proposta cerca de 80% pronta e certidões sempre em dia.",
    },
    {
      icon: Briefcase,
      title: "Consultores e assessorias de licitação",
      description:
        "Vários CNPJs em uma só conta, com uma proposta por cliente e a marca de cada um.",
    },
    {
      icon: Users,
      title: "Equipes de licitação",
      description: "Analista e gestor com visões próprias, aprovação de propostas e prazos da equipe em um painel.",
    },
  ],
  actionLabel: "Falar com um especialista sobre o meu caso",
};

export const contactContent = {
  eyebrow: "Diagnóstico sem compromisso",
  title: "Veja as licitações abertas para o seu CNPJ",
  description:
    "Conte o porte da empresa e quantas licitações disputa por mês. A equipe da Qore retorna com uma demonstração no seu cenário.",
  highlights: [
    "Radar montado a partir do CNPJ da sua empresa",
    "Editais abertos em São Paulo no seu segmento",
    "Proposta cerca de 80% pronta desde a primeira licitação",
  ],
} as const;

