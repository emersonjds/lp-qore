export const contactRoles = [
  "Dono/Sócio",
  "Gestor comercial",
  "Analista de licitação",
  "Consultor",
  "Outro",
] as const;

export const companySizes = ["MEI/ME/EPP", "Média empresa", "Grande empresa", "Consultoria/assessoria"] as const;

export const monthlyTenderRanges = ["Ainda não participo", "1 a 5", "6 a 20", "Mais de 20"] as const;

export const contactFormCopy = {
  labels: {
    name: "Nome",
    email: "E-mail corporativo",
    phone: "Telefone ou WhatsApp",
    role: "Cargo",
    companySize: "Porte da empresa",
    monthlyTenders: "Licitações por mês",
    company: "Empresa ou CNPJ",
    message: "Mensagem",
  },
  phonePlaceholder: "(11) 98765-4321",
  selectPlaceholder: "Selecione",
  optionalSuffix: " (opcional)",
  honeypotLabel: "Não preencha este campo: ",
  consentLead: "Autorizo a Qore a usar meus dados para responder este contato, conforme a",
  privacyPolicyLabel: "Política de Privacidade",
  responseTime: "Um especialista entra em contato em horário comercial.",
  reviewFields: "Revise os campos destacados.",
  sending: "Enviando seu contato…",
  submit: {
    idle: "Solicitar demonstração",
    submitting: "Enviando…",
    success: "Enviado",
    error: "Solicitar demonstração",
  },
} as const;
