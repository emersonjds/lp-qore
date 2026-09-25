---
status: Aprovado
date: 2026-09-25
linear: SPA-469, SPA-473, SPA-474, SPA-475, SPA-476, SPA-477, SPA-479, SPA-480
---

# Relançamento da landing page: piloto em São Paulo com captação de leads

## Contexto

A LP atual (`qore-lp`, Next.js 15.5, export estático, Netlify) foi desenhada em junho e está parada desde então. Ela afirma coisas que o produto não faz: números inventados, depoimentos fictícios, selos que a empresa não tem, parcerias com o governo, cobertura nacional, preços e cadastro próprio. O produto ainda não tem backend. O escopo de lançamento é **só São Paulo**.

O Emerson aprovou em 25/09/2026:

- o slogan **"A IA lê o edital. Você decide."**;
- o design "Institutional Clarity" gerado no Stitch (`docs/design/institutional-clarity.md`, com a referência visual em `docs/design/stitch-reference.png` e `stitch-reference.html`);
- o logo do Stitch (`docs/design/qore-logo-reference.png`).

Também pediu animações com lottie, gsap e motion, um formulário "Fale Conosco" que gere leads, Lighthouse 100 nas quatro categorias e acessibilidade. O anime.js foi cortado por duplicar o GSAP.

A LP continua em repositório separado (`qore.com.br`), e o painel fica em `app.qore.com.br`. O motivo está no SPA-469.

## Decisões

| Tema | Decisão |
| --- | --- |
| Base | Reescrever as seções a partir do design do Stitch. As seções atuais estão presas a conteúdo inventado e a outro layout. Os primitivos de UI (`components/ui/*`) e `lib/utils.ts` são reaproveitados |
| O que sai | `stats`, `testimonials`, `pricing`, `social-proof`, `trust-badges`, `dashboard-mockup`, `features-grid`, `feature-showcase`, `cta-section`, a rota `/login`, `config/testimonials.ts`, `config/pricing.ts` e a oferta de preço no JSON-LD |
| Renderização | Server Components por padrão. JavaScript no cliente só nas ilhas interativas: menu mobile, toggle Gestor/Analista, formulário e as animações carregadas sob demanda. O FAQ usa `<details>` nativo, sem JavaScript |
| Tokens | Os do `institutional-clarity.md`, portados para `@theme` no Tailwind 4 (`globals.css`). O Tailwind via CDN e o Material Symbols do `code.html` **não entram**: os ícones vêm de `lucide-react`, que já é dependência |
| Fontes | Hanken Grotesk (600 e 700) e Inter (400, 500 e 600), via `next/font/google`, subset `latin` e `display: swap` |
| Logo | Ícone SVG redesenhado a partir da referência (quadrado arredondado `#047857`, "Q" branco e ponto verde-claro) com o wordmark "Qore." em texto HTML e o ponto em esmeralda. O favicon e o `apple-icon` saem do mesmo SVG |
| Domínio | `NEXT_PUBLIC_SITE_URL`, padrão `https://qore.com.br`. A URL canônica, o sitemap, o `robots.txt`, o Open Graph e o JSON-LD derivam dela. `NEXT_PUBLIC_APP_URL`, padrão `https://app.qore.com.br` |
| Leads | Netlify Forms, com o `<form name="contato" data-netlify="true" netlify-honeypot="bot-field">` presente no HTML exportado. O envio usa `fetch` (POST `application/x-www-form-urlencoded` para `/`), e o estado de sucesso ou erro aparece sem recarregar a página |
| Dados da empresa | Razão social, CNPJ, fundadores, contato e DPO ainda **não existem** (SPA-478). Nenhum placeholder visível ("Nome do Cofundador", "00.000.000/0001-00"). Quem somos mostra só a missão; o rodapé não tem dados legais |
| Privacidade | A página `/privacidade` explica a finalidade do formulário, os dados coletados, a base legal (consentimento), a retenção e os direitos do titular. A identificação do controlador vem de `siteConfig.legal`; enquanto estiver vazia, a seção diz que os dados do controlador serão publicados nesta página. **Publicar a LP em produção exige preencher `siteConfig.legal`**, item de go-live |
| Imagens | Export estático sem otimizador. As screenshots do painel são geradas uma vez, a partir do `qore-web` com os dados de demonstração, e convertidas para AVIF e WebP com `sharp` (devDependency, script em `scripts/`). Servidas com `<picture>`, `width`/`height` explícitos e `loading="lazy"`, exceto acima da dobra |
| Honestidade | Toda tela de produto e todo número exibido dentro dela leva o selo **"Tela ilustrativa"**. Nenhum número aparece como afirmação da empresa. Painéis que o SPA-426 lista como fabricados (itens do edital, média histórica, recomendação Go/No-Go, concorrentes, win rate) não aparecem |

## Seções (ordem, conteúdo e animação)

A copy base está no SPA-474, adaptada à referência do Stitch.

**Tom (decisão do dono do produto, 25/09/2026):** a copy fala no presente, como produto em operação. A palavra "piloto" sai de toda a copy (entra na lista de termos proibidos) e o selo do hero passa a ser "Disponível para São Paulo". A cobertura continua restrita a São Paulo, porque é o que é verdade hoje.

1. **Header fixo.**
   - Logo, âncoras (Como funciona, Plataforma, IA responsável, FAQ) e o CTA "Fale com a gente" (`#contato`).
   - No mobile, menu em `Sheet`.
   - Fundo translúcido depois do scroll, só com CSS e um observer pequeno.
