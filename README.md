# Qore: landing page

Site institucional da **Qore**, plataforma de licitações públicas com IA para empresas que vendem ao governo em São Paulo. O objetivo da página é **gerar leads qualificados**: o visitante entende o produto, vê como ele funciona em telas simuladas e pede um diagnóstico pelo formulário, que chega à equipe comercial pelo Netlify Forms.

- **Produção:** `https://qore.com.br` (definido por `NEXT_PUBLIC_SITE_URL`)
- **Painel do produto:** repositório `Qore-licitacoes/qore-fe`, publicado em `app.qore.com.br`
- **Spec da página:** [`docs/specs/2026-09-25-landing-relaunch/design.md`](docs/specs/2026-09-25-landing-relaunch/design.md)
- **Guia visual:** [`docs/design/institutional-clarity.md`](docs/design/institutional-clarity.md) (paleta, tipografia e componentes)

---

## Sumário

1. [Stack](#stack)
2. [Como rodar](#como-rodar)
3. [Comandos](#comandos)
4. [Estrutura do projeto](#estrutura-do-projeto)
5. [Onde editar o conteúdo](#onde-editar-o-conteúdo)
6. [Formulário de leads (Netlify Forms)](#formulário-de-leads-netlify-forms)
7. [Qualidade: testes, cobertura e Lighthouse](#qualidade-testes-cobertura-e-lighthouse)
8. [Variáveis de ambiente](#variáveis-de-ambiente)
9. [Regerar ativos](#regerar-ativos)
10. [Deploy](#deploy)
11. [Checklist de go-live](#checklist-de-go-live)
12. [Convenções](#convenções)

---

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 15 (App Router) com `output: "export"`: o build gera um site 100% estático em `out/` |
| UI | React 19, Tailwind CSS 4 (tokens em `src/app/globals.css`), primitivos shadcn/ui sobre Radix, ícones `lucide-react` |
| Animação | Web Animations API nativa (zero biblioteca), disparada por `IntersectionObserver`, mais animações em CSS. Só `transform` e `opacity`, respeitando `prefers-reduced-motion` |
| Fontes | Inter e Hanken Grotesk servidas pelo próprio site (`next/font/local`), em subconjunto para português |
| Linguagem | TypeScript em modo estrito |
| Testes | Vitest + Testing Library (unidade e componentes), Playwright (checagens do HTML exportado), Lighthouse CI |
| Hospedagem | Netlify (site estático + Netlify Forms) |
| Gerenciador | pnpm 10 |

A página é composta por **Server Components**. JavaScript no navegador só existe nas ilhas interativas: menu mobile, abas da plataforma, troca entre as visões de gestor e analista, formulário e animações. Todo o conteúdo continua legível com JavaScript desligado.

---

## Como rodar

Pré-requisitos: Node.js 20 ou superior e pnpm 10 (`corepack enable` ativa a versão certa).

```bash
pnpm install        # instala as dependências
pnpm dev            # abre em http://localhost:3000
```

Para gerar o site estático e conferir o resultado final:

```bash
pnpm build          # gera out/
npx serve out       # serve o que vai para produção
```

As checagens com navegador (`test:export` e `lhci`) usam o Chromium do Playwright, instalado uma vez com:

```bash
pnpm exec playwright install chromium
```

Todas as execuções de navegador rodam em modo headless.

---

## Comandos

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento com recarga automática |
| `pnpm build` | Gera o site estático em `out/` |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `pnpm test` | Testes de unidade e de componentes (Vitest) |
| `pnpm test:coverage` | Os mesmos testes, exigindo **91% de cobertura** em statements, branches, functions e lines |
| `pnpm test:export` | Checagens sobre o HTML de `out/` (rode depois do `build`), descritas na seção de qualidade |
| `pnpm lhci` | Lighthouse CI em mobile e desktop, com as notas mínimas da seção de qualidade |
| `pnpm verify` | Roda tudo em ordem: lint, typecheck, cobertura, build, `test:export` e `lhci`. **Deve passar antes de publicar** |
| `pnpm brand:assets` | Regera a imagem de compartilhamento e o ícone da Apple |

---

## Estrutura do projeto

```text
src/
├── app/                    # Rotas (App Router)
│   ├── page.tsx            # Home: monta as seções na ordem da página
│   ├── privacidade/        # Política de privacidade
│   ├── layout.tsx          # HTML base, fontes, metadados, header e rodapé
│   ├── sitemap.ts          # sitemap.xml gerado no build
│   ├── robots.ts           # robots.txt gerado no build
│   ├── fonts/              # Fontes em woff2 (subconjunto) e licenças OFL
│   └── globals.css         # Tokens do design system e animações em CSS
├── components/
│   ├── sections/           # Uma seção da página por arquivo (hero, FAQ, contato…)
│   ├── simulated-screens/  # Telas simuladas do produto (HTML, sem capturas de tela)
│   ├── motion/             # Componentes de animação (contagem de números etc.)
│   ├── layout/             # Container, wrappers de seção, observers
│   ├── privacy/            # Blocos da página de privacidade
│   └── ui/                 # Primitivos (botão, input, sheet), ajustados para 44px e foco visível
├── config/                 # TODO o texto e os dados da página (ver seção abaixo)
├── hooks/                  # Hooks de React (ex.: detectar quando algo entra na tela)
├── lib/                    # Lógica pura: validação do formulário, telefone, URLs, SEO
├── test-utils/             # Mocks e utilitários de teste
└── types/                  # Tipos compartilhados
scripts/                    # Geração de ativos de marca, medição de JS
tests/
├── unit/                   # Testes de configuração do projeto (tokens, Netlify, conteúdo)
└── export/                 # Testes que rodam sobre o HTML exportado em out/
docs/
├── specs/                  # Spec, plano e análise de performance da página
└── design/                 # Guia visual e referência do Stitch
```

Cada pasta com código testado tem uma subpasta `__tests__/` com os testes daquele código.

---

## Onde editar o conteúdo

Nenhum texto fica escrito dentro dos componentes: **toda a copy vive em `src/config/`**. Para mudar o que aparece na página, edite o arquivo correspondente:

| Arquivo | Conteúdo |
| --- | --- |
| `home-content.ts` | Hero, como funciona, abas da plataforma, para quem é, seção de contato |
| `cnpj-radar.ts` | Textos do radar grátis por CNPJ (consulta Receita + PNCP e captura o lead no formulário `radar`) |
| `simulated-screens.ts` | Dados exibidos nas telas simuladas (hero, abas da plataforma, visões de gestor e analista) |
| `faq.ts` | Perguntas frequentes (alimenta também o JSON-LD `FAQPage`) |
| `contact-form.ts` | Rótulos, opções (cargo, porte, licitações por mês) e mensagens do formulário |
| `privacy.ts` | Texto da política de privacidade |
| `navigation.ts` | Menu, rodapé e rótulo dos CTAs |
| `site.ts` | Nome, URL, descrição e **dados legais** da empresa |
| `accessible-labels.ts` | Textos lidos por leitores de tela |

Regras de conteúdo, verificadas por teste:

- **Texto no presente**, como produto em operação. Palavras como "piloto" estão na lista de termos proibidos (`tests/forbidden-terms.ts`).
- **A marca é sempre "a Qore"**, no feminino.
- **Números fora das telas simuladas precisam de fonte.** Exemplo: os dados do PNCP com a data da consulta. Nenhum resultado inventado sobre clientes, percentuais de ganho ou comparações de mercado.
- **Depoimentos só entram com autorização por escrito** do cliente (campo `authorizedAt`).

---

## Formulário de leads (Netlify Forms)

O formulário `contato` coleta:

- **Obrigatórios:** nome, e-mail corporativo, telefone/WhatsApp, cargo, porte da empresa, licitações por mês e consentimento LGPD.
- **Opcionais:** empresa ou CNPJ e mensagem.

Os campos de porte e volume de licitações existem para a equipe comercial priorizar os leads mais qualificados.

**Como funciona:**
- **Detecção:** o formulário está no HTML estático com `data-netlify="true"` e um campo antispam oculto (`bot-field`). O Netlify o detecta no deploy.
- **Envio:** com JavaScript, vai por `fetch` (POST `application/x-www-form-urlencoded` para `/`) e mostra a confirmação sem recarregar a página. Sem JavaScript, funciona como POST nativo do navegador.
- **Erros:** as mensagens são sempre textos nossos, fixos, em português. A resposta do servidor nunca aparece na tela.

**Configuração no painel do Netlify:**

1. **Forms → Enable form detection** e faça um novo deploy.
2. Confirme que o formulário **`contato`** aparece em **Forms**.
3. Em **Forms → Form notifications**, configure o envio para o e-mail da equipe comercial.
4. Faça um envio real de teste e confirme o recebimento.

---

## Qualidade: testes, cobertura e Lighthouse

| Camada | O que garante |
| --- | --- |
| **Vitest** (`pnpm test`) | Lógica do formulário, máscaras, SEO, comportamento das ilhas (abas, toggle, menu), estados com movimento reduzido e ausência de termos proibidos |
| **Cobertura** (`pnpm test:coverage`) | Mínimo de 91% nas quatro métricas, travado em `vitest.config.ts`. Hoje está em ~96% |
| **Export** (`pnpm test:export`) | Sobre o `out/` real: termos proibidos no HTML, formulário detectável pelo Netlify, orçamento de JavaScript inicial, zero rolagem horizontal em 375px, alvos de toque de 44px, conteúdo legível sem JavaScript e página 404 |
| **Lighthouse CI** (`pnpm lhci`) | Três execuções por página, em mobile e desktop |

Notas mínimas do Lighthouse:

| | Performance | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 1,00 | 1,00 | 1,00 | 1,00 |
| Mobile | **0,96** | 1,00 | 1,00 | 1,00 |

O piso de 0,96 em performance mobile foi medido e aceito. A simulação de mobile do Lighthouse contabiliza todo o runtime do React/Next no LCP. A análise completa, incluindo as alternativas testadas e descartadas, está em [`docs/specs/2026-09-25-landing-relaunch/performance.md`](docs/specs/2026-09-25-landing-relaunch/performance.md).

---

## Variáveis de ambiente

| Variável | Padrão | Para que serve |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://qore.com.br` | URL canônica, sitemap, robots, Open Graph e JSON-LD. O `netlify.toml` fixa `https://qorelicitacoes.netlify.app` até o domínio próprio entrar no ar |

Não há segredos no projeto: o site é estático e o formulário é tratado pelo Netlify.

---

## Regerar ativos

### Imagem de compartilhamento e ícone

```bash
pnpm brand:assets
```

Gera `public/og.png` (1200×630, usada ao compartilhar o link) e `src/app/apple-icon.png` a partir do logo em `src/app/icon.svg`.

### Fontes

Inter (pesos 400 a 600) e Hanken Grotesk (600 a 700) ficam em `src/app/fonts/`, em subconjunto só com os caracteres usados em português. O resultado tem cerca de 41 KB no total. As licenças SIL OFL 1.1 estão em `Inter-OFL.txt` e `HankenGrotesk-OFL.txt`, e as fontes originais completas em `assets/fonts/`.

Para regerar, com o [uv](https://docs.astral.sh/uv/) instalado (a ferramenta `fonttools` não entra no `package.json`):

```bash
UNICODES="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026"
FEATURES="kern,liga,calt,ccmp,locl,mark,mkmk,tnum"
subset () {
  uvx --from fonttools --with brotli fonttools varLib.instancer "assets/fonts/$1.woff2" "wght=$2" -o "/tmp/$1.ttf" -q
  uvx --from fonttools --with brotli pyftsubset "/tmp/$1.ttf" --unicodes="$UNICODES" --layout-features="$FEATURES" --flavor=woff2 --output-file="src/app/fonts/$1.woff2"
}
subset inter-latin 400:600
subset hanken-grotesk-latin 600:700
```

Se algum texto novo usar um caractere fora desse intervalo, o `pnpm test:export` falha. Nesse caso, amplie `UNICODES` e a lista do teste juntos.

---

## Deploy

O deploy é automático pelo Netlify a partir da branch **`main`** deste repositório (`Qore-licitacoes/qore-lp`). O `netlify.toml` já define:

- **Build:** `pnpm build`, com saída em `out/`;
- **Cache:** longo e imutável para os arquivos estáticos do Next (`/_next/static/*`);
- **Segurança:** cabeçalhos HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`;
- **404:** a página própria do export, sem redirecionamento para a home, o que evita soft-404 no Google.

Fluxo de trabalho:

```bash
git switch -c feat/minha-mudanca     # trabalhe numa branch
pnpm verify                          # tudo verde antes de integrar
git switch main && git merge --no-ff feat/minha-mudanca
git push origin main                 # publica
```

---

## Checklist de go-live

- [ ] **Dados legais:** preencher `siteConfig.legal` em `src/config/site.ts` (razão social, CNPJ, cidade/UF, e-mail de contato e encarregado de dados). Enquanto estiverem vazios, o rodapé não mostra CNPJ e a política de privacidade exibe um aviso no lugar dos dados do controlador. **Não publique em produção sem isso.**
- [ ] **Domínio:** apontar o DNS de o domínio próprio para o Netlify, ativar HTTPS e trocar `NEXT_PUBLIC_SITE_URL` em `netlify.toml` (hoje `https://qorelicitacoes.netlify.app`, provisório) para o domínio próprio.
- [ ] **Formulário:** notificações do Netlify Forms configuradas e testadas com um envio real.
- [ ] **`pnpm verify`** verde no commit publicado.

A retenção dos dados de contato é de 12 meses, já definida e publicada na política de privacidade.

---

## Convenções

- **Commits:** Conventional Commits em inglês (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`, `style:`), um contexto por commit.
- **Código:** identificadores em inglês e textos da interface em português. TypeScript sem `any`, exports nomeados e arrow functions.
- **Testes:** ficam em `__tests__/` ao lado do código testado. Toda mudança de comportamento começa por um teste que falha.
- **Layout:** mobile first (375px), alvos de toque de pelo menos 44px, campos com fonte de pelo menos 16px, zero rolagem horizontal.
- **Movimento:** só `transform` e `opacity`, com `prefers-reduced-motion` respeitado. Sem JavaScript, o conteúdo aparece no estado final.
- **Dependências:** nenhuma nova sem necessidade real. Animações pesadas só via `import()` sob demanda.
