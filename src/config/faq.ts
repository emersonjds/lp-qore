import type { FAQItem } from "@/types";

export const faqItems: readonly FAQItem[] = [
  {
    question: "A IA substitui a leitura do edital?",
    answer:
      "Não. A IA resume o edital e aponta a página de origem de cada ponto para você conferir no texto oficial. Quando algo não está no edital, ela avisa que não encontrou.",
  },
  {
    question: "Quais licitações o Qore cobre?",
    answer:
      "Órgãos estaduais e municipais de São Paulo, publicados nos principais portais. Outros estados em breve.",
  },
  {
    question: "O Qore envia a proposta ao portal?",
    answer:
      "Não. O Qore ajuda a entender o edital e a montar a proposta. O envio ao portal de compras e os lances na sessão continuam com a sua empresa.",
  },
  {
    question: "Como funciona o alerta de preço inexequível?",
    answer:
      "A plataforma compara o seu preço com o valor de referência do edital e sinaliza risco quando ele fica muito abaixo. Para obras e serviços de engenharia, a Lei 14.133/2021 (art. 59, §4º) considera inexequível a proposta abaixo de 75% do valor orçado pela administração. É um sinal para você revisar, não uma garantia.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Os planos variam conforme o porte da empresa e o volume de licitações. Fale com a gente para montar o seu.",
  },
];
