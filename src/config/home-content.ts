import {
  BadgeCheck,
  CalendarClock,
  ChartPie,
  FileCheck2,
  Files,
  FileSearch,
  FileX,
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
  CoverageRegion,
  HowItWorksStep,
  IconCard,
  MapHub,
  Persona,
  PersonaMetric,
  PlatformTab,
  SummaryItem,
} from "@/types";

export const heroContent = {
  eyebrow: "Disponível para São Paulo",
  titleLead: "A IA lê o edital.",
  titleEmphasis: "Você decide.",
  subtitle:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
  microcopy: "Sem cadastro e sem cartão",
  primaryAction: "Quero ver a Qore com as minhas licitações",
  secondaryAction: "Ver como funciona",
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

export const analystMatchExample = {
  tender: "Pregão eletrônico: aquisição de notebooks",
  agency: "Prefeitura de Campinas",
  score: 87,
  criteria: ["CNAE compatível", "Porte da empresa atendido", "3 itens do catálogo no edital"],
} as const;

export const managerMetricsExample: readonly PersonaMetric[] = [
  { label: "Licitações em análise", value: "12", detail: "3 com sessão nesta semana" },
  { label: "Valor em disputa", value: "R$ 1,8 mi", detail: "Soma das propostas em andamento" },
  { label: "Prazos da semana", value: "4", detail: "1 pedido de esclarecimento vence hoje" },
  { label: "Propostas enviadas no mês", value: "5", detail: "Todas revisadas pela equipe" },
];

export const coverageContent: {
  eyebrow: string;
  title: string;
  description: string;
  regions: readonly CoverageRegion[];
  hubs: readonly MapHub[];
} = {
  eyebrow: "Cobertura",
  title: "Começamos por São Paulo",
  description:
    "Licitações de órgãos estaduais e municipais de São Paulo, dos principais portais, em um só lugar. Outros estados em breve.",
  regions: [
    { name: "Grande São Paulo", cities: "Capital, Guarulhos, ABC" },
    { name: "Região de Campinas", cities: "Campinas, Americana, Sumaré" },
    { name: "Vale do Paraíba", cities: "São José dos Campos, Taubaté" },
    { name: "Interior e Litoral", cities: "Ribeirão Preto, Santos, Sorocaba" },
  ],
  hubs: [
    { name: "São Paulo", centerX: 260, centerY: 190, radius: 6, labelX: 272, labelY: 194, labelAnchor: "start" },
    { name: "Campinas", centerX: 230, centerY: 160, radius: 5, labelX: 222, labelY: 152, labelAnchor: "end" },
    { name: "Santos", centerX: 275, centerY: 215, radius: 4, labelX: 285, labelY: 222, labelAnchor: "start" },
    { name: "Ribeirão Preto", centerX: 190, centerY: 90, radius: 4, labelX: 182, labelY: 86, labelAnchor: "end" },
    { name: "S. José dos Campos", centerX: 295, centerY: 170, radius: 4, labelX: 395, labelY: 160, labelAnchor: "end" },
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
