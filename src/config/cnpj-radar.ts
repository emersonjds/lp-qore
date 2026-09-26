export const cnpjRadarContent = {
  eyebrow: "Radar grátis",
  title: "Digite o CNPJ e veja o que está aberto em SP para a sua empresa",
  description:
    "A Qore cruza a atividade da empresa na Receita Federal com os pregões eletrônicos publicados no PNCP. Leva segundos e não pede cadastro.",
} as const;

export const cnpjRadarCopy = {
  cnpjLabel: "CNPJ da empresa",
  cnpjPlaceholder: "Digite os 14 números",
  invalidCnpj: "Informe um CNPJ válido, com 14 números.",
  search: { idle: "Ver licitações abertas", searching: "Consultando Receita e PNCP…" },
  openInState: (total: string) => `Hoje há ${total} pregões eletrônicos com proposta aberta em SP.`,
  matches: (count: number) =>
    count === 1 ? "1 pregão aberto combina com a sua atividade" : `${count} pregões abertos combinam com a sua atividade`,
  sampleNote: "Amostra de 150 editais do PNCP, filtrada pelas palavras da sua atividade na Receita.",
  noMatch:
    "Nenhum edital da amostra usa as palavras exatas da sua atividade. A Qore também busca por termos correlatos em todo o estado, e aí a lista costuma crescer.",
  closesAt: "Propostas até",
  gateTitle: "Receba a lista completa no seu e-mail",
  gateDescription:
    "Um especialista monta o radar da sua empresa com busca correlata em todo o estado e envia a lista em horário comercial.",
  labels: { name: "Nome", email: "E-mail corporativo" },
  consentLead: "Autorizo a Qore a usar meus dados para responder este contato, conforme a",
  privacyPolicyLabel: "Política de Privacidade",
  honeypotLabel: "Não preencha este campo: ",
  submit: { idle: "Receber a lista completa", submitting: "Enviando…" },
  submitError: "Não conseguimos enviar agora. Verifique a conexão e tente de novo em alguns minutos.",
  success: (name: string) =>
    `Pronto, ${name.trim()}. Um especialista envia a lista completa para o seu e-mail em horário comercial.`,
} as const;
