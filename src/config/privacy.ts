export const privacyContent = {
  title: "Política de Privacidade",
  description: "Como a Qore usa os dados enviados pelo formulário de demonstração.",
  lastUpdated: "Última atualização: 26 de setembro de 2026.",
  sections: {
    purpose: {
      title: "Para que usamos seus dados",
      text: "Usamos os dados do formulário de demonstração apenas para responder o seu contato e apresentar a Qore. Não vendemos seus dados nem os usamos para publicidade.",
    },
    collectedData: {
      title: "Quais dados coletamos",
      items: [
        "Nome",
        "E-mail",
        "Telefone ou WhatsApp",
        "Cargo",
        "Porte da empresa",
        "Licitações por mês",
        "Empresa ou CNPJ, se você informar",
        "Mensagem, se você escrever",
      ],
      processor: "O envio é processado pelo Netlify, serviço que hospeda este site.",
      radar:
        "No radar grátis, o CNPJ digitado é consultado direto do seu navegador na BrasilAPI (dados públicos da Receita Federal) e no PNCP (Portal Nacional de Contratações Públicas). Se você pedir a lista completa, recebemos nome, e-mail, CNPJ, atividade da empresa e quantas licitações combinaram.",
    },
    legalBasis: {
      title: "Base legal",
      text: "Consentimento (art. 7º, I, da Lei 13.709/2018, LGPD), que você dá ao marcar a caixa de autorização no formulário. Você pode retirar o consentimento a qualquer momento.",
    },
    retention: {
      title: "Por quanto tempo guardamos",
      text: "Guardamos os dados enquanto durar a conversa com você e por até 12 meses depois do último contato. Depois disso, apagamos.",
    },
    rights: {
      title: "Seus direitos",
      lead: "Pelo art. 18 da LGPD, você pode pedir:",
      items: [
        "confirmação de que tratamos seus dados e acesso a eles;",
        "correção de dados incompletos ou desatualizados;",
        "anonimização, bloqueio ou eliminação de dados;",
        "portabilidade;",
        "informação sobre com quem compartilhamos seus dados;",
        "revogação do consentimento.",
      ],
      channel: "Para exercer esses direitos, use o canal indicado na seção abaixo.",
    },
    controller: { title: "Quem é o controlador" },
  },
} as const;
