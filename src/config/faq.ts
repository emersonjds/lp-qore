import type { FAQItem } from "@/types";

export const faqItems: readonly FAQItem[] = [
  {
    question: "A IA substitui a leitura do edital?",
    answer:
      "Não. A IA resume o edital e aponta a página de origem de cada ponto para você conferir no texto oficial. Quando algo não está no edital, ela avisa que não encontrou.",
  },
  {
    question: "Quais licitações a Qore cobre?",
    answer:
      "Órgãos estaduais e municipais de São Paulo, publicados nos principais portais. Outros estados em breve.",
  },
  {
    question: "A Qore envia a proposta ao portal?",
    answer:
      "Não. A Qore ajuda a entender o edital e a montar a proposta. O envio ao portal de compras e os lances na sessão continuam com a sua empresa.",
  },
  {
    question: "Como a proposta fica pronta?",
    answer:
      "A plataforma liga os dados da empresa, do edital e da habilitação, e a proposta chega cerca de 80% pronta. Você preenche os preços e revisa. O documento final sai com o logo da sua empresa ou, sem logo, com um modelo padrão profissional.",
  },
  {
    question: "Sou MEI, posso usar a Qore?",
    answer:
      "Pode. O MEI tem os benefícios de micro e pequena empresa nas licitações (LC 123/2006, aplicada pela Lei 14.133): itens de até R$ 80 mil são exclusivos para ME, EPP e MEI, e há preferência no desempate. Atenção ao limite de faturamento do MEI, de R$ 81 mil por ano: na demonstração, um especialista ajuda a focar nos editais de valor compatível.",
  },
];

export const faqContent = {
  eyebrow: "Tire suas dúvidas",
  title: "Perguntas frequentes",
  description: "O que a Qore faz, o que ela não faz e como começar.",
  contactPrompt: "Não achou sua dúvida?",
  contactLabel: "Fale com a gente",
} as const;
