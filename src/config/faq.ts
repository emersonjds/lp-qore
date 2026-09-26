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
    question: "Como funciona o alerta de preço inexequível?",
    answer:
      "A plataforma compara o seu preço com o valor de referência do edital e sinaliza risco quando ele fica muito abaixo. Para obras e serviços de engenharia, a Lei 14.133/2021 (art. 59, §4º) considera inexequível a proposta abaixo de 75% do valor orçado pela administração. É um sinal para você revisar, não uma garantia.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O valor varia conforme o porte da empresa e o volume de licitações. Na demonstração, um especialista apresenta o plano certo para a sua operação.",
  },
];

export const faqContent = {
  eyebrow: "Tire suas dúvidas",
  title: "Perguntas frequentes",
  description: "O que a Qore faz, o que ela não faz e como começar.",
  contactPrompt: "Não achou sua dúvida?",
  contactLabel: "Fale com a gente",
} as const;
