---
status: Implementado
date: 2026-09-25
linear: SPA-469, SPA-473, SPA-474, SPA-475, SPA-476, SPA-477, SPA-479, SPA-480
---

# Relançamento da landing page: São Paulo, com captação de leads qualificados

## Contexto

A LP atual (`qore-lp`, Next.js 15.5, export estático, Netlify) foi desenhada em junho e está parada desde então. Ela afirma coisas que o produto não faz: números inventados, depoimentos fictícios, selos que a empresa não tem, parcerias com o governo, cobertura nacional, preços e cadastro próprio. O produto ainda não tem backend. O escopo de lançamento é **só São Paulo**.

O Emerson aprovou em 25/09/2026:

- o slogan **"A IA lê o edital. Você decide."**;
- o design "Institutional Clarity" gerado no Stitch (`docs/design/institutional-clarity.md`, com a referência visual em `docs/design/stitch-reference.png` e `stitch-reference.html`);
- o logo do Stitch (`docs/design/qore-logo-reference.png`).

Também pediu animações, um formulário que gere leads, Lighthouse 100 nas quatro categorias e acessibilidade. Na entrega, as animações ficaram só com GSAP (ScrollTrigger sob demanda) e CSS: Lottie, Motion e anime.js não entraram.

**Objetivo da página (owner, 26/09/2026):** captação de leads qualificados. Nenhum CTA fala em assinar: a página leva a um especialista e a uma demonstração com as licitações da empresa. A marca é feminina: sempre "a Qore".

A LP continua em repositório separado (`qore.com.br`), e o painel fica em `app.qore.com.br`. O motivo está no SPA-469.

## Decisões

| Tema | Decisão |
| --- | --- |
| Base | Reescrever as seções a partir do design do Stitch. As seções atuais estão presas a conteúdo inventado e a outro layout. Os primitivos de UI (`components/ui/*`) e `lib/utils.ts` são reaproveitados |
| O que sai | `stats`, `testimonials`, `pricing`, `social-proof`, `trust-badges`, `dashboard-mockup`, `features-grid`, `feature-showcase`, `cta-section`, a rota `/login`, `config/testimonials.ts`, `config/pricing.ts` e a oferta de preço no JSON-LD |
| Renderização | Server Components por padrão. JavaScript no cliente só nas ilhas interativas: menu mobile, toggle Gestor/Analista, formulário e as animações carregadas sob demanda. O FAQ usa `<details>` nativo, sem JavaScript |
| Tokens | Os do `institutional-clarity.md`, portados para `@theme` no Tailwind 4 (`globals.css`). O Tailwind via CDN e o Material Symbols do `code.html` **não entram**: os ícones vêm de `lucide-react`, que já é dependência |
| Fontes | Hanken Grotesk (600 e 700) e Inter (400, 500 e 600), auto-hospedadas em `src/app/fonts/*.woff2` (subconjunto dos glifos do português gerado com fonttools a partir de `assets/fonts/`), via `next/font/local` com `display: swap`. O build não depende do Google Fonts |
| Logo | Ícone SVG redesenhado a partir da referência (quadrado arredondado `#047857`, "Q" branco e ponto verde-claro) com o wordmark "Qore." em texto HTML e o ponto em esmeralda. O favicon e o `apple-icon` saem do mesmo SVG |
| Domínio | `NEXT_PUBLIC_SITE_URL`, padrão `https://qore.com.br`. A URL canônica, o sitemap, o `robots.txt`, o Open Graph e o JSON-LD derivam dela. A página não linka o painel: não existe `NEXT_PUBLIC_APP_URL` |
| Leads | Captação de leads qualificados para demonstração. Netlify Forms, com o `<form name="contato" data-netlify="true" netlify-honeypot="bot-field">` presente no HTML exportado. O envio usa `fetch` (POST `application/x-www-form-urlencoded` para `/`), e o estado de sucesso ou erro aparece sem recarregar a página |
| Dados da empresa | Razão social, CNPJ, fundadores, contato e DPO ainda **não existem** (SPA-478). Nenhum placeholder visível ("Nome do Cofundador", "00.000.000/0001-00"). Quem somos mostra só a missão; o rodapé não tem dados legais |
| Privacidade | A página `/privacidade` explica a finalidade do formulário, os dados coletados, a base legal (consentimento), a retenção e os direitos do titular. A identificação do controlador vem de `siteConfig.legal`; enquanto estiver vazia, a seção diz que os dados do controlador serão publicados nesta página. **Publicar a LP em produção exige preencher `siteConfig.legal`**, item de go-live |
| Imagens | Export estático sem otimizador. Não há screenshots do painel (decisão do owner): todas as telas de produto são simuladas em HTML/CSS. As únicas imagens geradas são `public/og.png` e `src/app/apple-icon.png` (`pnpm brand:assets`, com `sharp`) |
| Honestidade | As telas de produto são simuladas em HTML/CSS com dados de demonstração e não levam selo ("Exemplo ilustrativo", "Exemplo" ou similar), por decisão do owner em 26/09/2026. Nenhuma afirmação de resultado aparece fora das telas, a palavra "piloto" não entra na copy e nenhum dado jurídico é inventado. Nenhum número aparece como afirmação da empresa. A "Taxa de vitória" do painel do gestor real (calculada sobre os dados de demonstração) é permitida, a pedido do owner. Painéis que o SPA-426 lista como fabricados (itens do edital, média histórica, recomendação Go/No-Go, concorrentes) não aparecem como telas; o card de funcionalidade "Análise de concorrentes" fica, por decisão do owner em 26/09/2026 |