2. **Hero.**
   - Eyebrow "Disponível para São Paulo" e o H1 "A IA lê o edital. **Você decide.**".
   - Subtítulo: "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança."
   - CTAs "Fale com a gente" e "Ver como funciona", com o microcopy "Sem cadastro e sem cartão".
   - À direita, um card HTML/CSS "Resumo Inteligente Qore" com os trechos citados ("pág. 12") e o selo "Tela ilustrativa".
   - **Só CSS** (entrada com `@keyframes` em `opacity`/`transform`, respeitando `prefers-reduced-motion`). O LCP é o H1.
3. **Problema.** Três cards sem números: editais espalhados em vários portais; 80 páginas lidas na véspera; proposta desclassificada por preço ou documento faltando. Reveal com CSS e um IntersectionObserver.
4. **Como funciona.**
   - 01 Informe o CNPJ → 02 Receba o radar → 03 Entenda e responda.
   - **GSAP ScrollTrigger** desenha a linha entre os passos.
   - Carregado com `import()` quando a seção se aproxima da viewport.
5. **Conheça a plataforma.**
   - Abas: Painel do gestor, Radar, Busca, Precificação e Calendário.
   - Screenshot real do painel com legenda e selo "Tela ilustrativa".
   - No desktop, a troca de tela usa **GSAP** (pin com crossfade); no mobile, abas simples.
   - Imagens AVIF/WebP carregadas sob demanda.
6. **IA com responsabilidade.**
   - Quatro compromissos: cita a fonte; diz "não encontrado no edital"; sugere, e você decide; você envia a proposta, não a IA.
   - Ilustração **Lottie** (edital → trecho destacado → resumo) com `@lottiefiles/dotlottie-web`, carregada sob demanda e pausada fora da viewport.
   - O arquivo de animação é autoral e versionado em `public/animations/`.
7. **Para cada função.**
   - Toggle Visão do gestor | Visão do analista com **Motion** (`LazyMotion` + `domAnimation`).
   - Cada visão mostra um mini-painel com o selo "Exemplo ilustrativo". Os valores dali não são afirmações da empresa.
8. **Cobertura.** "Começamos por São Paulo…" com o mapa de SP em SVG (reaproveitando o traçado do `stitch-reference.html`) e o convite "Atua em outro estado? Deixe seu contato". Hover sutil só com CSS.
9. **Quem somos.** Parágrafo de missão, sem nomes nem fotos.
10. **FAQ.** Cinco perguntas (SPA-474) em `<details>`/`<summary>`, com a animação de abertura em CSS. O JSON-LD `FAQPage` sai do mesmo `config/faq.ts`.
11. **Fale Conosco** (`#contato`).
    - Campos:
      - Nome (obrigatório);
      - E-mail corporativo (`type=email`, obrigatório);
      - Telefone/WhatsApp (`type=tel`, máscara BR, obrigatório);
      - Cargo (select obrigatório: Dono/Sócio, Gestor comercial, Analista de licitação, Consultor, Outro);
      - Empresa ou CNPJ (opcional);
      - Mensagem (opcional);
      - Consentimento LGPD (checkbox obrigatório, desmarcado por padrão, com link para `/privacidade`).
    - Mensagens de erro em PT-BR, `aria-live` e foco no primeiro campo inválido.
    - Estados do botão (enviando, enviado) com **Motion**.
    - Sucesso: "Recebemos seu contato, {nome}. Vamos falar com você pelo e-mail ou WhatsApp informado."
12. **Rodapé.** Logo, "© {ano} Qore", links para Como funciona, FAQ, Contato e Privacidade. Nenhum link `#`, nenhuma rede social e nenhum selo.

## Performance e acessibilidade (critério de pronto)

**Lighthouse**
- CI local com `@lhci/cli` (`staticDistDir: ./out`).
- Mobile e desktop.
- Pontuação mínima de **1.0** em Performance, Accessibility, Best Practices e SEO.

**Orçamento**
- JS inicial ≤ 90 KB gzip.
- GSAP, Lottie e Motion ficam **fora** do bundle inicial: só `import()` sob demanda.
- Nenhum `@import` de CSS externo.
- CLS 0: toda mídia tem dimensões explícitas.

**Movimento**
- Só `transform` e `opacity`.
- `prefers-reduced-motion: reduce` desliga GSAP, Lottie (fica no primeiro quadro) e as transições de reveal.
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
- **Checagem de conteúdo:** um teste varre o HTML exportado atrás de termos proibidos: "SOC 2", "depoimento", "12.400", "5.600", "98%", "todo o Brasil", "Começar grátis", "R$ 149", "BNCP" e "00.000.000".

## Fora do escopo

- Upgrade para Next 16 e deploy na Cloudflare (SPA-481).
- Dados legais reais e nomes dos fundadores (SPA-478).
- Compra do domínio e DNS: fica com o Emerson.
- Blog.

## Go-live (checklist fora do código)

1. Preencher `siteConfig.legal` (razão social, CNPJ, e-mail de contato, encarregado de dados).
2. Comprar o domínio e apontar o DNS para o Netlify; definir `NEXT_PUBLIC_SITE_URL`.
3. Ativar a detecção de formulários no Netlify e a notificação por e-mail do form `contato`.
