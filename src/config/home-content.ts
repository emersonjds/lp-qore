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
  CircleHelp,
  ShieldCheck,
  PenLine,
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
  eyebrow: "Para quem vende ao governo em São Paulo",
  titleLead: "Licitações de São Paulo,",
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

export const problemContent: { eyebrow: string; title: string; description: string; items: readonly ProblemCard[] } = {
  eyebrow: "O desafio da contratação pública",
  title: "Onde a licitação se perde: portal, edital e prazo",
  description:
    "Edital em portal que ninguém abriu, 80 páginas lidas na véspera, proposta desclassificada por preço ou certidão vencida.",
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

export const responsibleAiContent: { eyebrow: string; title: string; description: string; commitments: readonly IconCard[] } = {
  eyebrow: "Governança e transparência",
  title: "IA que mostra a fonte e deixa a decisão com você",
  description:
    "Cada ponto cita a página do edital, o que o edital não informa aparece como lacuna e o envio ao portal é sempre da sua empresa.",
  commitments: [
    {
      icon: Quote,
      title: "Cita a fonte de cada afirmação",
      description: "Cada ponto do resumo indica a página e o item do edital de onde saiu, para você conferir no texto oficial.",
    },
    {
      icon: CircleHelp,
      title: "Diz quando o edital não informa",
      description:
        "Se uma regra não está explícita no edital, a IA aponta a omissão para você pedir esclarecimento ao pregoeiro.",
    },
    {
      icon: SlidersHorizontal,
      title: "Sugere, você decide",
      description: "A IA organiza as informações. Participar ou não, e por qual preço, é decisão da sua equipe.",
    },
    {
      icon: PenLine,
      title: "Você envia a proposta, não a IA",
      description: "A Qore não envia proposta nem dá lance. O envio ao portal e a decisão final continuam com a sua empresa.",
    },
  ],
};

export const auditExample = {
  label: "Auditoria em Tempo Real",
  title: "Auditoria em Tempo Real",
  caption: "Cada trecho com a página de origem",
  excerptLabel: "Trecho extraído:",
  excerpt: "“Exige-se índice de liquidez corrente superior a 1,25.”",
  source: "Edital_SP_Item_8.4.pdf • pág. 31",
  missingLabel: "Garantia contratual:",
  missingText: "Não encontrado no edital",
  missingAction: "Sugestão: pedir esclarecimento",
} as const;

export const personasContent: {
  eyebrow: string;
  title: string;
  description: string;
  personas: readonly [Persona, Persona];
} = {
  eyebrow: "Interface sob medida",
  title: "Uma visão para o analista, outra para o gestor",
  description:
    "O analista trabalha a fila do dia; o gestor acompanha valor ganho, taxa de vitória e prazos da equipe.",
  personas: [
    {
      id: "manager",
      toggleLabel: "Visão do Gestor",
      title: "Visão da operação inteira em uma tela",
      kpis: [
        {
          label: "Valor ganho acumulado",
          value: "R$ 4,2M",
          isCounted: true,
          caption: "Contratos ganhos em 2026",
          footnote: "8 pregões com contrato assinado",
          tone: "positive",
        },
        {
          label: "Taxa de vitória em sessões",
          value: "34,8%",
          isCounted: true,
          caption: "Sessões encerradas no período",
          footnote: "23 de 66 sessões disputadas",
          tone: "neutral",
        },
        {
          label: "Funil por órgão comprador",
          value: "Campinas e Santos",
          isCounted: false,
          caption: "Órgãos com mais adjudicações da equipe",
          footnote: "Ciclo médio de 28 dias",
          tone: "neutral",
        },
        {
          label: "Produtividade do time",
          value: "Mais editais triados",
          isCounted: false,
          caption: "Com a mesma equipe técnica",
          footnote: "Leitura guiada pelo resumo citado",
          tone: "neutral",
        },
      ],
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
    {
      id: "analyst",
      toggleLabel: "Visão do Analista",
      title: "Seu dia sem planilha nem PDF de 80 páginas",
      kpis: [
        {
          label: "Fila de prioridades do dia",
          value: "3 editais",
          isCounted: true,
          caption: "1 com prazo de impugnação hoje",
          footnote: "Urgente: DAEE até 18h",
          tone: "urgent",
        },
        {
          label: "Checklist de certidões",
          value: "Todas válidas",
          isCounted: false,
          caption: "CND Federal, CRF do FGTS e CNDT",
          footnote: "Próximo vencimento em 12 dias",
          tone: "neutral",
        },
        {
          label: "Alerta de preço",
          value: "Item 3 abaixo da referência",
          isCounted: false,
          caption: "Pregão 041/2026 • Prefeitura de Santos",
          footnote: "Revise antes de enviar",
          tone: "urgent",
        },
        {
          label: "Proposta em montagem",
          value: "80% pronta",
          isCounted: true,
          caption: "Falta só o preço dos itens",
          footnote: "Segue para aprovação do gestor",
          tone: "positive",
        },
      ],
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
  ],
};

export const audienceContent: {
  eyebrow: string;
  title: string;
  description: string;
  audiences: readonly IconCard[];
  actionLabel: string;
} = {
  eyebrow: "Para quem é",
  title: "Para cada lado da licitação em São Paulo",
  description:
    "Fornecedoras, equipes de licitação, consultorias e órgãos públicos usam a mesma base de editais, preços e prazos.",
  audiences: [
    {
      icon: Building2,
      title: "Empresas fornecedoras",
      description:
        "Da PME à grande empresa: radar pelo CNPJ, proposta cerca de 80% pronta e certidões sempre em dia.",
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
    {
      icon: Landmark,
      title: "Prefeituras e órgãos públicos",
      description:
        "Pesquisa de preços a partir de licitações semelhantes e visão dos fornecedores ativos na região, para editais mais bem estimados.",
    },
  ],
  actionLabel: "Falar com um especialista sobre o meu caso",
};

export const coverageContent: {
  eyebrow: string;
  title: string;
  description: string;
  mapCaption: string;
  clusters: readonly CoverageCluster[];
  hubs: readonly MapHub[];
} = {
  eyebrow: "Território de atuação",
  title: "Todo o estado de São Paulo, da capital ao interior",
  description:
    "Os 645 municípios paulistas e os órgãos do estado no mesmo radar.",
  mapCaption: "Os 645 municípios paulistas cobertos.",
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
    "A Qore nasceu para tornar a licitação pública acessível às empresas que hoje ficam de fora por falta de tempo e de estrutura. Começamos por São Paulo, ouvindo quem disputa licitações no dia a dia.",
} as const;

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

export const ctaBanners = {
  afterFeatures: {
    location: "after-features",
    title: "Sua próxima proposta pode sair cerca de 80% pronta",
    actionLabel: "Agendar demonstração",
  },
  afterIntegrations: {
    location: "after-integrations",
    title: "Licitações de São Paulo que combinam com o que a sua empresa vende",
    actionLabel: "Ver as licitações do meu CNPJ",
  },
} as const;

export const timeSavedContent = {
  eyebrow: "Antes e depois",
  title: "Quem tem processo ganha contrato. Quem não tem, perde prazo.",
  description:
    "São 7.650 pregões eletrônicos em São Paulo a cada 30 dias. Ninguém lê isso na mão: a Qore filtra, resume e prepara a proposta para a sua equipe disputar mais e melhor.",
  beforeLabel: "Sem a Qore",
  afterLabel: "Com a Qore",
  comparisons: [
    { task: "Oportunidades", before: "Descobertas quando o prazo já fechou", after: "Avisadas no dia da publicação" },
    { task: "Encontrar editais", before: "Oito portais abertos todo dia", after: "Um radar filtrado pelo seu CNPJ" },
    { task: "Ler o edital", before: "Horas no PDF, na véspera do prazo", after: "Resumo em minutos, com a página citada" },
    {
      task: "Montar a proposta",
      before: "Planilha e documento do zero",
      after: "Proposta cerca de 80% pronta, com a sua marca",
    },
    { task: "Certidões", before: "Conferência manual e susto na habilitação", after: "Aviso antes de cada certidão vencer" },
    { task: "Prazos", before: "Datas espalhadas em e-mails e agendas", after: "Um calendário para a equipe inteira" },
    { task: "Gestão", before: "Resultado só no fim do mês", after: "Valor ganho e taxa de vitória sempre no painel" },
  ],
} as const;
