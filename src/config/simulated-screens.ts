export const editalSplitView = {
  windowTitle: "Edital PE nº 104/2026 — Secretaria da Saúde - SP • Pregão eletrônico",
  label: "Exemplo ilustrativo: edital original ao lado do resumo inteligente da Qore",
  compatibility: "96%",
  document: {
    title: "Documento original (PDF)",
    pageIndicator: "Pág. 12 de 84",
    before: "...4.1 DA QUALIFICAÇÃO ECONÔMICA. O balanço patrimonial deverá ser apresentado na forma da lei...",
    clauseNumber: "4.2.",
    clause:
      "Exigência de responsável técnico com registro no CREA ativo e certidão de acervo técnico (CAT) compatível em obras hospitalares.",
    after: [
      "4.3 As certidões emitidas pela internet terão sua autenticidade verificada pelo pregoeiro...",
      "4.4 Comprovação de patrimônio líquido não inferior a 10% do valor estimado...",
    ],
    readerLabel: "Leitor indexado",
    verifiedLabel: "Texto verificado",
  },
  summary: {
    title: "Resumo Inteligente Qore",
    count: "4 itens críticos",
    items: [
      {
        label: "Exigência técnica",
        page: "pág. 12, item 4.2",
        text: "Responsável técnico com registro no CREA ativo e certidão de acervo técnico (CAT).",
      },
      {
        label: "Prazo de entrega",
        page: "pág. 18, item 7.1",
        text: "30 dias corridos após a emissão da ordem de fornecimento, em remessa única.",
      },
      {
        label: "Garantia da proposta",
        page: "pág. 24, item 9.3",
        text: "1% do valor estimado da contratação até 24h antes da sessão pública.",
      },
    ],
    alert: {
      label: "Alerta de risco",
      page: "pág. 8",
      text: "Visita técnica facultativa com declaração formal assinada pelo responsável legal.",
    },
  },
} as const;

export const managerOverviewScreen = {
  windowTitle: "Qore • Painel do gestor",
  title: "Visão consolidada de licitações",
  period: "fev/mar 2026",
  description: "Acompanhamento dos editais qualificados no estado de São Paulo.",
  sourceBadge: "Fontes: PNCP e BEC/SP",
  kpis: [
    { label: "Licitações no radar", value: "42", note: "+6 esta semana", isHighlighted: false },
    { label: "Em análise técnica", value: "8", note: "3 com sessão próxima", isHighlighted: false },
    { label: "Propostas enviadas", value: "14", note: "Aguardando homologação", isHighlighted: true },
  ],
  modalitiesTitle: "Distribuição por modalidade",
  modalities: [
    { name: "Pregão eletrônico", share: 78, tone: "bg-primary" },
    { name: "Concorrência", share: 14, tone: "bg-sky-700" },
    { name: "Dispensa eletrônica", share: 8, tone: "bg-slate-500" },
  ],
  sessionsTitle: "Sessões públicas agendadas",
  weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  days: [
    { day: 16, sessions: 0 },
    { day: 17, sessions: 1 },
    { day: 18, sessions: 2 },
    { day: 19, sessions: 0 },
    { day: 20, sessions: 1 },
    { day: 21, sessions: -1 },
    { day: 22, sessions: -1 },
  ],
} as const;

export const radarScreen = {
  windowTitle: "Qore • Radar de oportunidades",
  title: "Radar ativo: filtro pelo CNAE da empresa",
  updatedAt: "Atualizado há 12 min",
  columns: ["Órgão", "Objeto", "Valor estimado", "Sessão", "Aderência"],
  rows: [
    {
      agency: "Prefeitura de Campinas",
      object: "Fornecimento continuado de insumos hospitalares e descartáveis",
      value: "R$ 840.000,00",
      session: "18/03/2026 09h00",
      match: "97%",
    },
    {
      agency: "Metrô SP (Companhia do Metropolitano)",
      object: "Serviços especializados de manutenção e calibração de sensores",
      value: "R$ 1.450.000,00",
      session: "24/03/2026 10h30",
      match: "91%",
    },
    {
      agency: "DAEE - Departamento de Águas e Energia",
      object: "Aquisição de equipamentos para monitoramento hidrológico",
      value: "R$ 620.000,00",
      session: "30/03/2026 14h00",
      match: "86%",
    },
  ],
} as const;

export const summaryScreen = {
  windowTitle: "Qore • Resumo do edital",
  title: "Extração das cláusulas de habilitação",
  description: "Cada exigência aparece ligada ao trecho e à página do PDF oficial.",
  clauses: [
    {
      label: "Qualificação jurídica",
      page: "Pág. 12",
      text: "Contrato social consolidado ou última alteração com poderes de representação expressos para o certame.",
    },
    {
      label: "Qualificação técnica",
      page: "Pág. 27",
      text: "Atestado de capacidade técnica de pessoa jurídica de direito público ou privado que comprove fornecimento similar.",
    },
    {
      label: "Critério econômico",
      page: "Pág. 43",
      text: "Índices de Liquidez Geral (LG) e Solvência Geral (SG) superiores a 1,00, atestados por contador habilitado.",
    },
  ],
} as const;

export const pricingScreen = {
  windowTitle: "Qore • Precificação da proposta",
  title: "Composição de custos e risco de inexequibilidade",
  description: "O preço proposto comparado ao valor estimado pelo órgão, antes do envio.",
  lines: [
    { label: "Valor estimado pelo órgão", value: "R$ 500.000,00", isHighlighted: false },
    { label: "Preço proposto pela empresa", value: "R$ 385.000,00", isHighlighted: true },
    { label: "Margem operacional líquida", value: "14,8%", isHighlighted: false },
  ],
  verdictTitle: "Nenhum sinal de preço inexequível",
  verdict: "O desconto de 23% fica dentro da faixa de referência do edital. A decisão sobre o preço final é da sua equipe.",
} as const;

export const calendarScreen = {
  windowTitle: "Qore • Calendário de prazos",
  title: "Linha do tempo do pregão",
  description: "Avisos antes de cada prazo de impugnação, esclarecimento e sessão.",
  milestones: [
    { step: "1. Impugnação", date: "12/03", note: "Até 3 dias úteis antes da abertura da sessão.", tone: "alert" },
    { step: "2. Pedido de esclarecimento", date: "13/03", note: "Enviado pelo portal eletrônico do órgão.", tone: "neutral" },
    { step: "3. Envio da proposta", date: "17/03", note: "Documentos e planilha de custos anexados.", tone: "primary" },
    { step: "4. Abertura dos lances", date: "18/03", note: "Sessão pública às 09h00 na BEC/SP.", tone: "session" },
  ],
} as const;
