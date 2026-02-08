import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Para micro e pequenas empresas começando em licitações.",
    price: "R$ 0",
    period: "para sempre",
    features: [
      "Busca de editais com filtros básicos",
      "Até 5 alertas personalizados",
      "Visualização de editais",
      "Histórico dos últimos 30 dias",
      "Suporte via central de ajuda",
    ],
    cta: "Criar Conta Grátis",
    highlighted: false,
  },
  {
    name: "Profissional",
    description: "Para empresas que participam ativamente de licitações.",
    price: "R$ 149",
    period: "por mês",
    features: [
      "Alertas ilimitados",
      "Análise completa de editais",
      "Gestão de propostas e documentos",
      "Relatórios de desempenho",
      "Histórico completo",
      "Suporte prioritário",
      "API de integração",
    ],
    cta: "Iniciar Teste Grátis",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Para grandes empresas e grupos com alto volume.",
    price: "Sob consulta",
    period: "personalizado para sua equipe",
    features: [
      "Tudo do Profissional",
      "Gerente de conta dedicado",
      "Integrações com ERP e sistemas internos",
      "SLA de atendimento",
      "Usuários ilimitados",
      "Treinamento da equipe",
      "Análise de concorrência avançada",
    ],
    cta: "Falar com Vendas",
    highlighted: false,
  },
];
