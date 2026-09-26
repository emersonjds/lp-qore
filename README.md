# Qore — landing page

Landing do Qore para São Paulo. Next.js 15 (export estático) publicado no Netlify.

```bash
pnpm install
pnpm dev
pnpm verify
```

Spec: `docs/specs/2026-09-25-landing-relaunch/design.md`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | servidor de desenvolvimento |
| `pnpm build` | export estático em `out/`; em seguida `scripts/defer-hydration.mjs` adia os chunks do Next para depois do primeiro paint |
| `pnpm lint` / `pnpm typecheck` | ESLint e `tsc --noEmit` |
| `pnpm test` | Vitest (unidade e componentes) |
| `pnpm test:coverage` | Vitest com cobertura mínima de 91% nas 4 métricas |
| `pnpm test:export` | checagens sobre `out/`: termos proibidos, formulário Netlify, orçamento de JS, layout a 375px, conteúdo sem JavaScript (rode depois do build) |
| `pnpm lhci` | Lighthouse CI mobile e desktop; exige 1.0 em performance, acessibilidade, boas práticas e SEO |
| `pnpm verify` | lint, typecheck, cobertura, build, `test:export` e `lhci`, em ordem |

O Lighthouse CI grava os relatórios em `.lighthouseci/` (fora do git). O Playwright do `test:export` precisa do Chromium: `pnpm exec playwright install chromium`.

## Variáveis de ambiente

| Variável | Padrão | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://qore.com.br` | canonical, sitemap, robots, Open Graph e JSON-LD |

## Regerar ativos

- **Mapa do Brasil (IBGE):** `pnpm map:generate` baixa a malha de UFs da API de malhas do IBGE e reescreve `src/config/brazil-map.ts`. Precisa de rede.
- **Marca:** `pnpm brand:assets` gera `public/og.png` (1200×630) e `src/app/apple-icon.png` a partir do logo.
- **Capturas do painel:** com o qore-web na branch `developer` rodando `npm run dev` (porta 3000), `pnpm screenshots:capture` salva as telas em `docs/design/screenshots/` (referência para as telas simuladas; não entram no build). `QORE_WEB_URL` muda a origem.
- **Fontes:** Inter e Hanken Grotesk ficam em `src/app/fonts/` (subconjunto latino, woff2 variável) e são servidas pelo próprio site; o build não depende do Google Fonts.

## Netlify Forms

O formulário `contato` é detectado no HTML estático (`data-netlify="true"`, honeypot `bot-field`) e enviado por `fetch` em `application/x-www-form-urlencoded` para `/`. No painel do Netlify:

1. Ative a detecção de formulários (Forms → Enable form detection) e faça um novo deploy.
2. Confirme que o formulário `contato` aparece em Forms depois do deploy.
3. Configure as notificações (Forms → Form notifications) para o e-mail da equipe comercial.

`netlify.toml` já define o build (`pnpm build`, pasta `out`), cache dos estáticos e cabeçalhos de segurança.

## Checklist de go-live

- [ ] Preencher `siteConfig.legal` em `src/config/site.ts` (razão social, CNPJ, cidade/UF, e-mail de contato, encarregado de dados). Vazio bloqueia o go-live: a política de privacidade depende desses dados.
- [ ] Confirmar o prazo de retenção de dados da política de privacidade.
- [ ] Domínio e DNS: apontar `qore.com.br` para o site no Netlify, ativar HTTPS e ajustar `NEXT_PUBLIC_SITE_URL` se o domínio for outro.
- [ ] Notificações do Netlify Forms configuradas e testadas com um envio real.
- [ ] `pnpm verify` verde no commit publicado.
