import type { FAQItem } from "@/types";

export const faqItems: readonly FAQItem[] = [
  {
    question: "A IA substitui a leitura do edital?",
    answer:
      "Não. No piloto, a IA vai resumir o edital e indicar a página de origem de cada ponto, para você conferir no texto oficial antes de decidir. Quando algo não estiver no edital, ela vai dizer que não encontrou.",
  },
  {
    question: "Quais licitações o Qore cobre?",
    answer:
      "Começamos por São Paulo: órgãos estaduais e municipais paulistas. Outros estados vêm depois. Se a sua empresa atua fora de SP, deixe seu contato e avisamos.",
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
      "Ainda não publicamos preço. Estamos no piloto em São Paulo com um grupo pequeno de empresas. Fale com a gente para saber se a sua empresa pode participar.",
  },
];
