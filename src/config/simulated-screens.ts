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
