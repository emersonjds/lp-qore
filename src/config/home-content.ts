import {
  Briefcase,
  Building2,
  Landmark,
  Users,
  BadgeCheck,
  BookOpenText,
  CircleX,
  LayoutGrid,
  CalendarClock,
  ChartPie,
  FileCheck2,
  Gauge,
  ListChecks,
  Quote,
  Radar,
  SearchCheck,
  SearchX,
  Send,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  UserCog,
  UsersRound,
} from "lucide-react";
import type {
  CoverageCluster,
  HowItWorksStep,
  IconCard,
  MapHub,
  Persona,
  PlatformTab,
  ProblemCard,
} from "@/types";

export const heroContent = {
  eyebrow: "Disponível para São Paulo",
  titleLead: "A IA lê o edital.",
  titleEmphasis: "Você decide.",
  subtitle:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
  trustPoints: ["Citação direta de artigos e páginas", "Alinhado à Lei 14.133/2021"],
  primaryAction: "Quero assinar a Qore",
  secondaryAction: "Ver como funciona",
} as const;

export const problemContent: { eyebrow: string; title: string; items: readonly ProblemCard[] } = {
  eyebrow: "O desafio da contratação pública",
  title: "Os gargalos de quem disputa licitações todos os dias",
  items: [
    {
      icon: LayoutGrid,
      title: "Editais espalhados em vários portais",
      footnote: "Perda recorrente de janelas de impugnação",
      description:
        "Prefeituras, secretarias e autarquias publicam em portais diferentes. Acompanhar todos à mão toma o dia e ainda deixa oportunidade passar.",
    },
    {
      icon: BookOpenText,
      title: "80 páginas lidas na véspera do prazo",
      footnote: "Fadiga decisória e omissões técnicas críticas",
      description:
        "O edital chega com anexos longos, e a cláusula que elimina a sua empresa costuma estar no meio deles, lida às pressas.",
    },
    {
      icon: CircleX,
      title: "Proposta desclassificada por preço ou documento faltando",
      footnote: "Desperdício de tempo investido pela equipe",
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
  eyebrow: "Fluxo integrado",
  title: "Como funciona",
  description: "Três etapas conectam a sua empresa aos editais certos, com a decisão sempre nas mãos da sua equipe.",
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

export const responsibleAiContent: { eyebrow: string; title: string; description: string; commitments: readonly IconCard[] } = {
  eyebrow: "IA responsável",
  title: "IA com responsabilidade",
  description:
    "A IA trabalha como apoio da sua equipe: ela lê, organiza e aponta a fonte. A decisão continua sua.",
  commitments: [
    {
      icon: Quote,
      title: "Cita a fonte",
      description: "Cada ponto do resumo indica a página e o item do edital de onde saiu.",
    },
    {
      icon: SearchX,
      title: "Diz “não encontrado no edital”",
      description: "Quando o edital não traz a informação, a IA diz isso em vez de preencher a lacuna.",
    },
    {
      icon: SlidersHorizontal,
      title: "Sugere, e você decide",
      description: "A IA organiza as informações. Participar ou não, e por qual preço, é decisão da sua equipe.",
    },
    {
      icon: Send,
      title: "Você envia a proposta, não a IA",
      description: "O Qore não envia proposta nem dá lance. O envio ao portal continua com a sua empresa.",
    },
  ],
};

export const aiReadingExample = {
  label: "Exemplo ilustrativo: trecho do edital e resumo da IA",
  documentTitle: "Edital de pregão eletrônico",
  summaryTitle: "Resumo da IA",
  excerpts: [
    {
      label: "Objeto:",
      text: "aquisição de material de escritório para as unidades da Secretaria.",
      page: 12,
      summary: "Compra de material de escritório",
    },
    {
      label: "Prazo da proposta:",
      text: "as propostas serão recebidas até as 9h do dia da sessão pública.",
      page: 31,
      summary: "Enviar a proposta até as 9h do dia da sessão",
    },
    {
      label: "Habilitação:",
      text: "certidões de regularidade fiscal e trabalhista válidas na data da sessão.",
      page: 44,
      summary: "Certidões fiscal e trabalhista válidas na sessão",
    },
  ],
} as const;

export const personasContent: { eyebrow: string; title: string; personas: readonly [Persona, Persona] } = {
  eyebrow: "Para cada função",
  title: "Feito para quem prepara a proposta e para quem decide",
  personas: [
    {
      id: "analyst",
      toggleLabel: "Analista de licitações",
      title: "Seu dia sem planilha nem PDF de 80 páginas",
      features: [
        {
          icon: Radar,
          title: "Match por CNPJ",
          description: "A IA cruza CNAE, porte, catálogo e histórico da empresa com cada edital e mostra a aderência.",
        },
        {
          icon: SearchCheck,
          title: "Busca por termos correlatos",
          description: "Procure “computador” e encontre também “notebook” e “desktop”.",
        },
        {
          icon: Sparkles,
          title: "Resumo do edital",
          description: "O essencial do edital com a página de origem de cada ponto.",
        },
        {
          icon: FileCheck2,
          title: "Proposta cerca de 80% pronta",
          description: "Você só completa os preços, e o documento sai com a marca da empresa.",
        },
        {
          icon: TriangleAlert,
          title: "Alerta de preço inexequível",
          description: "Aviso quando o preço fica muito abaixo da referência do edital.",
        },
        {
          icon: CalendarClock,
          title: "Calendário de prazos",
          description: "Impugnação, esclarecimento, abertura e sessão em um só lugar.",
        },
        {
          icon: ListChecks,
          title: "Checklist de habilitação",
          description: "Os documentos exigidos, com as certidões já conferidas.",
        },
      ],
    },
    {
      id: "manager",
      toggleLabel: "Gestor de licitações",
      title: "Visão da operação inteira em uma tela",
      features: [
        {
          icon: Gauge,
          title: "Painel do gestor",
          description: "Valor ganho, licitações ganhas, taxa de vitória e valor em disputa.",
        },
        {
          icon: CalendarClock,
          title: "Calendário do mês",
          description: "Sessões e prazos de todas as licitações da equipe.",
        },
        {
          icon: ChartPie,
          title: "Distribuição por modalidade",
          description: "Onde a equipe está disputando: pregão, concorrência, dispensa.",
        },
        {
          icon: UsersRound,
          title: "Ritmo da equipe",
          description: "O andamento de cada analista, sem pedir relatório.",
        },
        {
          icon: UserCog,
          title: "Papéis e permissões",
          description: "Administrador, Gestor e Analista, cada um com o acesso certo.",
        },
        {
          icon: BadgeCheck,
          title: "Aprovação de propostas",
          description: "Nenhuma proposta sai sem a sua revisão antes do envio.",
        },
      ],
    },
  ],
};

export const audienceContent: {
  title: string;
  audiences: readonly IconCard[];
  actionLabel: string;
} = {
  title: "A Qore se encaixa na sua operação",
  audiences: [
    {
      icon: Building2,
      title: "Empresas fornecedoras",
      description:
        "Da PME à grande empresa: radar de oportunidades, proposta cerca de 80% pronta e certidões em dia.",
    },
    {
      icon: Briefcase,
      title: "Consultores e assessorias de licitação",
      description:
        "Vários CNPJs em uma só conta (Modo Consultor), com uma proposta por cliente e a marca de cada um.",
    },
    {
      icon: Users,
      title: "Equipes de licitação",
      description: "Papéis de Analista e Gestor, aprovação de propostas e painel do gestor.",
    },
    {
      icon: Landmark,
      title: "Prefeituras e órgãos públicos",
      description: "Visão do mercado fornecedor da região e dos preços praticados em licitações semelhantes.",
    },
  ],
  actionLabel: "Fale com a gente sobre o seu caso",
};

export const coverageContent: {
  eyebrow: string;
  title: string;
  description: string;
  clusters: readonly CoverageCluster[];
  hubs: readonly MapHub[];
} = {
  eyebrow: "Cobertura",
  title: "Todo o estado de São Paulo, da capital ao interior",
  description:
    "Licitações dos 645 municípios paulistas, do governo do estado, de autarquias e empresas públicas, reunidas dos principais portais.",
  clusters: [
    {
      name: "Capital e litoral",
      regions: [
        { name: "Metropolitana de São Paulo", cities: "Capital, Guarulhos, ABC, Osasco" },
        { name: "Baixada Santista", cities: "Santos, Guarujá, Praia Grande" },
        { name: "Registro" },
      ],
    },
    {
      name: "Campinas e leste",
      regions: [
        { name: "Campinas", cities: "Americana, Jundiaí, Piracicaba" },
        { name: "São José dos Campos", cities: "Taubaté, Jacareí" },
      ],
    },
    {
      name: "Sul e centro",
      regions: [
        { name: "Sorocaba" },
        { name: "Itapeva" },
        { name: "Bauru" },
        { name: "Central", cities: "Araraquara, São Carlos" },
      ],
    },
    {
      name: "Norte e oeste",
      regions: [
        { name: "Ribeirão Preto" },
        { name: "Franca" },
        { name: "Barretos" },
        { name: "São José do Rio Preto" },
        { name: "Araçatuba" },
        { name: "Presidente Prudente" },
        { name: "Marília" },
      ],
    },
  ],
  hubs: [
    { name: "São Paulo", longitude: -46.6333, latitude: -23.5505 },
    { name: "Campinas", longitude: -47.0626, latitude: -22.9056 },
    { name: "Santos", longitude: -46.3336, latitude: -23.9608 },
    { name: "Ribeirão Preto", longitude: -47.8103, latitude: -21.1775 },
    { name: "São José dos Campos", longitude: -45.8872, latitude: -23.1791 },
  ],
};

export const aboutContent = {
  eyebrow: "Quem somos",
  title: "Licitação pública ao alcance de quem hoje fica de fora",
  mission:
    "O Qore nasceu para tornar a licitação pública acessível às empresas que hoje ficam de fora por falta de tempo e de estrutura. Começamos por São Paulo, ouvindo quem disputa licitações no dia a dia.",
} as const;

export const contactContent = {
  eyebrow: "Fale com a gente",
  title: "Receba uma demonstração com as licitações do seu segmento",
  description: "Conte um pouco sobre a sua empresa. A gente responde pelo e-mail ou WhatsApp que você informar.",
  highlights: [
    "Conversa com quem está construindo o produto",
    "Um olhar sobre editais abertos em São Paulo no seu segmento",
    "Como a sua proposta sai cerca de 80% pronta",
  ],
} as const;

export const ctaBanners = {
  afterFeatures: {
    location: "after-features",
    title: "Sua próxima proposta pode sair 80% pronta",
    actionLabel: "Falar com um especialista",
  },
  afterIntegrations: {
    location: "after-integrations",
    title: "Veja os editais de SP compatíveis com o seu CNPJ",
    actionLabel: "Quero uma demonstração",
  },
} as const;

export const timeSavedContent = {
  eyebrow: "Resultados",
  title: "Tempo que volta para a equipe",
  description: "O trabalho repetitivo sai da mesa da equipe, e sobra tempo para decidir e disputar mais.",
  comparisons: [
    { task: "Leitura do edital", before: "Horas de leitura", after: "Minutos, com o resumo citado" },
    { task: "Busca de oportunidades", before: "Vários portais abertos", after: "Um radar só" },
    { task: "Montagem da proposta", before: "Do zero", after: "Cerca de 80% pronta" },
    { task: "Certidões", before: "Conferência manual", after: "Alerta antes de vencer" },
  ],
} as const;