## Seções (ordem, conteúdo e animação)

A copy base está no SPA-474, adaptada à referência do Stitch.

**Tom (decisão do dono do produto, 25/09/2026):** a copy fala no presente, como produto em operação. A palavra "piloto" sai de toda a copy (entra na lista de termos proibidos) e o selo do hero passa a ser "Disponível para São Paulo". A cobertura continua restrita a São Paulo, porque é o que é verdade hoje.

A ordem abaixo é a de `src/app/page.tsx`. Os ids entre parênteses são as âncoras.

1. **Header fixo.** Logo, âncoras (Como funciona, Plataforma, Funcionalidades, Integrações, IA responsável, FAQ) e o CTA "Fale com um especialista" (`#contato`). No mobile, menu em `Sheet` carregado na primeira abertura, com o mesmo CTA. Fundo translúcido depois do scroll, com CSS e um observer pequeno.
2. **Hero** (`inicio`). Eyebrow "Disponível para São Paulo", H1 "A IA lê o edital. **Você decide.**", subtítulo sobre CNPJ, resumo citado e proposta. CTAs "Quero uma demonstração" e "Ver como funciona"; ponto de confiança "Alinhado à Lei 14.133/2021". À direita, o edital simulado ao lado do resumo da Qore. Entrada só com CSS; o LCP é o H1.
3. **Problema** (`problema`). Os gargalos de quem disputa licitações, com dois números de mercado públicos animados por contagem (CountUp em pt-BR, com casas decimais).
4. **Como funciona** (`como-funciona`). 01 Informe o CNPJ → 02 Receba o radar → 03 Entenda e responda. GSAP ScrollTrigger desenha a linha entre os passos, carregado com `import()` perto da viewport.
5. **Conheça a plataforma** (`plataforma`). Abas Painel do gestor, Radar de oportunidades, Resumo do edital com IA, Precificação inteligente e Calendário de prazos, com telas simuladas sem selo. Avanço automático visível, que retoma depois que o visitante escolhe uma aba. Todas as telas aparecem sem JavaScript.
6. **Funcionalidades** (`funcionalidades`). Doze cards, incluindo "Análise de concorrentes" (mantido por decisão do owner).
7. **Proposta** (`proposta`). "Sua proposta chega cerca de 80% pronta", com a tela de precificação simulada.
8. **Banner** "Sua próxima proposta pode sair cerca de 80% pronta" → "Agendar demonstração".
9. **Documentos e certidões** (`documentos`).
10. **Para cada função** (`funcoes`). Toggle Visão do gestor | Visão do analista, com mini-painéis simulados.
11. **Para quem é** (`para-quem-e`).
12. **Resultados** (`resultados`). Tempo que volta para a equipe, sem números inventados além do "cerca de 80%".
13. **Integrações** (`integracoes`). Portais de licitação e certidões consultadas.
14. **Banner** "Licitações de São Paulo que combinam com o que a sua empresa vende" → "Ver as licitações do meu CNPJ".
15. **IA com responsabilidade** (`ia-responsavel`). Quatro compromissos e o cartão de auditoria.
16. **Cobertura** (`cobertura`). Todo o estado de São Paulo, com o mapa em SVG.
17. **Quem somos** (`quem-somos`). Missão, sem nomes nem fotos.
18. **Clientes.** Só renderiza quando `config/testimonials.ts` tiver depoimentos reais; hoje a lista é vazia e a seção não aparece.
19. **FAQ** (`faq`). Seis perguntas em `<details>`/`<summary>`, com a animação de abertura em CSS. O JSON-LD `FAQPage` sai do mesmo `config/faq.ts`.
20. **Demonstração** (`contato`). Eyebrow "Demonstração", título "Veja a Qore com as licitações da sua empresa" e o lead "Conte um pouco sobre a sua empresa e um especialista mostra as licitações abertas em São Paulo para o seu segmento."
    - Campos, nesta ordem (grade de 2 colunas no desktop e 1 no mobile, alvo de 44px, fonte de 16px):
      - Nome (obrigatório);
      - E-mail corporativo (`type=email`, obrigatório);
      - Telefone ou WhatsApp (`type=tel`, máscara BR, obrigatório);
      - Cargo (select obrigatório: Dono/Sócio, Gestor comercial, Analista de licitação, Consultor, Outro);
      - Porte da empresa (select obrigatório: MEI/ME/EPP, Média empresa, Grande empresa, Consultoria/assessoria);
      - Licitações por mês (select obrigatório: Ainda não participo, 1 a 5, 6 a 20, Mais de 20);
      - Empresa ou CNPJ (opcional);
      - Mensagem (opcional);
      - Consentimento LGPD (checkbox obrigatório, desmarcado por padrão, com link para `/privacidade`).
    - Botão "Solicitar demonstração" e, abaixo, "Um especialista entra em contato em horário comercial."
    - Mensagens de erro em PT-BR, `role="status"` e foco no primeiro campo inválido. Estados do botão com transição CSS.
    - Porte e volume vão no payload enviado ao Netlify (`companySize`, `monthlyTenders`).
    - Sucesso: "Recebemos seu contato, {nome}. Vamos falar com você pelo e-mail ou WhatsApp informado."
