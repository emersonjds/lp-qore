import { Files, FileSearch, FileX, Quote, SearchX, Send, SlidersHorizontal } from "lucide-react";
import type { CoverageRegion, HowItWorksStep, IconCard, MapHub, Persona, PlatformTab, SummaryItem } from "@/types";

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

export const responsibleAiContent: { eyebrow: string; title: string; description: string; commitments: readonly IconCard[] } = {
  eyebrow: "IA responsável",
  title: "IA com responsabilidade",
  description:
    "No piloto, a IA vai trabalhar como apoio da sua equipe: ela lê, organiza e aponta a fonte. A decisão continua sua.",
  commitments: [
    {
      icon: Quote,
      title: "Cita a fonte",
      description: "Cada ponto do resumo vai indicar a página e o item do edital de onde saiu.",
    },
    {
      icon: SearchX,
      title: "Diz “não encontrado no edital”",
      description: "Quando o edital não trouxer a informação, a IA vai dizer isso em vez de preencher a lacuna.",
    },
    {
      icon: SlidersHorizontal,
      title: "Sugere, e você decide",
      description: "A IA vai organizar as informações. Participar ou não, e por qual preço, é decisão da sua equipe.",
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
  title: "Feito para quem decide e para quem prepara a proposta",
  personas: [
    {
      id: "manager",
      toggleLabel: "Visão do gestor",
      title: "Para quem decide",
      description: "Veja o que está em disputa, os prazos da semana e a carga da equipe sem abrir planilha.",
      metrics: [
        { label: "Licitações em análise", value: "12", detail: "3 com sessão nesta semana" },
        { label: "Valor em disputa", value: "R$ 1,8 mi", detail: "Soma das propostas em andamento" },
        { label: "Prazos da semana", value: "4", detail: "1 pedido de esclarecimento vence hoje" },
        { label: "Propostas enviadas no mês", value: "5", detail: "Todas revisadas pela equipe" },
      ],
    },
    {
      id: "analyst",
      toggleLabel: "Visão do analista",
      title: "Para quem prepara a proposta",
      description: "Saiba o que ler primeiro, quais certidões vencem e o que falta para enviar.",
      metrics: [
        { label: "Fila do dia", value: "3 editais", detail: "1 com prazo de impugnação hoje" },
        { label: "Certidões", value: "1 vence em 10 dias", detail: "CND federal" },
        { label: "Pontos sem resposta no edital", value: "2", detail: "Marcados como não encontrados" },
        { label: "Minuta da proposta", value: "Pronta para revisão", detail: "Falta anexar a declaração de ME/EPP" },
      ],
    },
  ],
};

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
    "Nesta fase do piloto, acompanhamos licitações de órgãos estaduais e municipais paulistas. Outros estados vêm depois.",
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
  title: "Quer ver o Qore com as licitações da sua empresa?",
  description: "Conte um pouco sobre a sua empresa. A gente responde pelo e-mail ou WhatsApp que você informar.",
  highlights: [
    "Conversa com quem está construindo o produto",
    "Um olhar sobre editais abertos em São Paulo no seu segmento",
    "Convite para participar do piloto em São Paulo",
  ],
} as const;