21. **Barra fixa no mobile** "Fale com um especialista", visível depois do hero e escondida sobre o formulário.
22. **Rodapé.** Logo, "© {ano} Qore" e links para as seções, Contato e Privacidade. Nenhum link `#`, nenhuma rede social e nenhum selo.

Toda a copy, os rótulos acessíveis e o texto para leitor de tela ficam em `src/config/*`.

## Performance e acessibilidade (critério de pronto)

**Lighthouse**
- CI local com `@lhci/cli` (`staticDistDir: ./out`).
- Mobile e desktop.
- Pontuação mínima de **1.0** em Performance, Accessibility, Best Practices e SEO, exceto Performance mobile, travada em **0.96** (piso medido, aceito pelo owner). Motivo em `performance.md`.

**Orçamento**
- JS inicial ≤ 90 KB gzip.
- O GSAP fica **fora** do bundle inicial: só `import()` sob demanda. Não há Lottie nem Motion.
- Nenhum `@import` de CSS externo.
- CLS 0: toda mídia tem dimensões explícitas.

**Movimento**
- Só `transform` e `opacity`.
- `prefers-reduced-motion: reduce` desliga o GSAP, a contagem dos números e as transições de reveal.
- Todo conteúdo aparece mesmo sem JavaScript.

**Acessibilidade**
- Contraste AA.
- Foco visível com o anel duplo do guia.
- Alvos de toque ≥44px; campos com fonte ≥16px.
- Hierarquia de headings correta e landmarks (`header`, `main`, `footer`, `nav`).
- Skip link "Pular para o conteúdo".
- `lang="pt-BR"`.

**Layout**
- Zero rolagem horizontal em 375px.

## Infra e SEO

- **`netlify.toml`:**
  - build com `pnpm build`;
  - sem o redirect SPA `/* → /index.html 200`, que gerava soft-404; o 404 é o do export;
  - cabeçalhos de segurança atuais, mais HSTS e `Permissions-Policy`.
- **`app/sitemap.ts` e `app/robots.ts`** (substituem os arquivos estáticos): `/` e `/privacidade`.
- **Metadata:** título, descrição, canonical, Open Graph e Twitter card. A OG image tem 1200×630, é gerada por script a partir do logo e do slogan e fica versionada em `public/og.png`.
- **JSON-LD:** `Organization` (sem campos inventados), `WebSite` e `FAQPage`. Nada de `SoftwareApplication` com oferta de preço.
- **Pacote e docs:**
  - o `package.json` ganha os scripts `test`, `typecheck` e `lhci`;
  - o `.claude/CLAUDE.md` e os agents do repo passam a citar pnpm, não bun (SPA-479 e SPA-495).

## Testes

- **Vitest + Testing Library:**
  - validação do formulário (campos obrigatórios, e-mail, telefone BR, consentimento);
  - envio com `fetch` simulado (sucesso e erro com texto fixo nosso);
  - toggle de persona;
  - as funções de `lib/`: máscara de telefone, URLs a partir do env e geração de JSON-LD.
- **Cobertura de `src/lib` e `src/components`:** meta acima de 90% nas quatro métricas, com limiar travado no `vitest.config.ts`.
- **Checagem de conteúdo:** um teste varre o código-fonte e o HTML exportado atrás de termos proibidos: "SOC 2", "depoimento", "12.400", "5.600", "98%", "todo o Brasil", "Começar grátis", "R$ 149", "BNCP", "00.000.000", "piloto", "assine", "assinar" e "assinatura". Outro teste garante que a marca aparece sempre como "a Qore" (nunca "o Qore", "do Qore" ou "no Qore") na página, na privacidade e nos metadados.

## Fora do escopo

- Upgrade para Next 16 e deploy na Cloudflare (SPA-481).
- Dados legais reais e nomes dos fundadores (SPA-478).
- Compra do domínio e DNS: fica com o Emerson.
- Blog.

## Go-live (checklist fora do código)

1. Preencher `siteConfig.legal` (razão social, CNPJ, e-mail de contato, encarregado de dados).
2. Comprar o domínio e apontar o DNS para o Netlify; definir `NEXT_PUBLIC_SITE_URL`.
3. Ativar a detecção de formulários no Netlify e a notificação por e-mail do form `contato` (campos de qualificação `companySize` e `monthlyTenders` inclusos).
