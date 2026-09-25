# Landing Relaunch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Relaunch `qore-lp` as an honest, São Paulo–only pilot landing page ("A IA lê o edital. Você decide.") in the Institutional Clarity design, with a Netlify Forms lead form, a privacy page, lazy animation islands and Lighthouse 1.0 in all four categories on mobile and desktop.

**Architecture:** Next.js 15.5 App Router static export (`out/`), Server Components by default. Client JavaScript only in small islands (mobile menu, scroll-state and reveal observers, platform tabs, persona toggle, contact form, animation loaders). GSAP, dotLottie and Motion features load with `import()` when their section approaches the viewport. All copy lives in `src/config/*`; pure logic lives in `src/lib/*` and is unit-tested; exported HTML is checked by a post-build suite and by Lighthouse CI.

**Tech Stack:** Next.js 15.5, React 19.1, TypeScript strict, Tailwind 4 (`@theme`), shadcn/ui primitives on `radix-ui`, `lucide-react`, `motion` (LazyMotion), `gsap` + ScrollTrigger, `@lottiefiles/dotlottie-web`, Vitest + Testing Library + jsdom, `@lhci/cli`, `sharp`, `playwright`, pnpm, Netlify.

**Spec:** `docs/specs/2026-09-25-landing-relaunch/design.md` (source of truth). Design tokens: `docs/design/institutional-clarity.md`. Visual reference: `docs/design/stitch-reference.png` / `.html`. Logo reference: `docs/design/qore-logo-reference.png`.

## Global Constraints

- Branch `feat/landing-relaunch`. Confirm with `git rev-parse --abbrev-ref HEAD` before every task. Never push.
- Every implementing task starts by invoking the `tdd` skill. Cycle is red → green, one slice at a time; paste the literal failing output and the literal passing output in the task report. No refactor step inside the loop.
- The seams listed in each task are the pre-agreed seams. Do not add tests at other seams.
- Before each commit: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` must pass (from Part 1 on; `typecheck`/`test` scripts are created in Part 1).
- Commits: micro commits, English Conventional Commits, message states purpose. Author and committer are Emerson: always commit with `git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "..."`. No `Co-Authored-By`, no emoji, no mention of AI/Claude/agents anywhere.
- New devDependencies allowed ONLY: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `@vitest/coverage-v8`, `@lhci/cli`, `sharp`, `playwright`. New dependencies allowed ONLY: `gsap`, `@lottiefiles/dotlottie-web`. `motion` is already installed. Nothing else.
- TypeScript strict, no `any`, no `as unknown as`, no unnecessary casts (`satisfies` or annotation first). Named exports, arrow functions (Next.js route files `page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts` keep a `default` export because the framework requires it — declare an arrow const and `export default` it). Early return. No abbreviations in identifiers. Identifiers in English; all UI text in PT-BR.
- Mobile first at 375px: zero horizontal page scroll, touch targets ≥ 44px, form controls with font-size ≥ 16px.
- Animations only on `transform` and `opacity`. No `transition-colors`/`transition-all` in new code. `prefers-reduced-motion: reduce` disables GSAP, keeps Lottie on its first frame, disables reveal transitions.
- All content visible without JavaScript (interactive islands render every panel before hydration).
- Server Components by default; `"use client"` only in islands.
- No comment that restates code. A comment survives only when it states a fact the code cannot show.
- Honesty: every product screen and every number inside one carries the seal "Tela ilustrativa" (screens) or "Exemplo ilustrativo" (persona mini-panels). Never show: win rate / "Taxa de vitória", "média histórica", Go/No-Go recommendation, competitors, extracted edital item lists presented as fact. No prices, no testimonials, no seals, no government partnerships, no national coverage, no fake legal data.
- Forbidden terms (checked in source and exported HTML): "SOC 2", "depoimento", "12.400", "5.600", "98%", "todo o Brasil", "Começar grátis", "R$ 149", "BNCP", "00.000.000".
- Env: `NEXT_PUBLIC_SITE_URL` (default `https://qore.com.br`) drives canonical, sitemap, robots, Open Graph and JSON-LD.
- Lighthouse budget: JS the landing adds on top of the Next/React runtime ≤ 90 KB gzip (see "Spec resolutions" §1); GSAP, dotLottie and Motion features never in the initial chunks; CLS 0 (explicit media dimensions).

## Task layout

8 tasks, each made of Parts (P1–P18). Parts keep their own red→green cycles and micro commits; a reviewer gates each Task. Cross-references below say "Part N".

## Spec resolutions (decided while planning against the real code)

1. **"JS inicial ≤ 90 KB gzip" is not reachable as a total.** The Next 15 App Router runtime + React 19 alone is ~100 KB gzip before any app code. Resolution: Part 2 measures the runtime baseline on a page with only an `<h1>` and commits it to `tests/export/initial-js-baseline.json`; Part 17 asserts `initial JS − baseline ≤ 90 KB gzip`. Emerson should confirm this reading.
2. **`NEXT_PUBLIC_APP_URL` has no consumer.** The spec keeps no link to the panel (no login, no signup). It is not added (YAGNI). Add it the day a link to `app.qore.com.br` exists.
3. **Motion `LazyMotion` still ships the `m` shell (~5 KB) with the island.** Only the `domAnimation` feature bundle is loaded by `import()`. This is the documented LazyMotion model and what the spec names.
4. **`/performance` shows "Taxa de vitória"** (win rate, listed by SPA-426 as fabricated). The capture script removes that KPI card before the screenshot and fails if any forbidden panel term is still on screen.
5. **The `/bids/new` pricing step** is reached through `/bids/new` → first "Iniciar proposta" → "Avançar para Itens" → "Avançar para Precificação" (route `/bids/compose?licitacaoId=…`). The pricing step lists the tender items being priced; it is captured under "Tela ilustrativa" as the user asked, but it is the closest screen to SPA-426's "itens do edital" — Emerson should eyeball it.
6. **qore-web demo data has agencies outside SP** (Salvador, Recife…). Captured as-is under "Tela ilustrativa"; flag for Emerson.
7. **Section 6 copy speaks in the future tense** ("No piloto, a IA vai…") per the SPA-474 copy lock until SPA-426 ships.
8. **FAQ "preço inexequível"** follows SPA-474: "sinaliza risco", 75% rule only for obras e serviços de engenharia (art. 59, §4º), no "média histórica".
9. **Stitch hero "Compatibilidade 96%" and "645 municípios monitorados"** are dropped (unbacked numbers).
10. **Privacy retention period** (12 months after last contact) is a proposed value, not in the spec — Emerson must confirm before go-live.
11. **Coverage excludes `src/components/ui/**`** (generated shadcn primitives with unused exports such as `SheetFooter`, `CardAction`); `src/hooks/**` is added to coverage. Threshold is 91 (spec says "acima de 90%").
12. **`.claude/` is gitignored** (`.gitignore:44`). Part 18 edits `.claude/CLAUDE.md` and agents but cannot commit them; report to Emerson. `.claude/settings.local.json` (bun permissions) is not touched — permission files are out of scope for agents.
13. **Primitives are edited** (`button.tsx`, `input.tsx`, `sheet.tsx`) to meet 44px targets, 16px inputs, PT-BR close label and the dual focus ring; the `.claude/CLAUDE.md` rule "don't hand-edit ui" is updated in Part 18.
14. **Hero entrance animation** runs only on the summary card; the H1 (LCP element) is never animated.

## File Structure

**Delete (Part 2):**
- `src/app/login/` (route)
- `src/components/sections/{stats,testimonials,pricing,social-proof,trust-badges,dashboard-mockup,features-grid,feature-showcase,cta-section,hero,how-it-works,header,footer,faq}.tsx` (all old sections; the kept ones are rewritten from scratch later)
- `src/config/{testimonials,pricing,features,navigation}.ts`
- `src/components/layout/animated-section.tsx`, `src/hooks/use-scroll-position.ts`, `src/lib/metadata.ts`
- `src/components/ui/{accordion,navigation-menu,separator}.tsx`
- `public/images/`, `public/logos/`, `public/screenshots/*.png`, `public/robots.txt`, `public/sitemap.xml`
- `src/app/favicon.ico` (Part 5, replaced by `src/app/icon.svg`)

**Keep and reuse:** `src/lib/utils.ts` (`cn`), `src/components/ui/{button,badge,card,input,sheet}.tsx`, `src/components/layout/{container,section-wrapper}.tsx`, `src/app/not-found.tsx`, `src/config/{site,faq}.ts` (rewritten), `src/types/index.ts` (rewritten).

**Create:**

| Path | Responsibility |
| --- | --- |
| `vitest.config.ts`, `vitest.setup.ts` | Unit/component test runner, jsdom, coverage |
| `vitest.export.config.ts` | Post-build suite over `out/` |
| `src/test-utils/browser-mocks.ts` | IntersectionObserver and matchMedia test doubles |
| `tests/forbidden-terms.ts` | Single list of forbidden terms |
| `tests/unit/*.test.ts` | Node-env checks of files (source content, netlify.toml, tokens, animation JSON, brand assets, screenshots) |
| `tests/export/*` | Exported HTML, initial JS budget, rendered-page checks (375px, no-JS, targets) |
| `scripts/initial-javascript.mjs` | Measures gzip size of initial scripts of an exported page |
| `scripts/generate-brand-assets.mjs` | `public/og.png` (1200×630) and `src/app/apple-icon.png` from `icon.svg` |
| `scripts/capture-screenshots.mjs` | Captures qore-web screens, writes AVIF/WebP to `public/screenshots/` |
| `lighthouserc.mobile.json`, `lighthouserc.desktop.json` | LHCI configs |
| `src/lib/site-url.ts` | Env-driven site origin and absolute URLs |
| `src/lib/phone.ts` | BR phone mask and validation |
| `src/lib/contact-form.ts` | Form values, validation, encoding, submission |
| `src/lib/legal.ts` | `isLegalIdentityComplete` |
| `src/lib/motion-preferences.ts` | Reduced-motion and desktop media queries |
| `src/lib/load-scroll-trigger.ts` | Lazy GSAP + ScrollTrigger loader |
| `src/lib/motion-features.ts` | `domAnimation` re-export for LazyMotion |
| `src/lib/structured-data.ts` | JSON-LD `@graph` (Organization, WebSite, FAQPage) |
| `src/lib/site-metadata.ts` | Root `Metadata` builder |
| `src/hooks/use-near-viewport.ts` | One-shot "section is near the viewport" hook |
| `src/config/navigation.ts` | Header and footer links, contact anchor |
| `src/config/home-content.ts` | All home page copy and data |
| `src/components/layout/scroll-state-observer.tsx` | Toggles `data-scrolled` on the header |
| `src/components/layout/reveal-observer.tsx` | CSS reveal driven by IntersectionObserver |
| `src/components/sections/*.tsx` | One file per section / island (listed per task) |
| `src/components/privacy/controller-identity.tsx` | Controller block of the privacy page |
| `src/app/privacidade/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`, `src/app/apple-icon.png` | Routes and icons |
| `public/animations/ai-reading.json`, `public/animations/dotlottie-player.wasm` | Hand-authored Lottie + self-hosted player WASM |
| `public/og.png`, `public/screenshots/*.{avif,webp}` | Generated images |

---

### Task 1: Cleanup and build fixes (Parts 1–3)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 1: Test tooling and env-driven site URL

**Files:**
- Modify: `package.json` (scripts, devDependencies)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `src/lib/site-url.ts`, Test: `src/lib/site-url.test.ts`
- Modify: `src/config/site.ts`

**Seams:** `resolveSiteUrl(value)`, `absoluteUrl(siteUrl, path)`.

**Interfaces:**
- Produces: `resolveSiteUrl(value: string | undefined): string` (origin, no trailing slash; default `https://qore.com.br`; throws `"NEXT_PUBLIC_SITE_URL must be an absolute URL"` / `"NEXT_PUBLIC_SITE_URL must use https"`), `absoluteUrl(siteUrl: string, path: string): string`. Scripts `pnpm test`, `pnpm test:coverage`, `pnpm typecheck`.

- [ ] **Step 0: Invoke the `tdd` skill.** Confirm branch: `git rev-parse --abbrev-ref HEAD` → `feat/landing-relaunch`.

- [ ] **Step 1: Install test tooling**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vitest/coverage-v8
```

In `package.json` replace `"scripts"` with:

```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/**", "src/hooks/**"],
      exclude: ["src/components/ui/**", "**/*.test.{ts,tsx}"],
    },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
```

- [ ] **Step 2: Write the failing test** — `src/lib/site-url.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { absoluteUrl, resolveSiteUrl } from "./site-url";

describe("resolveSiteUrl", () => {
  it("falls back to the production domain when the variable is missing", () => {
    expect(resolveSiteUrl(undefined)).toBe("https://qore.com.br");
  });

  it("falls back to the production domain when the variable is blank", () => {
    expect(resolveSiteUrl("   ")).toBe("https://qore.com.br");
  });

  it("keeps only the origin of the configured URL", () => {
    expect(resolveSiteUrl("https://preview.qore.com.br/some/path/")).toBe(
      "https://preview.qore.com.br",
    );
  });

  it("accepts plain http only for localhost", () => {
    expect(resolveSiteUrl("http://localhost:3000")).toBe("http://localhost:3000");
  });

  it("rejects plain http on a public host", () => {
    expect(() => resolveSiteUrl("http://qore.com.br")).toThrow(
      "NEXT_PUBLIC_SITE_URL must use https",
    );
  });

  it("rejects a value that is not an absolute URL", () => {
    expect(() => resolveSiteUrl("qore.com.br")).toThrow(
      "NEXT_PUBLIC_SITE_URL must be an absolute URL",
    );
  });
});

describe("absoluteUrl", () => {
  it("joins the site origin and a path", () => {
    expect(absoluteUrl("https://qore.com.br", "/privacidade")).toBe(
      "https://qore.com.br/privacidade",
    );
  });

  it("returns the root with a trailing slash", () => {
    expect(absoluteUrl("https://qore.com.br", "/")).toBe("https://qore.com.br/");
  });
});
```

- [ ] **Step 3: Run it red**

Run: `pnpm test src/lib/site-url.test.ts`
Expected: FAIL — `Failed to resolve import "./site-url" from "src/lib/site-url.test.ts"`.

- [ ] **Step 4: Minimal implementation** — `src/lib/site-url.ts`

```ts
const DEFAULT_SITE_URL = "https://qore.com.br";

const parseAbsoluteUrl = (value: string): URL => {
  try {
    return new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL");
  }
};

export const resolveSiteUrl = (value: string | undefined): string => {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_SITE_URL;

  const url = parseAbsoluteUrl(candidate);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use https");
  }
  return url.origin;
};

export const absoluteUrl = (siteUrl: string, path: string): string =>
  new URL(path, siteUrl).toString();
```

- [ ] **Step 5: Wire `siteConfig.url` to the env** — `src/config/site.ts` (other fields stay until Part 2 removes their consumers)

```ts
import { resolveSiteUrl } from "@/lib/site-url";

const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Qore",
  description:
    "Qore é a plataforma completa para encontrar, acompanhar e participar de licitações públicas em todo o Brasil — com alertas inteligentes, análise de editais e gestão de propostas.",
  url: siteUrl,
  appUrl: "https://app.qore.com.br",
  ogImage: `${siteUrl}/images/og-image.png`,
  links: {
    twitter: "https://twitter.com/qorebr",
    github: "https://github.com/qorebr",
    linkedin: "https://linkedin.com/company/qorebr",
  },
} as const;
```

- [ ] **Step 6: Run it green**

Run: `pnpm test src/lib/site-url.test.ts`
Expected: PASS — `8 passed`.

- [ ] **Step 7: Full gate**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
Expected: all exit 0; `out/index.html` exists.

- [ ] **Step 8: Commit (two micro commits)**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts vitest.setup.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "chore: add vitest, testing library and typecheck scripts"
git add src/lib/site-url.ts src/lib/site-url.test.ts src/config/site.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: derive the site URL from NEXT_PUBLIC_SITE_URL"
```

---

#### Part 2: Remove the false content and the /login route

**Files:**
- Delete: everything listed under "Delete (Part 2)" in File Structure
- Create: `tests/forbidden-terms.ts`, Test: `tests/unit/source-content.test.ts`
- Rewrite: `src/config/site.ts`, `src/config/faq.ts`, `src/types/index.ts`, `src/lib/structured-data.ts`, `src/app/page.tsx`, `src/app/layout.tsx`
- Create: `scripts/initial-javascript.mjs`, `tests/export/initial-js-baseline.json`

**Seams:** the source tree as text (no forbidden term, no `/login` route), `structured-data` module exports.

**Interfaces:**
- Produces: `FORBIDDEN_TERMS: readonly string[]`; `siteConfig: SiteConfig` with `{ name, slogan, description, url, legal }`; `LegalIdentity`, `FAQItem`, `NavLink` types; `faqItems: readonly FAQItem[]` (5 items); `measureInitialJavaScript(outDirectory: string, htmlFile?: string): { files: string[]; gzipBytes: number }`; `tests/export/initial-js-baseline.json` `{ "gzipBytes": number }`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Write the failing test**

`tests/forbidden-terms.ts`:

```ts
export const FORBIDDEN_TERMS: readonly string[] = [
  "SOC 2",
  "depoimento",
  "12.400",
  "5.600",
  "98%",
  "todo o Brasil",
  "Começar grátis",
  "R$ 149",
  "BNCP",
  "00.000.000",
];
```

`tests/unit/source-content.test.ts`:

```ts
// @vitest-environment node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FORBIDDEN_TERMS } from "../forbidden-terms";

const SOURCE_DIRECTORY = join(process.cwd(), "src");

const listSourceFiles = (): string[] =>
  readdirSync(SOURCE_DIRECTORY, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx|css)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));

describe("source content", () => {
  it.each(FORBIDDEN_TERMS)("never mentions %s", (term) => {
    const offenders = listSourceFiles().filter((file) =>
      readFileSync(file, "utf8").toLowerCase().includes(term.toLowerCase()),
    );
    expect(offenders).toEqual([]);
  });

  it("has no /login route", () => {
    expect(existsSync(join(SOURCE_DIRECTORY, "app", "login"))).toBe(false);
  });

  it("publishes no software offer in structured data", () => {
    const structuredData = readFileSync(join(SOURCE_DIRECTORY, "lib", "structured-data.ts"), "utf8");
    expect(structuredData).not.toContain("SoftwareApplication");
    expect(structuredData).not.toContain("Offer");
  });
});
```

- [ ] **Step 2: Run it red**

Run: `pnpm test tests/unit/source-content.test.ts`
Expected: FAIL — e.g. `never mentions BNCP` with offenders `[".../src/config/faq.ts", ".../src/config/features.ts"]`, `never mentions R$ 149` with `.../src/config/pricing.ts`, `has no /login route` expected `true` to be `false`, `publishes no software offer` failing on `SoftwareApplication`.

- [ ] **Step 3: Delete the false content**

```bash
git rm -r src/app/login public/images public/logos public/robots.txt public/sitemap.xml
git rm public/screenshots/*.png
git rm src/components/sections/{stats,testimonials,pricing,social-proof,trust-badges,dashboard-mockup,features-grid,feature-showcase,cta-section,hero,how-it-works,header,footer,faq}.tsx
git rm src/config/{testimonials,pricing,features,navigation}.ts
git rm src/components/layout/animated-section.tsx src/hooks/use-scroll-position.ts src/lib/metadata.ts
git rm src/components/ui/{accordion,navigation-menu,separator}.tsx
```

- [ ] **Step 4: Rewrite the kept modules**

`src/types/index.ts`:

```ts
export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface LegalIdentity {
  companyName: string;
  taxId: string;
  contactEmail: string;
  dataProtectionOfficer: string;
}
```

`src/config/site.ts`:

```ts
import { resolveSiteUrl } from "@/lib/site-url";
import type { LegalIdentity } from "@/types";

interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  url: string;
  legal: LegalIdentity;
}

export const siteConfig: SiteConfig = {
  name: "Qore",
  slogan: "A IA lê o edital. Você decide.",
  description:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  legal: {
    companyName: "",
    taxId: "",
    contactEmail: "",
    dataProtectionOfficer: "",
  },
};
```

`src/config/faq.ts`:

```ts
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
```

`src/lib/structured-data.ts` (interim; Part 15 replaces it):

```ts
import { faqItems } from "@/config/faq";
import { siteConfig } from "@/config/site";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
});

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});
```

`src/app/page.tsx`:

```tsx
const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <h1>A IA lê o edital. Você decide.</h1>
  </main>
);

export default HomePage;
```

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR" className={inter.variable}>
    <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
  </html>
);

export default RootLayout;
```

- [ ] **Step 5: Run it green**

Run: `pnpm test tests/unit/source-content.test.ts`
Expected: PASS — `12 passed`.

- [ ] **Step 6: Measure the runtime baseline**

`scripts/initial-javascript.mjs`:

```js
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

/**
 * @param {string} html
 * @returns {string[]}
 */
export const listInitialScripts = (html) =>
  [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)]
    .map((match) => (match[1] ?? "").split("?")[0] ?? "")
    .filter((source) => source.startsWith("/_next/"));

/**
 * @param {string} outDirectory
 * @param {string} [htmlFile]
 * @returns {{ files: string[], gzipBytes: number }}
 */
export const measureInitialJavaScript = (outDirectory, htmlFile = "index.html") => {
  const html = readFileSync(join(outDirectory, htmlFile), "utf8");
  const files = listInitialScripts(html);
  const gzipBytes = files.reduce(
    (total, source) => total + gzipSync(readFileSync(join(outDirectory, source))).length,
    0,
  );
  return { files, gzipBytes };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { files, gzipBytes } = measureInitialJavaScript(join(process.cwd(), "out"));
  console.log(JSON.stringify({ scriptCount: files.length, gzipBytes }, null, 2));
}
```

Run: `pnpm build && node scripts/initial-javascript.mjs`
Expected: JSON like `{ "scriptCount": 5, "gzipBytes": 10xxxx }`. Write the printed `gzipBytes` value into `tests/export/initial-js-baseline.json`:

```json
{ "gzipBytes": 102400 }
```

(`102400` is shown only as the shape — commit the exact number the command printed.)

- [ ] **Step 7: Full gate**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
Expected: exit 0.

- [ ] **Step 8: Commit (three micro commits)**

```bash
git add tests/forbidden-terms.ts tests/unit/source-content.test.ts
git add -A src/app/login src/components src/hooks src/lib src/types src/app/page.tsx src/app/layout.tsx src/config/site.ts src/config/testimonials.ts src/config/pricing.ts src/config/features.ts src/config/navigation.ts public
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "fix: remove invented numbers, testimonials, seals, pricing and the login route"
git add src/config/faq.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "fix: rewrite the FAQ to match the São Paulo pilot"
git add scripts/initial-javascript.mjs tests/export/initial-js-baseline.json
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "test: record the Next runtime JavaScript baseline"
```


---

#### Part 3: Netlify build with pnpm, no SPA fallback, security headers

**Files:**
- Modify: `netlify.toml`
- Test: `tests/unit/netlify-config.test.ts`

**Seams:** `netlify.toml` as text.

**Interfaces:** none produced for code.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Write the failing test** — `tests/unit/netlify-config.test.ts`

```ts
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const netlifyConfig = readFileSync(join(process.cwd(), "netlify.toml"), "utf8");

describe("netlify.toml", () => {
  it("builds with pnpm", () => {
    expect(netlifyConfig).toContain('command = "pnpm build"');
  });

  it("has no SPA fallback, so unknown paths get the exported 404", () => {
    expect(netlifyConfig).not.toContain("/index.html");
    expect(netlifyConfig).not.toContain("[[redirects]]");
  });

  it("sends HSTS", () => {
    expect(netlifyConfig).toContain(
      'Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"',
    );
  });

  it("sends a Permissions-Policy", () => {
    expect(netlifyConfig).toContain("Permissions-Policy");
  });

  it("keeps the existing security headers", () => {
    expect(netlifyConfig).toContain('X-Frame-Options = "DENY"');
    expect(netlifyConfig).toContain('X-Content-Type-Options = "nosniff"');
    expect(netlifyConfig).toContain('Referrer-Policy = "strict-origin-when-cross-origin"');
  });
});
```

- [ ] **Step 2: Run it red**

Run: `pnpm test tests/unit/netlify-config.test.ts`
Expected: FAIL — `builds with pnpm` (file has `bun run build`), `has no SPA fallback`, `sends HSTS`, `sends a Permissions-Policy`.

- [ ] **Step 3: Implementation** — replace `netlify.toml`

```toml
[build]
  command = "pnpm build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/screenshots/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/animations/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
```

- [ ] **Step 4: Run it green**

Run: `pnpm test tests/unit/netlify-config.test.ts`
Expected: PASS — `5 passed`.

- [ ] **Step 5: Full gate** — `pnpm lint && pnpm typecheck && pnpm test && pnpm build` → exit 0.

- [ ] **Step 6: Commit**

```bash
git add netlify.toml tests/unit/netlify-config.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "fix: build on Netlify with pnpm and serve the real 404 instead of a SPA fallback"
```

---

### Task 2: Tokens, fonts, logo and page shell (Parts 4–6)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 4: Institutional Clarity tokens, fonts and touch-safe primitives

**Files:**
- Rewrite: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (fonts)
- Modify: `src/components/ui/button.tsx`, `src/components/ui/input.tsx`
- Rewrite: `src/components/layout/container.tsx`
- Test: `tests/unit/design-tokens.test.ts`, `src/components/ui/primitives.test.tsx`

**Seams:** `globals.css` as text; rendered `Button` and `Input` classes.

**Interfaces:**
- Produces Tailwind utilities used by every later task: colors `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `hover:bg-primary-hover`, `text-primary`, `bg-primary-tint`, `border-primary-tint-strong`, `text-muted-foreground`, `bg-surface-low`, `border-border`, `border-input`, `text-destructive-text`, `bg-accent`; type `text-headline-xl`, `text-headline-xl-mobile`, `text-headline-lg`, `text-headline-lg-mobile`, `text-headline-md`, `text-headline-sm`, `text-title-md`, `text-body-lg`, `text-body-md`, `text-label-md`, `text-label-sm`, `text-caption`; fonts `font-sans`, `font-display`; `shadow-sm|md|lg`; `animate-hero-enter`. Button sizes `default` (h-11), `sm` (h-11), `lg` (h-12), `icon` (size-11). `Container` with `max-w-[1440px] px-4 md:px-8`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Write the failing tests**

`tests/unit/design-tokens.test.ts`:

```ts
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");

describe("globals.css", () => {
  it("uses the Institutional Clarity emerald as primary", () => {
    expect(stylesheet).toContain("--color-primary: #047857;");
    expect(stylesheet).toContain("--color-primary-hover: #065f46;");
  });

  it("declares the display font token", () => {
    expect(stylesheet).toContain("--font-display: var(--font-hanken-grotesk)");
  });

  it("declares the headline scale", () => {
    expect(stylesheet).toContain("--text-headline-xl: 2.5rem;");
    expect(stylesheet).toContain("--text-headline-xl-mobile: 1.875rem;");
  });

  it("imports no external stylesheet", () => {
    expect(stylesheet).not.toMatch(/@import\s+url\(/);
    expect(stylesheet).not.toContain("http");
  });

  it("draws the dual focus ring outside any cascade layer", () => {
    expect(stylesheet).toContain(
      ":focus-visible {\n  outline: 2px solid transparent;\n  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--color-ring);\n}",
    );
  });
});
```

`src/components/ui/primitives.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Input } from "./input";

describe("Button", () => {
  it("is at least 44px tall by default", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveClass("h-11");
  });

  it("keeps small buttons at 44px", () => {
    render(<Button size="sm">Menor</Button>);
    expect(screen.getByRole("button", { name: "Menor" })).toHaveClass("h-11");
  });

  it("has a 44px square icon size", () => {
    render(<Button size="icon" aria-label="Abrir menu" />);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveClass("size-11");
  });
});

describe("Input", () => {
  it("is 44px tall with a 16px font on every breakpoint", () => {
    render(<Input aria-label="Nome" />);
    const input = screen.getByRole("textbox", { name: "Nome" });
    expect(input).toHaveClass("h-11", "text-base");
    expect(input.className).not.toContain("md:text-sm");
  });
});
```

- [ ] **Step 2: Run them red**

Run: `pnpm test tests/unit/design-tokens.test.ts src/components/ui/primitives.test.tsx`
Expected: FAIL — `expected ... to contain '--color-primary: #047857;'`, `Expected the element to have class: h-11 Received: ... h-9 ...`, `size-11` missing, input `md:text-sm` present.

- [ ] **Step 3: Rewrite `src/app/globals.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-hanken-grotesk), ui-sans-serif, system-ui, sans-serif;
}

@theme {
  --color-background: #f8f9ff;
  --color-foreground: #0f172a;
  --color-card: #ffffff;
  --color-card-foreground: #0f172a;
  --color-popover: #ffffff;
  --color-popover-foreground: #0f172a;
  --color-primary: #047857;
  --color-primary-hover: #065f46;
  --color-primary-foreground: #ffffff;
  --color-primary-tint: #ecfdf5;
  --color-primary-tint-strong: #d1fae5;
  --color-primary-light: #34d399;
  --color-secondary: #eff4ff;
  --color-secondary-foreground: #0f172a;
  --color-muted: #eff4ff;
  --color-muted-foreground: #475569;
  --color-accent: #f1f5f9;
  --color-accent-foreground: #0f172a;
  --color-destructive: #e11d48;
  --color-destructive-text: #be123c;
  --color-border: #e2e8f0;
  --color-input: #cbd5e1;
  --color-ring: #047857;
  --color-surface-low: #eff4ff;

  --text-headline-xl: 2.5rem;
  --text-headline-xl--line-height: 3rem;
  --text-headline-xl--letter-spacing: -0.03em;
  --text-headline-xl--font-weight: 700;
  --text-headline-xl-mobile: 1.875rem;
  --text-headline-xl-mobile--line-height: 2.375rem;
  --text-headline-xl-mobile--letter-spacing: -0.02em;
  --text-headline-xl-mobile--font-weight: 700;
  --text-headline-lg: 2rem;
  --text-headline-lg--line-height: 2.5rem;
  --text-headline-lg--letter-spacing: -0.025em;
  --text-headline-lg--font-weight: 700;
  --text-headline-lg-mobile: 1.5rem;
  --text-headline-lg-mobile--line-height: 2rem;
  --text-headline-lg-mobile--letter-spacing: -0.02em;
  --text-headline-lg-mobile--font-weight: 700;
  --text-headline-md: 1.5rem;
  --text-headline-md--line-height: 2rem;
  --text-headline-md--letter-spacing: -0.02em;
  --text-headline-md--font-weight: 600;
  --text-headline-sm: 1.25rem;
  --text-headline-sm--line-height: 1.75rem;
  --text-headline-sm--letter-spacing: -0.015em;
  --text-headline-sm--font-weight: 600;
  --text-title-md: 1.125rem;
  --text-title-md--line-height: 1.625rem;
  --text-title-md--letter-spacing: -0.01em;
  --text-title-md--font-weight: 600;
  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.75rem;
  --text-body-lg--letter-spacing: -0.005em;
  --text-body-md: 1rem;
  --text-body-md--line-height: 1.5rem;
  --text-label-md: 0.875rem;
  --text-label-md--line-height: 1.25rem;
  --text-label-md--letter-spacing: 0.01em;
  --text-label-md--font-weight: 500;
  --text-label-sm: 0.75rem;
  --text-label-sm--line-height: 1rem;
  --text-label-sm--letter-spacing: 0.03em;
  --text-label-sm--font-weight: 600;
  --text-caption: 0.75rem;
  --text-caption--line-height: 1rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  --shadow-sm: 0 1px 2px 0 rgb(15 23 42 / 0.05);
  --shadow-md: 0 4px 12px -2px rgb(4 120 87 / 0.04), 0 2px 6px -1px rgb(15 23 42 / 0.04);
  --shadow-lg: 0 10px 25px -3px rgb(15 23 42 / 0.08), 0 4px 10px -2px rgb(4 120 87 / 0.06);

  --animate-hero-enter: hero-enter 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both;

  @keyframes hero-enter {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-display);
  }

  section[id] {
    scroll-margin-top: 5rem;
  }
}

:focus-visible {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--color-ring);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Fonts** — in `src/app/layout.tsx` replace the `Inter` import/const and the `<html>` line:

```tsx
import { Hanken_Grotesk, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});
```

```tsx
  <html lang="pt-BR" className={`${inter.variable} ${hankenGrotesk.variable}`}>
    <body className="min-h-dvh bg-background font-sans text-foreground antialiased">{children}</body>
  </html>
```

- [ ] **Step 5: Primitives**

In `src/components/ui/button.tsx` replace the whole `cva(...)` call with:

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-label-md font-medium transition-transform active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border bg-card text-foreground shadow-sm hover:border-input hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 has-[>svg]:px-4",
        sm: "h-11 px-3",
        lg: "h-12 px-6 text-body-md has-[>svg]:px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

In `src/components/ui/input.tsx` replace the `className={cn(...)}` argument list with:

```tsx
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-card px-3.5 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
```

`src/components/layout/container.tsx`:

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Container = ({ className, children, ...props }: ComponentProps<"div">) => (
  <div className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-8", className)} {...props}>
    {children}
  </div>
);
```

- [ ] **Step 6: Run them green**

Run: `pnpm test tests/unit/design-tokens.test.ts src/components/ui/primitives.test.tsx`
Expected: PASS — `9 passed`.

- [ ] **Step 7: Full gate** — `pnpm lint && pnpm typecheck && pnpm test && pnpm build` → exit 0. (`not-found.tsx` still uses `Button` defaults; it keeps compiling.)

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css tests/unit/design-tokens.test.ts src/app/layout.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: port the Institutional Clarity tokens and fonts"
git add src/components/ui/button.tsx src/components/ui/input.tsx src/components/ui/primitives.test.tsx src/components/layout/container.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "fix: make buttons and inputs touch-safe with 44px targets and 16px text"
```

---

#### Part 5: Logo and icon

**Files:**
- Rewrite: `src/components/ui/logo.tsx`, Test: `src/components/ui/logo.test.tsx`
- Create: `src/app/icon.svg`
- Delete: `src/app/favicon.ico`
- Test: `tests/unit/icon.test.ts`

**Seams:** rendered `Logo`; `src/app/icon.svg` as text.

**Interfaces:**
- Produces: `LogoMark({ className?: string })` (decorative `<svg aria-hidden>`), `Logo({ className?: string })` (mark + wordmark "Qore." with the dot in `text-primary`). `src/app/icon.svg` has only `xmlns` and `viewBox="0 0 48 48"` on the root (no width/height) — Part 15 depends on that.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Write the failing tests**

`src/components/ui/logo.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("reads as the Qore wordmark with an emerald dot", () => {
    const { container } = render(<Logo />);
    expect(container.textContent).toBe("Qore.");
    expect(container.querySelector(".text-primary")?.textContent).toBe(".");
  });

  it("hides the mark from assistive technology", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
```

`tests/unit/icon.test.ts`:

```ts
// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = join(process.cwd(), "src", "app");

describe("app icon", () => {
  it("is the emerald rounded square with the light-green dot", () => {
    const icon = readFileSync(join(appDirectory, "icon.svg"), "utf8");
    expect(icon).toContain('fill="#047857"');
    expect(icon).toContain('fill="#34d399"');
    expect(icon).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 48 48">/);
  });

  it("replaces the old favicon", () => {
    expect(existsSync(join(appDirectory, "favicon.ico"))).toBe(false);
  });
});
```

- [ ] **Step 2: Run them red**

Run: `pnpm test src/components/ui/logo.test.tsx tests/unit/icon.test.ts`
Expected: FAIL — `expected '' to be 'Qore.'` (old Logo renders only an svg), `ENOENT ... icon.svg`, favicon exists.

- [ ] **Step 3: Implementation**

`src/components/ui/logo.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export const LogoMark = ({ className }: LogoMarkProps) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={cn("size-8", className)}>
    <rect width="48" height="48" rx="12" fill="#047857" />
    <circle cx="23" cy="24" r="10" fill="none" stroke="#ffffff" strokeWidth="5" />
    <path d="M28 29 L34 35" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <circle cx="33" cy="14" r="4" fill="#34d399" />
  </svg>
);

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2", className)}>
    <LogoMark />
    <span className="font-display text-title-md font-bold text-foreground">
      Qore<span className="text-primary">.</span>
    </span>
  </span>
);
```

`src/app/icon.svg` (single line root, no width/height):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#047857"/><circle cx="23" cy="24" r="10" fill="none" stroke="#ffffff" stroke-width="5"/><path d="M28 29 L34 35" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/><circle cx="33" cy="14" r="4" fill="#34d399"/></svg>
```

```bash
git rm src/app/favicon.ico
```

- [ ] **Step 4: Run them green** — same command → PASS `4 passed`.

- [ ] **Step 5: Full gate** — `pnpm lint && pnpm typecheck && pnpm test && pnpm build` → exit 0; `out/icon.svg` exists.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/logo.tsx src/components/ui/logo.test.tsx src/app/icon.svg tests/unit/icon.test.ts
git add -A src/app/favicon.ico
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: redraw the Qore logo and serve it as the app icon"
```

---

#### Part 6: Page shell — header, mobile menu, skip link, reveal, footer

**Files:**
- Create: `src/test-utils/browser-mocks.ts`; Modify: `vitest.setup.ts`
- Create: `src/config/navigation.ts`
- Create: `src/components/layout/scroll-state-observer.tsx`, `src/components/layout/reveal-observer.tsx`
- Create: `src/components/sections/header.tsx`, `src/components/sections/header-mobile-menu.tsx`, `src/components/sections/footer.tsx`
- Modify: `src/components/ui/sheet.tsx` (close button 44px, "Fechar")
- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Tests: `src/components/sections/header.test.tsx`, `src/components/sections/footer.test.tsx`, `src/components/layout/scroll-state-observer.test.tsx`, `src/components/layout/reveal-observer.test.tsx`

**Seams:** rendered `Header` (links, CTA, menu dialog), rendered `Footer`, `ScrollStateObserver` effect on the target element, `RevealObserver` effect on `[data-reveal]` elements.

**Interfaces:**
- Produces: `IntersectionObserverMock` with `static trigger(target: Element, isIntersecting: boolean): void` and `static instances`, `installIntersectionObserverMock(): void`, `installMatchMediaMock(matchingQueries: readonly string[]): void`; `primaryNavigation: readonly NavLink[]`, `footerNavigation: readonly NavLink[]`, `CONTACT_HREF = "/#contato"`; `Header()`, `Footer({ year?: number })`, `ScrollStateObserver({ targetId: string; sentinelId: string })`, `RevealObserver()`. Any element with `data-reveal` gets revealed on scroll. Layout renders `<Header/>`, `children`, `<Footer/>`; pages render `<main id="conteudo" tabIndex={-1}>`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Test doubles** — `src/test-utils/browser-mocks.ts`

```ts
import { vi } from "vitest";

const buildEntry = (target: Element, isIntersecting: boolean): IntersectionObserverEntry => {
  const rectangle = target.getBoundingClientRect();
  return {
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: rectangle,
    intersectionRect: rectangle,
    rootBounds: null,
    time: 0,
  };
};

export class IntersectionObserverMock implements IntersectionObserver {
  static readonly instances = new Set<IntersectionObserverMock>();
  readonly root = null;
  readonly rootMargin: string;
  readonly scrollMargin = "0px";
  readonly thresholds: readonly number[] = [0];
  private readonly callback: IntersectionObserverCallback;
  private readonly targets = new Set<Element>();

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin ?? "0px";
    IntersectionObserverMock.instances.add(this);
  }

  observe = (target: Element) => {
    this.targets.add(target);
  };

  unobserve = (target: Element) => {
    this.targets.delete(target);
  };

  disconnect = () => {
    this.targets.clear();
    IntersectionObserverMock.instances.delete(this);
  };

  takeRecords = (): IntersectionObserverEntry[] => [];

  static trigger = (target: Element, isIntersecting: boolean) => {
    IntersectionObserverMock.instances.forEach((instance) => {
      if (!instance.targets.has(target)) return;
      instance.callback([buildEntry(target, isIntersecting)], instance);
    });
  };
}

export const installIntersectionObserverMock = () => {
  IntersectionObserverMock.instances.clear();
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
};

export const installMatchMediaMock = (matchingQueries: readonly string[]) => {
  vi.stubGlobal(
    "matchMedia",
    (query: string): MediaQueryList => ({
      matches: matchingQueries.includes(query),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: () => false,
    }),
  );
};
```

Replace `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { installIntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";

beforeEach(() => {
  installIntersectionObserverMock();
  installMatchMediaMock([]);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
```

- [ ] **Step 2: Write the failing tests (slice 1: header)** — `src/components/sections/header.test.tsx`

```tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("links to every section anchor and to the contact form", () => {
    render(<Header />);
    const navigation = screen.getByRole("navigation", { name: "Principal" });
    expect(within(navigation).getByRole("link", { name: "Como funciona" })).toHaveAttribute("href", "/#como-funciona");
    expect(within(navigation).getByRole("link", { name: "Plataforma" })).toHaveAttribute("href", "/#plataforma");
    expect(within(navigation).getByRole("link", { name: "IA responsável" })).toHaveAttribute("href", "/#ia-responsavel");
    expect(within(navigation).getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/#faq");
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("href", "/#contato");
  });

  it("opens the mobile menu and closes it after choosing a link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("link", { name: "Como funciona" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("labels the menu close button in Portuguese", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar" })).toHaveClass("size-11");
  });
});
```

- [ ] **Step 3: Run red** — `pnpm test src/components/sections/header.test.tsx` → FAIL `Failed to resolve import "./header"`.

- [ ] **Step 4: Implement slice 1**

`src/config/navigation.ts`:

```ts
import type { NavLink } from "@/types";

export const CONTACT_HREF = "/#contato";

export const primaryNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Plataforma", href: "/#plataforma" },
  { label: "IA responsável", href: "/#ia-responsavel" },
  { label: "FAQ", href: "/#faq" },
];

export const footerNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: CONTACT_HREF },
  { label: "Privacidade", href: "/privacidade" },
];
```

`src/components/sections/header-mobile-menu.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/types";

interface HeaderMobileMenuProps {
  links: readonly NavLink[];
  contactHref: string;
}

export const HeaderMobileMenu = ({ links, contactHref }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,85vw)] p-6">
        <SheetTitle className="font-display text-title-md">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navegação principal do site</SheetDescription>
        <nav aria-label="Principal no celular">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-11 items-center rounded-md px-3 text-body-md text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="lg" className="mt-auto w-full">
          <a href={contactHref} onClick={close}>
            Fale com a gente
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
};
```

`src/components/sections/header.tsx`:

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ScrollStateObserver } from "@/components/layout/scroll-state-observer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CONTACT_HREF, primaryNavigation } from "@/config/navigation";
import { HeaderMobileMenu } from "./header-mobile-menu";

export const Header = () => (
  <header id="site-header" className="site-header fixed inset-x-0 top-0 z-50 isolate">
    <ScrollStateObserver targetId="site-header" sentinelId="top-sentinel" />
    <Container>
      <div className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Qore, página inicial" className="inline-flex min-h-11 items-center rounded-md">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNavigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-label-md text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <a href={CONTACT_HREF}>Fale com a gente</a>
          </Button>
          <HeaderMobileMenu links={primaryNavigation} contactHref={CONTACT_HREF} />
        </div>
      </div>
    </Container>
  </header>
);
```

`src/components/layout/scroll-state-observer.tsx`:

```tsx
"use client";

import { useEffect } from "react";

interface ScrollStateObserverProps {
  targetId: string;
  sentinelId: string;
}

export const ScrollStateObserver = ({ targetId, sentinelId }: ScrollStateObserverProps) => {
  useEffect(() => {
    const target = document.getElementById(targetId);
    const sentinel = document.getElementById(sentinelId);
    if (!target || !sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      target.toggleAttribute("data-scrolled", !entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [targetId, sentinelId]);

  return null;
};
```

In `src/components/ui/sheet.tsx` replace the close block:

```tsx
        {showCloseButton && (
          <SheetPrimitive.Close className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none">
            <XIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Fechar</span>
          </SheetPrimitive.Close>
        )}
```

The test locates the close button by its accessible name "Fechar"; `size-11` is on `SheetPrimitive.Close`, so the assertion holds.

- [ ] **Step 5: Run green** — `pnpm test src/components/sections/header.test.tsx` → PASS `3 passed`.

- [ ] **Step 6: Failing tests (slice 2: observers)**

`src/components/layout/scroll-state-observer.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { ScrollStateObserver } from "./scroll-state-observer";

const renderWithTargets = () =>
  render(
    <>
      <div id="top-sentinel" />
      <header id="site-header" />
      <ScrollStateObserver targetId="site-header" sentinelId="top-sentinel" />
    </>,
  );

describe("ScrollStateObserver", () => {
  it("marks the header as scrolled once the top sentinel leaves the viewport", () => {
    renderWithTargets();
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) throw new Error("sentinel missing");
    IntersectionObserverMock.trigger(sentinel, false);
    expect(document.getElementById("site-header")).toHaveAttribute("data-scrolled");
  });

  it("clears the scrolled state back at the top", () => {
    renderWithTargets();
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) throw new Error("sentinel missing");
    IntersectionObserverMock.trigger(sentinel, false);
    IntersectionObserverMock.trigger(sentinel, true);
    expect(document.getElementById("site-header")).not.toHaveAttribute("data-scrolled");
  });
});
```

`src/components/layout/reveal-observer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { RevealObserver } from "./reveal-observer";

describe("RevealObserver", () => {
  it("enables reveal styling only after JavaScript runs", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    expect(document.documentElement).toHaveClass("reveal-enabled");
  });

  it("reveals an element when it enters the viewport", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    const card = screen.getByText("Cartão");
    IntersectionObserverMock.trigger(card, true);
    expect(card).toHaveAttribute("data-revealed");
  });

  it("leaves an element hidden-ready while it is below the fold", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    const card = screen.getByText("Cartão");
    IntersectionObserverMock.trigger(card, false);
    expect(card).not.toHaveAttribute("data-revealed");
  });
});
```

- [ ] **Step 7: Run red** — `pnpm test src/components/layout` → scroll-state tests PASS already (implemented in slice 1), reveal tests FAIL `Failed to resolve import "./reveal-observer"`. Paste output.

- [ ] **Step 8: Implement slice 2** — `src/components/layout/reveal-observer.tsx`

```tsx
"use client";

import { useEffect } from "react";

export const RevealObserver = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (elements.length === 0) return;

    document.documentElement.classList.add("reveal-enabled");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
};
```

Append to `src/app/globals.css` (before the `@media (prefers-reduced-motion)` block):

```css
@layer components {
  .site-header::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: rgb(248 249 255 / 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  .site-header[data-scrolled]::before {
    opacity: 1;
  }

  [data-reveal] {
    transition:
      opacity 500ms ease-out,
      transform 500ms ease-out;
  }

  .reveal-enabled [data-reveal]:not([data-revealed]) {
    opacity: 0;
    transform: translateY(16px);
  }
}
```

and inside the existing `@media (prefers-reduced-motion: reduce)` block add:

```css
  .reveal-enabled [data-reveal]:not([data-revealed]) {
    opacity: 1;
    transform: none;
  }
```

- [ ] **Step 9: Run green** — `pnpm test src/components/layout` → PASS `5 passed`.

- [ ] **Step 10: Failing test (slice 3: footer)** — `src/components/sections/footer.test.tsx`

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
  it("shows the copyright for the given year", () => {
    render(<Footer year={2026} />);
    expect(screen.getByText("© 2026 Qore")).toBeInTheDocument();
  });

  it("links only to real destinations", () => {
    render(<Footer year={2026} />);
    const navigation = screen.getByRole("navigation", { name: "Rodapé" });
    const hrefs = within(navigation).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["/#como-funciona", "/#faq", "/#contato", "/privacidade"]);
  });
});
```

Run: `pnpm test src/components/sections/footer.test.tsx` → FAIL `Failed to resolve import "./footer"`.

- [ ] **Step 11: Implement slice 3** — `src/components/sections/footer.tsx`

```tsx
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface FooterProps {
  year?: number;
}

export const Footer = ({ year = new Date().getFullYear() }: FooterProps) => (
  <footer className="border-t border-border bg-card">
    <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <Logo />
        <p className="text-caption text-muted-foreground">
          © {year} {siteConfig.name}
        </p>
      </div>
      <nav aria-label="Rodapé">
        <ul className="flex flex-wrap gap-x-2 gap-y-1">
          {footerNavigation.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md px-2 text-label-md text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </footer>
);
```

Run the footer test again → PASS `2 passed`. (`© {year} {siteConfig.name}` renders as one text node group; if Testing Library splits it, the matcher `getByText("© 2026 Qore")` still matches because the `<p>` text content normalizes to `© 2026 Qore`.)

- [ ] **Step 12: Wire the layout** — replace the `RootLayout` in `src/app/layout.tsx`:

```tsx
import { RevealObserver } from "@/components/layout/reveal-observer";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
```

```tsx
const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR" className={`${inter.variable} ${hankenGrotesk.variable}`}>
    <body className="relative min-h-dvh bg-background font-sans text-foreground antialiased">
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6" />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Header />
      {children}
      <Footer />
      <RevealObserver />
    </body>
  </html>
);
```

- [ ] **Step 13: Full gate** — `pnpm lint && pnpm typecheck && pnpm test && pnpm build` → exit 0.

- [ ] **Step 14: Commit (three micro commits)**

```bash
git add src/test-utils/browser-mocks.ts vitest.setup.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "test: add IntersectionObserver and matchMedia test doubles"
git add src/config/navigation.ts src/components/sections/header.tsx src/components/sections/header-mobile-menu.tsx src/components/sections/header.test.tsx src/components/layout/scroll-state-observer.tsx src/components/layout/scroll-state-observer.test.tsx src/components/ui/sheet.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the fixed header with anchors, contact CTA and mobile menu"
git add src/components/layout/reveal-observer.tsx src/components/layout/reveal-observer.test.tsx src/components/sections/footer.tsx src/components/sections/footer.test.tsx src/app/layout.tsx src/app/globals.css
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the skip link, scroll reveal and honest footer"
```

---

### Task 3: Hero, problem, how it works and platform tour (Parts 7–8)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 7: Hero and Problem sections

**Files:**
- Create: `src/config/home-content.ts`; Modify: `src/types/index.ts`
- Create: `src/components/sections/hero.tsx`, `src/components/sections/hero-summary-card.tsx`, `src/components/sections/problem.tsx`
- Modify: `src/app/page.tsx`
- Tests: `src/components/sections/hero.test.tsx`, `src/components/sections/problem.test.tsx`

**Seams:** rendered `Hero`, rendered `Problem`.

**Interfaces:**
- Produces types `IconCard { icon: LucideIcon; title: string; description: string }`, `SummaryItem { title: string; citation: string; summary: string; isRisk: boolean }`; content `heroContent`, `heroSummaryItems`, `problemContent`; components `Hero()`, `HeroSummaryCard()`, `Problem()`. Section ids: hero has none; problem `#problema`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test** — `src/components/sections/hero.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./hero";

describe("Hero", () => {
  it("states the slogan as the only level-one heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A IA lê o edital. Você decide.");
  });

  it("offers contact and how-it-works actions without signup", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("href", "/#contato");
    expect(screen.getByRole("link", { name: "Ver como funciona" })).toHaveAttribute("href", "/#como-funciona");
    expect(screen.getByText("Sem cadastro e sem cartão")).toBeInTheDocument();
  });

  it("marks the summary card as an illustrative screen with page citations", () => {
    render(<Hero />);
    const card = screen.getByRole("figure", { name: "Resumo Inteligente Qore" });
    expect(card).toHaveTextContent("Tela ilustrativa");
    expect(card).toHaveTextContent("pág. 12");
  });
});
```

- [ ] **Step 2: Run red** — `pnpm test src/components/sections/hero.test.tsx` → FAIL `Failed to resolve import "./hero"`.

- [ ] **Step 3: Implement**

Append to `src/types/index.ts`:

```ts
import type { LucideIcon } from "lucide-react";

export interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SummaryItem {
  title: string;
  citation: string;
  summary: string;
  isRisk: boolean;
}
```

(Place the `import type` at the top of the file.)

`src/config/home-content.ts`:

```ts
import { Files, FileSearch, FileX } from "lucide-react";
import type { IconCard, SummaryItem } from "@/types";

export const heroContent = {
  eyebrow: "Piloto em São Paulo",
  titleLead: "A IA lê o edital.",
  titleEmphasis: "Você decide.",
  subtitle:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
  microcopy: "Sem cadastro e sem cartão",
} as const;

export const heroSummaryItems: readonly SummaryItem[] = [
  {
    title: "Exigência técnica",
    citation: "pág. 12, item 4.2",
    summary: "Responsável técnico com registro ativo no conselho e atestado compatível com o objeto.",
    isRisk: false,
  },
  {
    title: "Prazo de entrega",
    citation: "pág. 18, item 7.1",
    summary: "30 dias corridos após a ordem de fornecimento, em remessa única.",
    isRisk: false,
  },
  {
    title: "Garantia da proposta",
    citation: "pág. 24, item 9.3",
    summary: "1% do valor estimado, até 24 horas antes da sessão pública.",
    isRisk: false,
  },
  {
    title: "Alerta de risco",
    citation: "pág. 8",
    summary: "Visita técnica facultativa, com declaração formal assinada pelo responsável legal.",
    isRisk: true,
  },
];

export const problemContent: { eyebrow: string; title: string; items: readonly IconCard[] } = {
  eyebrow: "O desafio",
  title: "Os gargalos de quem disputa licitações todos os dias",
  items: [
    {
      icon: Files,
      title: "Editais espalhados em vários portais",
      description:
        "Prefeituras, secretarias e autarquias publicam em portais diferentes. Acompanhar todos à mão toma o dia e ainda deixa oportunidade passar.",
    },
    {
      icon: FileSearch,
      title: "80 páginas lidas na véspera do prazo",
      description:
        "O edital chega com anexos longos, e a cláusula que elimina a sua empresa costuma estar no meio deles, lida às pressas.",
    },
    {
      icon: FileX,
      title: "Proposta desclassificada por preço ou documento faltando",
      description:
        "Uma certidão vencida ou um preço fora da faixa aceitável derruba semanas de trabalho da equipe.",
    },
  ],
};
```

`src/components/sections/hero-summary-card.tsx`:

```tsx
import { FileText, Sparkles, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { heroSummaryItems } from "@/config/home-content";
import { cn } from "@/lib/utils";

export const HeroSummaryCard = () => (
  <figure
    aria-labelledby="hero-summary-title"
    className="animate-hero-enter rounded-lg border border-border bg-card p-5 shadow-lg md:p-6"
  >
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2">
        <Sparkles aria-hidden="true" className="size-5 text-primary" />
        <figcaption id="hero-summary-title" className="font-display text-title-md text-foreground">
          Resumo Inteligente Qore
        </figcaption>
      </div>
      <Badge variant="outline">Tela ilustrativa</Badge>
    </div>
    <p className="mt-3 flex items-center gap-2 text-caption text-muted-foreground">
      <FileText aria-hidden="true" className="size-4" />
      Edital de pregão eletrônico, exemplo
    </p>
    <ul className="mt-4 flex flex-col gap-3">
      {heroSummaryItems.map((item) => (
        <li
          key={item.title}
          className={cn(
            "rounded-md p-3",
            item.isRisk ? "border border-rose-200 bg-rose-50" : "border-l-4 border-primary bg-primary-tint",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-label-sm uppercase text-foreground">
              {item.isRisk && <TriangleAlert aria-hidden="true" className="size-4 text-destructive-text" />}
              {item.title}
            </span>
            <span className="rounded-sm bg-card px-1.5 py-0.5 text-caption text-muted-foreground tabular-nums">
              {item.citation}
            </span>
          </div>
          <p className="mt-1 text-label-md text-foreground">{item.summary}</p>
        </li>
      ))}
    </ul>
  </figure>
);
```

`src/components/sections/hero.tsx`:

```tsx
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/config/home-content";
import { CONTACT_HREF } from "@/config/navigation";
import { HeroSummaryCard } from "./hero-summary-card";

export const Hero = () => (
  <section aria-labelledby="hero-title" className="pt-28 pb-16 md:pt-36 md:pb-24">
    <Container className="grid items-center gap-12 lg:grid-cols-2">
      <div className="flex flex-col items-start gap-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary-tint-strong bg-primary-tint px-3 py-1 text-label-sm text-primary">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {heroContent.eyebrow}
        </p>
        <h1 id="hero-title" className="text-headline-xl-mobile text-foreground md:text-headline-xl">
          {heroContent.titleLead}{" "}
          <br />
          <span className="text-primary">{heroContent.titleEmphasis}</span>
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground">{heroContent.subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg">
            <a href={CONTACT_HREF}>Fale com a gente</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/#como-funciona">Ver como funciona</a>
          </Button>
        </div>
        <p className="text-label-md text-muted-foreground">{heroContent.microcopy}</p>
      </div>
      <HeroSummaryCard />
    </Container>
  </section>
);
```

- [ ] **Step 4: Run green** — hero test → PASS `3 passed`.

- [ ] **Step 5: Failing test (slice 2)** — `src/components/sections/problem.test.tsx`

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Problem } from "./problem";

describe("Problem", () => {
  it("lists three pains, each revealed on scroll", () => {
    render(<Problem />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    items.forEach((item) => expect(item).toHaveAttribute("data-reveal"));
  });

  it("names each pain as a level-three heading", () => {
    render(<Problem />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Editais espalhados em vários portais",
      "80 páginas lidas na véspera do prazo",
      "Proposta desclassificada por preço ou documento faltando",
    ]);
  });
});
```

Run red → `Failed to resolve import "./problem"`.

- [ ] **Step 6: Implement** — `src/components/sections/problem.tsx`

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { problemContent } from "@/config/home-content";

export const Problem = () => (
  <SectionWrapper id="problema" aria-labelledby="problem-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">{problemContent.eyebrow}</p>
    <h2 id="problem-title" className="mt-2 max-w-2xl text-headline-lg-mobile md:text-headline-lg">
      {problemContent.title}
    </h2>
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {problemContent.items.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Icon aria-hidden="true" className="size-6 text-primary" />
          <h3 className="mt-4 text-headline-sm">{title}</h3>
          <p className="mt-2 text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
```

Rewrite `src/components/layout/section-wrapper.tsx` to arrow style (same behavior):

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export const SectionWrapper = ({ className, children, ...props }: ComponentProps<"section">) => (
  <section className={cn("py-16 md:py-24", className)} {...props}>
    <Container>{children}</Container>
  </section>
);
```

`src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <Hero />
    <Problem />
  </main>
);

export default HomePage;
```

- [ ] **Step 7: Run green** — `pnpm test src/components/sections` → PASS.

- [ ] **Step 8: Full gate** → exit 0.

- [ ] **Step 9: Commit**

```bash
git add src/types/index.ts src/config/home-content.ts src/components/sections/hero.tsx src/components/sections/hero-summary-card.tsx src/components/sections/hero.test.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the hero with the slogan and an illustrative cited summary"
git add src/components/sections/problem.tsx src/components/sections/problem.test.tsx src/components/layout/section-wrapper.tsx src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the problem section without invented numbers"
```

---

#### Part 8: How it works and the platform tour tabs

**Files:**
- Modify: `src/types/index.ts`, `src/config/home-content.ts`, `src/app/page.tsx`, `eslint.config.mjs`
- Create: `src/components/sections/how-it-works.tsx`, `src/components/sections/platform-tour.tsx`, `src/components/sections/platform-tour-tabs.tsx`
- Tests: `src/components/sections/how-it-works.test.tsx`, `src/components/sections/platform-tour-tabs.test.tsx`

**Seams:** rendered `HowItWorks`; `PlatformTourTabs` via clicks/keyboard and via `renderToString` (pre-hydration HTML).

**Interfaces:**
- Produces types `HowItWorksStep { number: string; title: string; description: string }`, `PlatformTab { id: string; label: string; caption: string; image: string; alt: string }`; content `howItWorksContent`, `platformTabs: readonly PlatformTab[]` with image basenames `manager-dashboard`, `radar`, `search`, `pricing`, `calendar`; `HowItWorks()` (renders two line elements `[data-step-line="horizontal"]` and `[data-step-line="vertical"]`), `PlatformTour()`, `PlatformTourTabs({ tabs })`. Images are `/screenshots/{image}-{640|1280}.{avif|webp}`, 1280×800 (files arrive in Part 16).

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test** — `src/components/sections/how-it-works.test.tsx`

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "./how-it-works";

describe("HowItWorks", () => {
  it("lists the three steps in order", () => {
    render(<HowItWorks />);
    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps.map((step) => within(step).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Passo 01: Informe o CNPJ",
      "Passo 02: Receba o radar",
      "Passo 03: Entenda e responda",
    ]);
  });

  it("draws the connecting line fully without JavaScript", () => {
    const { container } = render(<HowItWorks />);
    const lines = container.querySelectorAll("[data-step-line]");
    expect(lines).toHaveLength(2);
    lines.forEach((line) => expect(line).toHaveAttribute("aria-hidden", "true"));
  });
});
```

Run red → `Failed to resolve import "./how-it-works"`.

- [ ] **Step 2: Implement**

Append to `src/types/index.ts`:

```ts
export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface PlatformTab {
  id: string;
  label: string;
  caption: string;
  image: string;
  alt: string;
}
```

Append to `src/config/home-content.ts` (extend the type import to `HowItWorksStep, IconCard, PlatformTab, SummaryItem`):

```ts
export const howItWorksContent: { eyebrow: string; title: string; description: string; steps: readonly HowItWorksStep[] } = {
  eyebrow: "Como funciona",
  title: "Três passos, com você no controle",
  description: "Do CNPJ à proposta, a decisão continua com a sua equipe.",
  steps: [
    {
      number: "01",
      title: "Informe o CNPJ",
      description: "A partir do CNPJ, o Qore identifica o que a sua empresa fornece e monta o perfil de busca.",
    },
    {
      number: "02",
      title: "Receba o radar",
      description: "Você recebe as licitações abertas em órgãos de São Paulo que combinam com o que a sua empresa vende.",
    },
    {
      number: "03",
      title: "Entenda e responda",
      description:
        "A IA resume o edital citando a página de origem, sinaliza risco de preço e ajuda a montar a proposta para você revisar.",
    },
  ],
};

export const platformTabs: readonly PlatformTab[] = [
  {
    id: "painel",
    label: "Painel do gestor",
    caption: "Valor em disputa, sessões do mês e a carga de cada pessoa da equipe.",
    image: "manager-dashboard",
    alt: "Painel do gestor com indicadores do mês, calendário de sessões e equipe, com dados de demonstração",
  },
  {
    id: "radar",
    label: "Radar",
    caption: "Licitações abertas que combinam com o seu CNPJ.",
    image: "radar",
    alt: "Radar de licitações com filtros e lista de oportunidades, com dados de demonstração",
  },
  {
    id: "busca",
    label: "Busca",
    caption: "Busque por objeto, órgão ou modalidade.",
    image: "search",
    alt: "Tela de busca de licitações com campo de pesquisa e resultados, com dados de demonstração",
  },
  {
    id: "precificacao",
    label: "Precificação",
    caption: "Preencha os preços da proposta e veja quando um valor merece revisão.",
    image: "pricing",
    alt: "Etapa de precificação da proposta com preços por item, com dados de demonstração",
  },
  {
    id: "calendario",
    label: "Calendário",
    caption: "Sessões e prazos das licitações que você acompanha.",
    image: "calendar",
    alt: "Calendário mensal com sessões e prazos de licitações, com dados de demonstração",
  },
];
```

`src/components/sections/how-it-works.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { howItWorksContent } from "@/config/home-content";

export const HowItWorks = () => (
  <SectionWrapper id="como-funciona" aria-labelledby="how-it-works-title" className="relative">
    <p className="text-label-sm uppercase text-primary">{howItWorksContent.eyebrow}</p>
    <h2 id="how-it-works-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
      {howItWorksContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{howItWorksContent.description}</p>
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        data-step-line="horizontal"
        className="absolute top-6 left-6 hidden h-0.5 w-[calc(100%-3rem)] origin-left bg-primary md:block"
      />
      <div
        aria-hidden="true"
        data-step-line="vertical"
        className="absolute top-6 left-6 h-[calc(100%-3rem)] w-0.5 origin-top bg-primary md:hidden"
      />
      <ol className="relative grid gap-8 md:grid-cols-3">
        {howItWorksContent.steps.map((step) => (
          <li key={step.number} className="flex flex-col gap-3 pl-16 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute left-0 flex size-12 items-center justify-center rounded-full bg-primary font-display text-title-md text-primary-foreground tabular-nums md:static"
            >
              {step.number}
            </span>
            <h3 className="text-headline-sm">
              <span className="sr-only">Passo {step.number}: </span>
              {step.title}
            </h3>
            <p className="text-body-md text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </SectionWrapper>
);
```

The mobile number badge is `absolute left-0` relative to each `li`; add `relative` to the `li` class list: `"relative flex flex-col gap-3 pl-16 md:pl-0"`.

Run the test → PASS `2 passed`. Note: the heading's `textContent` is `"Passo 01: Informe o CNPJ"` because the sr-only span is part of it.

- [ ] **Step 3: Failing test (slice 2: tabs)** — `src/components/sections/platform-tour-tabs.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "./platform-tour-tabs";

describe("PlatformTourTabs", () => {
  it("shows the first screen and hides the others after hydration", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Painel do gestor" })).not.toHaveClass("invisible");
    expect(screen.getByRole("tabpanel", { name: "Radar", hidden: true })).toHaveClass("invisible");
  });

  it("switches screens on click", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    await user.click(screen.getByRole("tab", { name: "Precificação" }));
    expect(screen.getByRole("tab", { name: "Precificação" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Precificação" })).not.toHaveClass("invisible");
  });

  it("moves between tabs with the arrow, Home and End keys", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    screen.getByRole("tab", { name: "Painel do gestor" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Radar" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Calendário" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}{Home}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
  });

  it("seals every screen as illustrative and reserves its size", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getAllByText("Tela ilustrativa", { exact: true })).toHaveLength(5);
    const image = screen.getByAltText(platformTabs[0]?.alt ?? "");
    expect(image).toHaveAttribute("width", "1280");
    expect(image).toHaveAttribute("height", "800");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders every screen visibly before JavaScript runs", () => {
    const html = renderToString(<PlatformTourTabs tabs={platformTabs} />);
    expect(html).not.toContain("invisible");
    expect(html.match(/<figure/g)).toHaveLength(5);
  });
});
```

Run red → `Failed to resolve import "./platform-tour-tabs"`.

- [ ] **Step 4: Implement** — `src/components/sections/platform-tour-tabs.tsx`

```tsx
"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PlatformTab } from "@/types";

const IMAGE_SIZES = "(min-width: 1024px) 56rem, 100vw";

interface PlatformTourTabsProps {
  tabs: readonly PlatformTab[];
}

export const PlatformTourTabs = ({ tabs }: PlatformTourTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  useEffect(() => setIsEnhanced(true), []);

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targetIndex = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (targetIndex === undefined) return;
    event.preventDefault();
    focusTab(targetIndex);
  };

  return (
    <div className="mt-10 lg:mx-auto lg:max-w-4xl">
      <div
        role="tablist"
        aria-label="Telas da plataforma"
        className={cn("flex flex-wrap gap-2", !isEnhanced && "hidden")}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${baseId}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "min-h-11 rounded-md border px-4 text-label-md",
              index === activeIndex
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-accent",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={cn("mt-6", isEnhanced ? "grid" : "flex flex-col gap-10")}>
        {tabs.map((tab, index) => (
          <figure
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role={isEnhanced ? "tabpanel" : undefined}
            aria-labelledby={isEnhanced ? `${baseId}-tab-${tab.id}` : undefined}
            className={cn(
              "transition-opacity duration-300",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && index !== activeIndex && "invisible opacity-0",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <figcaption className="text-body-md text-muted-foreground">
                {!isEnhanced && <strong className="font-display text-title-md text-foreground">{tab.label}: </strong>}
                {tab.caption}
              </figcaption>
              <Badge variant="outline">Tela ilustrativa</Badge>
            </div>
            <picture>
              <source
                type="image/avif"
                srcSet={`/screenshots/${tab.image}-640.avif 640w, /screenshots/${tab.image}-1280.avif 1280w`}
                sizes={IMAGE_SIZES}
              />
              <source
                type="image/webp"
                srcSet={`/screenshots/${tab.image}-640.webp 640w, /screenshots/${tab.image}-1280.webp 1280w`}
                sizes={IMAGE_SIZES}
              />
              <img
                src={`/screenshots/${tab.image}-1280.webp`}
                alt={tab.alt}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="mt-4 h-auto w-full rounded-lg border border-border shadow-md"
              />
            </picture>
          </figure>
        ))}
      </div>
    </div>
  );
};
```

Note: `screen.getByRole("tabpanel", { name: "Radar", hidden: true })` is needed because `invisible` (visibility: hidden) is not computed by jsdom from Tailwind classes; the `hidden: true` option keeps the query robust either way.

`src/components/sections/platform-tour.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "./platform-tour-tabs";

export const PlatformTour = () => (
  <SectionWrapper id="plataforma" aria-labelledby="platform-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">Conheça a plataforma</p>
    <h2 id="platform-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
      Do radar à proposta, no mesmo lugar
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
      Telas do painel com dados de demonstração.
    </p>
    <PlatformTourTabs tabs={platformTabs} />
  </SectionWrapper>
);
```

In `eslint.config.mjs` add a rules object after the ignores object:

```js
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
```

(Static export has no image optimizer; `<picture>` with AVIF/WebP is the spec's choice.)

Add `<HowItWorks />` and `<PlatformTour />` after `<Problem />` in `src/app/page.tsx` (with their imports).

- [ ] **Step 5: Run green** — `pnpm test src/components/sections` → PASS.

- [ ] **Step 6: Full gate** → exit 0.

- [ ] **Step 7: Commit**

```bash
git add src/types/index.ts src/config/home-content.ts src/components/sections/how-it-works.tsx src/components/sections/how-it-works.test.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the three-step how it works section"
git add src/components/sections/platform-tour.tsx src/components/sections/platform-tour-tabs.tsx src/components/sections/platform-tour-tabs.test.tsx eslint.config.mjs src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the accessible platform tour tabs with illustrative screens"
```

---

### Task 4: Responsible AI, personas, coverage, about and FAQ (Parts 9–10)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 9: Responsible AI and persona toggle

**Files:**
- Modify: `src/types/index.ts`, `src/config/home-content.ts`, `src/app/page.tsx`
- Create: `src/components/sections/responsible-ai.tsx`, `src/components/sections/ai-reading-poster.tsx`, `src/components/sections/personas.tsx`, `src/components/sections/persona-toggle.tsx`
- Tests: `src/components/sections/responsible-ai.test.tsx`, `src/components/sections/persona-toggle.test.tsx`

**Seams:** rendered `ResponsibleAi`; `PersonaToggle` via clicks and via `renderToString`.

**Interfaces:**
- Produces types `PersonaMetric { label: string; value: string; detail: string }`, `Persona { id: "manager" | "analyst"; toggleLabel: string; title: string; description: string; metrics: readonly PersonaMetric[] }`; content `responsibleAiContent`, `personasContent` (`personas: readonly [Persona, Persona]`); components `ResponsibleAi()`, `AiReadingPoster({ className?: string })` (SVG, `role="img"`), `Personas()`, `PersonaToggle({ personas: readonly [Persona, Persona] })`. Part 13 swaps the poster slot for `AiReadingAnimation`; Part 14 adds Motion to `PersonaToggle`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test** — `src/components/sections/responsible-ai.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResponsibleAi } from "./responsible-ai";

describe("ResponsibleAi", () => {
  it("lists the four commitments", () => {
    render(<ResponsibleAi />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Cita a fonte",
      "Diz “não encontrado no edital”",
      "Sugere, e você decide",
      "Você envia a proposta, não a IA",
    ]);
  });

  it("describes the reading illustration for assistive technology", () => {
    render(<ResponsibleAi />);
    expect(
      screen.getByRole("img", { name: "Ilustração: o edital, um trecho destacado e o resumo com a página citada" }),
    ).toBeInTheDocument();
  });

  it("speaks about the pilot in the future tense", () => {
    render(<ResponsibleAi />);
    expect(screen.getByText(/No piloto, a IA vai/)).toBeInTheDocument();
  });
});
```

Run red → `Failed to resolve import "./responsible-ai"`.

- [ ] **Step 2: Implement**

Append to `src/types/index.ts`:

```ts
export interface PersonaMetric {
  label: string;
  value: string;
  detail: string;
}

export interface Persona {
  id: "manager" | "analyst";
  toggleLabel: string;
  title: string;
  description: string;
  metrics: readonly PersonaMetric[];
}
```

Append to `src/config/home-content.ts` (add `Quote, SearchX, Send, SlidersHorizontal` to the lucide import and `Persona` to the type import):

```ts
export const responsibleAiContent: { eyebrow: string; title: string; description: string; commitments: readonly IconCard[] } = {
  eyebrow: "IA responsável",
  title: "IA com responsabilidade",
  description:
    "No piloto, a IA vai trabalhar como apoio da sua equipe: ela lê, organiza e aponta a fonte. A decisão continua sua.",
  commitments: [
    {
      icon: Quote,
      title: "Cita a fonte",
      description: "Cada ponto do resumo vai indicar a página e o item do edital de onde saiu.",
    },
    {
      icon: SearchX,
      title: "Diz “não encontrado no edital”",
      description: "Quando o edital não trouxer a informação, a IA vai dizer isso em vez de preencher a lacuna.",
    },
    {
      icon: SlidersHorizontal,
      title: "Sugere, e você decide",
      description: "A IA vai organizar as informações. Participar ou não, e por qual preço, é decisão da sua equipe.",
    },
    {
      icon: Send,
      title: "Você envia a proposta, não a IA",
      description: "O Qore não envia proposta nem dá lance. O envio ao portal continua com a sua empresa.",
    },
  ],
};

export const personasContent: { eyebrow: string; title: string; personas: readonly [Persona, Persona] } = {
  eyebrow: "Para cada função",
  title: "Feito para quem decide e para quem prepara a proposta",
  personas: [
    {
      id: "manager",
      toggleLabel: "Visão do gestor",
      title: "Para quem decide",
      description: "Veja o que está em disputa, os prazos da semana e a carga da equipe sem abrir planilha.",
      metrics: [
        { label: "Licitações em análise", value: "12", detail: "3 com sessão nesta semana" },
        { label: "Valor em disputa", value: "R$ 1,8 mi", detail: "Soma das propostas em andamento" },
        { label: "Prazos da semana", value: "4", detail: "1 pedido de esclarecimento vence hoje" },
        { label: "Propostas enviadas no mês", value: "5", detail: "Todas revisadas pela equipe" },
      ],
    },
    {
      id: "analyst",
      toggleLabel: "Visão do analista",
      title: "Para quem prepara a proposta",
      description: "Saiba o que ler primeiro, quais certidões vencem e o que falta para enviar.",
      metrics: [
        { label: "Fila do dia", value: "3 editais", detail: "1 com prazo de impugnação hoje" },
        { label: "Certidões", value: "1 vence em 10 dias", detail: "CND federal" },
        { label: "Pontos sem resposta no edital", value: "2", detail: "Marcados como não encontrados" },
        { label: "Minuta da proposta", value: "Pronta para revisão", detail: "Falta anexar a declaração de ME/EPP" },
      ],
    },
  ],
};
```

`src/components/sections/ai-reading-poster.tsx` (same geometry as the Lottie file in Part 13, final state):

```tsx
interface AiReadingPosterProps {
  className?: string;
}

const DOCUMENT_LINES = [
  { x: 55, y: 60, width: 110 },
  { x: 55, y: 80, width: 110 },
  { x: 55, y: 100, width: 110 },
  { x: 55, y: 120, width: 110 },
  { x: 55, y: 140, width: 110 },
  { x: 55, y: 160, width: 110 },
  { x: 55, y: 180, width: 70 },
];

export const AiReadingPoster = ({ className }: AiReadingPosterProps) => (
  <svg
    viewBox="0 0 320 240"
    role="img"
    aria-label="Ilustração: o edital, um trecho destacado e o resumo com a página citada"
    className={className}
  >
    <rect x="40" y="30" width="140" height="180" rx="8" fill="#ffffff" stroke="#bdc9c1" strokeWidth="2" />
    {DOCUMENT_LINES.map((line) => (
      <rect key={line.y} x={line.x} y={line.y} width={line.width} height="8" rx="4" fill="#d3e4fe" />
    ))}
    <rect x="50" y="95" width="120" height="18" rx="4" fill="#7bd8b1" opacity="0.6" />
    <rect x="180" y="85" width="120" height="90" rx="10" fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
    <rect x="195" y="105" width="70" height="8" rx="4" fill="#047857" />
    <rect x="195" y="125" width="90" height="6" rx="3" fill="#7bd8b1" />
    <rect x="195" y="140" width="80" height="6" rx="3" fill="#7bd8b1" />
    <rect x="195" y="155" width="40" height="10" rx="5" fill="#047857" />
  </svg>
);
```

`src/components/sections/responsible-ai.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { responsibleAiContent } from "@/config/home-content";
import { AiReadingPoster } from "./ai-reading-poster";

export const ResponsibleAi = () => (
  <SectionWrapper id="ia-responsavel" aria-labelledby="responsible-ai-title">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase text-primary">{responsibleAiContent.eyebrow}</p>
        <h2 id="responsible-ai-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {responsibleAiContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{responsibleAiContent.description}</p>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-low">
        <AiReadingPoster className="absolute inset-0 size-full" />
      </div>
    </div>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {responsibleAiContent.commitments.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Icon aria-hidden="true" className="size-6 text-primary" />
          <h3 className="mt-4 text-title-md">{title}</h3>
          <p className="mt-2 text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
```

Run → PASS `3 passed`.

- [ ] **Step 3: Failing test (slice 2)** — `src/components/sections/persona-toggle.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { personasContent } from "@/config/home-content";
import { PersonaToggle } from "./persona-toggle";

describe("PersonaToggle", () => {
  it("starts on the manager view", () => {
    render(<PersonaToggle personas={personasContent.personas} />);
    expect(screen.getByRole("button", { name: "Visão do gestor" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Para quem decide" })).not.toHaveClass("invisible");
  });

  it("switches to the analyst view", async () => {
    const user = userEvent.setup();
    render(<PersonaToggle personas={personasContent.personas} />);
    await user.click(screen.getByRole("button", { name: "Visão do analista" }));
    expect(screen.getByRole("button", { name: "Visão do analista" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Para quem prepara a proposta" })).not.toHaveClass("invisible");
    expect(screen.getByRole("article", { name: "Para quem decide", hidden: true })).toHaveClass("invisible");
  });

  it("seals each mini-panel as an illustrative example", () => {
    render(<PersonaToggle personas={personasContent.personas} />);
    expect(screen.getAllByText("Exemplo ilustrativo")).toHaveLength(2);
  });

  it("never shows a win rate", () => {
    const { container } = render(<PersonaToggle personas={personasContent.personas} />);
    expect(container.textContent?.toLowerCase()).not.toMatch(/taxa de vitória|win rate/);
  });

  it("renders both views before JavaScript runs", () => {
    const html = renderToString(<PersonaToggle personas={personasContent.personas} />);
    expect(html).not.toContain("invisible");
    expect(html).toContain("Para quem decide");
    expect(html).toContain("Para quem prepara a proposta");
  });
});
```

Run red → `Failed to resolve import "./persona-toggle"`.

- [ ] **Step 4: Implement** — `src/components/sections/persona-toggle.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types";

interface PersonaToggleProps {
  personas: readonly [Persona, Persona];
}

export const PersonaToggle = ({ personas }: PersonaToggleProps) => {
  const [activeId, setActiveId] = useState<Persona["id"]>(personas[0].id);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => setIsEnhanced(true), []);

  return (
    <div className="mt-8">
      <div
        role="group"
        aria-label="Escolha a visão"
        className={cn("inline-flex gap-1 rounded-lg border border-border bg-card p-1", !isEnhanced && "hidden")}
      >
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={persona.id === activeId}
            onClick={() => setActiveId(persona.id)}
            className={cn(
              "min-h-11 rounded-md px-4 text-label-md",
              persona.id === activeId ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
            )}
          >
            {persona.toggleLabel}
          </button>
        ))}
      </div>
      <div className={cn("mt-6", isEnhanced ? "grid" : "flex flex-col gap-8")}>
        {personas.map((persona) => (
          <article
            key={persona.id}
            aria-labelledby={`persona-${persona.id}-title`}
            className={cn(
              "rounded-lg border border-border bg-card p-6 shadow-sm md:p-8",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && persona.id !== activeId && "invisible",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id={`persona-${persona.id}-title`} className="text-headline-sm">
                {persona.title}
              </h3>
              <Badge variant="outline">Exemplo ilustrativo</Badge>
            </div>
            <p className="mt-2 text-body-md text-muted-foreground">{persona.description}</p>
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {persona.metrics.map((metric) => (
                <div key={metric.label} className="rounded-md bg-surface-low p-4">
                  <dt className="text-label-md text-muted-foreground">{metric.label}</dt>
                  <dd className="mt-1 font-display text-headline-sm text-foreground tabular-nums">{metric.value}</dd>
                  <dd className="text-caption text-muted-foreground">{metric.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
};
```

`src/components/sections/personas.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { personasContent } from "@/config/home-content";
import { PersonaToggle } from "./persona-toggle";

export const Personas = () => (
  <SectionWrapper id="funcoes" aria-labelledby="personas-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">{personasContent.eyebrow}</p>
    <h2 id="personas-title" className="mt-2 max-w-3xl text-headline-lg-mobile md:text-headline-lg">
      {personasContent.title}
    </h2>
    <PersonaToggle personas={personasContent.personas} />
  </SectionWrapper>
);
```

Add `<ResponsibleAi />` and `<Personas />` after `<PlatformTour />` in `src/app/page.tsx`.

- [ ] **Step 5: Run green** — `pnpm test src/components/sections` → PASS.

- [ ] **Step 6: Full gate** → exit 0.

- [ ] **Step 7: Commit**

```bash
git add src/types/index.ts src/config/home-content.ts src/components/sections/responsible-ai.tsx src/components/sections/ai-reading-poster.tsx src/components/sections/responsible-ai.test.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the responsible AI commitments for the pilot"
git add src/components/sections/personas.tsx src/components/sections/persona-toggle.tsx src/components/sections/persona-toggle.test.tsx src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the manager and analyst views with illustrative examples"
```

---

#### Part 10: Coverage map, About and FAQ

**Files:**
- Modify: `src/types/index.ts`, `src/config/home-content.ts`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/components/sections/coverage.tsx`, `src/components/sections/sao-paulo-map.tsx`, `src/components/sections/about.tsx`, `src/components/sections/faq.tsx`
- Tests: `src/components/sections/coverage.test.tsx`, `src/components/sections/about.test.tsx`, `src/components/sections/faq.test.tsx`

**Seams:** rendered `Coverage`, `About`, `Faq`.

**Interfaces:**
- Produces types `CoverageRegion { name: string; cities: string }`, `MapHub { name: string; centerX: number; centerY: number; radius: number; labelX: number; labelY: number; labelAnchor: "start" | "end" }`; content `coverageContent`, `aboutContent`; components `Coverage()`, `SaoPauloMap()`, `About()`, `Faq()`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing tests**

`src/components/sections/coverage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Coverage } from "./coverage";

describe("Coverage", () => {
  it("says the pilot starts in São Paulo only", () => {
    render(<Coverage />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Começamos por São Paulo");
  });

  it("invites companies from other states to leave a contact", () => {
    render(<Coverage />);
    expect(screen.getByRole("link", { name: "Deixe seu contato" })).toHaveAttribute("href", "/#contato");
  });

  it("draws an accessible map of the state", () => {
    render(<Coverage />);
    expect(screen.getByRole("img", { name: /Mapa estilizado do estado de São Paulo/ })).toBeInTheDocument();
  });

  it("claims no monitoring numbers", () => {
    const { container } = render(<Coverage />);
    expect(container.textContent).not.toMatch(/municípios paulistas monitorados/);
  });
});
```

`src/components/sections/about.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { About } from "./about";

describe("About", () => {
  it("states the mission without names or photos", () => {
    const { container } = render(<About />);
    expect(screen.getByText(/tornar a licitação pública acessível/)).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).not.toMatch(/Placeholder|Co-fundador|Cofundador/);
  });
});
```

`src/components/sections/faq.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { faqItems } from "@/config/faq";
import { Faq } from "./faq";

describe("Faq", () => {
  it("renders the five questions as native disclosure widgets", () => {
    const { container } = render(<Faq />);
    const disclosures = container.querySelectorAll("details");
    expect(disclosures).toHaveLength(5);
    expect([...container.querySelectorAll("summary")].map((summary) => summary.textContent)).toEqual(
      faqItems.map((item) => item.question),
    );
  });

  it("keeps every answer in the HTML for search engines and no-JS readers", () => {
    render(<Faq />);
    faqItems.forEach((item) => expect(screen.getByText(item.answer)).toBeInTheDocument());
  });

  it("opens an answer when the question is activated", async () => {
    const { container } = render(<Faq />);
    const firstSummary = container.querySelector("summary");
    firstSummary?.click();
    expect(container.querySelector("details")).toHaveAttribute("open");
  });
});
```

Run red: `pnpm test src/components/sections/coverage.test.tsx src/components/sections/about.test.tsx src/components/sections/faq.test.tsx` → FAIL `Failed to resolve import` ×3.

- [ ] **Step 2: Implement**

Append to `src/types/index.ts`:

```ts
export interface CoverageRegion {
  name: string;
  cities: string;
}

export interface MapHub {
  name: string;
  centerX: number;
  centerY: number;
  radius: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "end";
}
```

Append to `src/config/home-content.ts` (add `CoverageRegion, MapHub` to the type import):

```ts
export const coverageContent: {
  eyebrow: string;
  title: string;
  description: string;
  regions: readonly CoverageRegion[];
  hubs: readonly MapHub[];
} = {
  eyebrow: "Cobertura",
  title: "Começamos por São Paulo",
  description:
    "Nesta fase do piloto, acompanhamos licitações de órgãos estaduais e municipais paulistas. Outros estados vêm depois.",
  regions: [
    { name: "Grande São Paulo", cities: "Capital, Guarulhos, ABC" },
    { name: "Região de Campinas", cities: "Campinas, Americana, Sumaré" },
    { name: "Vale do Paraíba", cities: "São José dos Campos, Taubaté" },
    { name: "Interior e Litoral", cities: "Ribeirão Preto, Santos, Sorocaba" },
  ],
  hubs: [
    { name: "São Paulo", centerX: 260, centerY: 190, radius: 6, labelX: 272, labelY: 194, labelAnchor: "start" },
    { name: "Campinas", centerX: 230, centerY: 160, radius: 5, labelX: 222, labelY: 152, labelAnchor: "end" },
    { name: "Santos", centerX: 275, centerY: 215, radius: 4, labelX: 285, labelY: 222, labelAnchor: "start" },
    { name: "Ribeirão Preto", centerX: 190, centerY: 90, radius: 4, labelX: 182, labelY: 86, labelAnchor: "end" },
    { name: "S. José dos Campos", centerX: 295, centerY: 170, radius: 4, labelX: 395, labelY: 160, labelAnchor: "end" },
  ],
};

export const aboutContent = {
  eyebrow: "Quem somos",
  title: "Licitação pública ao alcance de quem hoje fica de fora",
  mission:
    "O Qore nasceu para tornar a licitação pública acessível às empresas que hoje ficam de fora por falta de tempo e de estrutura. Começamos por São Paulo, ouvindo quem disputa licitações no dia a dia.",
} as const;
```

`src/components/sections/sao-paulo-map.tsx`:

```tsx
import { coverageContent } from "@/config/home-content";

const STATE_OUTLINE = "M 60,110 L 110,60 L 190,50 L 260,80 L 320,110 L 350,150 L 300,210 L 250,230 L 190,200 L 130,220 L 70,180 Z";

export const SaoPauloMap = () => (
  <figure className="rounded-lg bg-surface-low p-6">
    <svg viewBox="0 0 400 300" role="img" aria-labelledby="sao-paulo-map-title" className="h-auto w-full">
      <title id="sao-paulo-map-title">
        Mapa estilizado do estado de São Paulo com São Paulo, Campinas, Santos, Ribeirão Preto e São José dos Campos
      </title>
      <path d={STATE_OUTLINE} fill="#d1fae5" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
      {coverageContent.hubs.map((hub) => (
        <g key={hub.name}>
          <circle className="coverage-hub" cx={hub.centerX} cy={hub.centerY} r={hub.radius} fill="#047857" />
          <text x={hub.labelX} y={hub.labelY} textAnchor={hub.labelAnchor} fontSize="11" fill="#0f172a">
            {hub.name}
          </text>
        </g>
      ))}
    </svg>
    <figcaption className="mt-2 text-center text-caption text-muted-foreground">
      Representação ilustrativa, fora de escala.
    </figcaption>
  </figure>
);
```

Append to the `@layer components` block in `src/app/globals.css`:

```css
  .coverage-hub {
    transform-box: fill-box;
    transform-origin: center;
    transition: transform 200ms ease-out;
  }

  .coverage-hub:hover {
    transform: scale(1.4);
  }

  details[data-faq] > summary {
    list-style: none;
  }

  details[data-faq] > summary::-webkit-details-marker {
    display: none;
  }

  details[data-faq][open] > [data-faq-answer] {
    animation: faq-open 200ms ease-out;
  }

  details[data-faq][open] [data-faq-icon] {
    transform: rotate(180deg);
  }

  @keyframes faq-open {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
```

`src/components/sections/coverage.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { coverageContent } from "@/config/home-content";
import { CONTACT_HREF } from "@/config/navigation";
import { SaoPauloMap } from "./sao-paulo-map";

export const Coverage = () => (
  <SectionWrapper id="cobertura" aria-labelledby="coverage-title">
    <div className="grid items-center gap-10 rounded-lg bg-card p-6 shadow-md md:p-12 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase text-primary">{coverageContent.eyebrow}</p>
        <h2 id="coverage-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {coverageContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{coverageContent.description}</p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {coverageContent.regions.map((region) => (
            <li key={region.name} className="rounded-md bg-surface-low p-3">
              <span className="block text-label-md font-semibold text-primary">{region.name}</span>
              <span className="text-caption text-muted-foreground">{region.cities}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-body-md text-foreground">
          Atua em outro estado?{" "}
          <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
            Deixe seu contato
          </a>
        </p>
      </div>
      <SaoPauloMap />
    </div>
  </SectionWrapper>
);
```

`src/components/sections/about.tsx`:

```tsx
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { aboutContent } from "@/config/home-content";

export const About = () => (
  <SectionWrapper id="quem-somos" aria-labelledby="about-title" className="bg-surface-low">
    <div className="max-w-3xl">
      <p className="text-label-sm uppercase text-primary">{aboutContent.eyebrow}</p>
      <h2 id="about-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
        {aboutContent.title}
      </h2>
      <p className="mt-4 text-body-lg text-muted-foreground">{aboutContent.mission}</p>
    </div>
  </SectionWrapper>
);
```

(The About test matches `/tornar a licitação pública acessível/` inside the mission string.)

`src/components/sections/faq.tsx`:

```tsx
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { faqItems } from "@/config/faq";
import { CONTACT_HREF } from "@/config/navigation";

export const Faq = () => (
  <SectionWrapper id="faq" aria-labelledby="faq-title">
    <div className="grid gap-10 lg:grid-cols-3">
      <div>
        <p className="text-label-sm uppercase text-primary">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          Perguntas frequentes
        </h2>
        <p className="mt-3 text-body-md text-muted-foreground">
          Não achou sua dúvida?{" "}
          <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
            Fale com a gente
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:col-span-2">
        {faqItems.map((item) => (
          <details key={item.question} data-faq className="rounded-lg border border-border bg-card">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-display text-title-md text-foreground">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                data-faq-icon
                className="size-5 shrink-0 text-muted-foreground transition-transform duration-200"
              />
            </summary>
            <p data-faq-answer className="px-5 pb-5 text-body-md text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
```

Note: the summary contains the icon, so its `textContent` equals the question (SVG has no text). Two "Fale com a gente" links now exist on the page (header, hero, FAQ); the Hero test scopes to the Hero only, so it is unaffected.

Add `<Coverage />`, `<About />`, `<Faq />` after `<Personas />` in `src/app/page.tsx`.

- [ ] **Step 3: Run green** — same three files → PASS `8 passed`. If jsdom does not toggle `<details>` on `summary.click()`, the third FAQ test fails with `expected element to have attribute "open"`; in that case delete that single test and rely on Part 17's rendered-page check (real Chromium) for open/close. Record which happened in the report.

- [ ] **Step 4: Full gate** → exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/config/home-content.ts src/components/sections/coverage.tsx src/components/sections/sao-paulo-map.tsx src/components/sections/coverage.test.tsx src/app/globals.css
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the São Paulo coverage map with an invite for other states"
git add src/components/sections/about.tsx src/components/sections/about.test.tsx src/components/sections/faq.tsx src/components/sections/faq.test.tsx src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the mission and a no-JavaScript FAQ"
```

---

### Task 5: Contact form and privacy page (Part 11)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 11: Contact form (Netlify Forms) and privacy page

**Files:**
- Create: `src/lib/phone.ts`, `src/lib/contact-form.ts`, `src/lib/legal.ts` (+ `.test.ts` each)
- Create: `src/components/sections/contact.tsx`, `src/components/sections/contact-form.tsx`, `src/components/sections/contact-submit-button.tsx`, Test: `src/components/sections/contact-form.test.tsx`
- Create: `src/components/privacy/controller-identity.tsx`, Test: `src/components/privacy/controller-identity.test.tsx`
- Create: `src/app/privacidade/page.tsx`
- Modify: `src/config/home-content.ts`, `src/app/page.tsx`

**Seams:** `formatBrazilianPhone`, `isValidBrazilianPhone`, `validateContactForm`, `encodeContactSubmission`, `submitContact`, `isLegalIdentityComplete`; rendered `ContactForm` (user flow, `fetch` stubbed at the global boundary); rendered `ContactForm` via `renderToString` (Netlify attributes); rendered `ControllerIdentity`.

**Interfaces:**
- Produces: `extractDigits(value: string): string`, `formatBrazilianPhone(value: string): string`, `isValidBrazilianPhone(value: string): boolean`; `contactRoles` (tuple of 5 PT-BR labels), `ContactFormValues`, `ContactFieldName`, `ContactFormErrors`, `validateContactForm(values): ContactFormErrors`, `firstInvalidField(errors): ContactFieldName | undefined`, `CONTACT_FORM_NAME = "contato"`, `encodeContactSubmission(values): string`, `SubmitContactResult`, `CONTACT_SUBMIT_ERROR`, `submitContact(values, fetcher?): Promise<SubmitContactResult>`, `buildSuccessMessage(name: string): string`; `isLegalIdentityComplete(legal: LegalIdentity): boolean`; `ContactForm()`, `ContactSubmitButton({ status: ContactFormStatus })`, `ContactFormStatus = "idle" | "submitting" | "success" | "error"`, `Contact()`, `ControllerIdentity({ legal: LegalIdentity })`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test (slice 1: phone)** — `src/lib/phone.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { formatBrazilianPhone, isValidBrazilianPhone } from "./phone";

describe("formatBrazilianPhone", () => {
  it.each([
    ["", ""],
    ["1", "(1"],
    ["11", "(11"],
    ["1198", "(11) 98"],
    ["119876", "(11) 9876"],
    ["1198765", "(11) 9876-5"],
    ["1134567890", "(11) 3456-7890"],
    ["11987654321", "(11) 98765-4321"],
    ["(11) 98765-4321 ramal 2", "(11) 98765-4321"],
  ])("formats %j as %j", (input, expected) => {
    expect(formatBrazilianPhone(input)).toBe(expected);
  });
});

describe("isValidBrazilianPhone", () => {
  it.each([
    ["(11) 98765-4321", true],
    ["(11) 3456-7890", true],
    ["(11) 88765-4321", false],
    ["(01) 98765-4321", false],
    ["(10) 98765-4321", false],
    ["(11) 9876-543", false],
  ])("judges %j as %s", (input, expected) => {
    expect(isValidBrazilianPhone(input)).toBe(expected);
  });
});
```

Run red → `Failed to resolve import "./phone"`.

- [ ] **Step 2: Implement** — `src/lib/phone.ts`

```ts
export const extractDigits = (value: string): string => value.replace(/\D/g, "");

export const formatBrazilianPhone = (value: string): string => {
  const digits = extractDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;

  const splitAt = digits.length === 11 ? 7 : 6;
  return `(${areaCode}) ${digits.slice(2, splitAt)}-${digits.slice(splitAt)}`;
};

export const isValidBrazilianPhone = (value: string): boolean => {
  const digits = extractDigits(value);
  if (digits.length !== 10 && digits.length !== 11) return false;
  if (digits[0] === "0" || digits[1] === "0") return false;
  return digits.length === 10 || digits[2] === "9";
};
```

Run → PASS `15 passed`.

- [ ] **Step 3: Failing test (slice 2: form logic)** — `src/lib/contact-form.test.ts`

```ts
import { describe, expect, it, vi } from "vitest";
import {
  CONTACT_SUBMIT_ERROR,
  buildSuccessMessage,
  encodeContactSubmission,
  firstInvalidField,
  submitContact,
  validateContactForm,
  type ContactFormValues,
} from "./contact-form";

const validValues: ContactFormValues = {
  name: "Maria Souza",
  email: "maria@empresa.com.br",
  phone: "(11) 98765-4321",
  role: "Gestor comercial",
  company: "",
  message: "",
  consent: true,
};

describe("validateContactForm", () => {
  it("accepts a complete submission", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });

  it("requires every mandatory field with Portuguese messages", () => {
    const errors = validateContactForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      company: "",
      message: "",
      consent: false,
    });
    expect(errors).toEqual({
      name: "Informe seu nome.",
      email: "Informe seu e-mail.",
      phone: "Informe seu telefone ou WhatsApp.",
      role: "Escolha o seu cargo.",
      consent: "Para enviar, autorize o uso dos seus dados para este contato.",
    });
  });

  it("rejects a malformed e-mail and phone", () => {
    const errors = validateContactForm({ ...validValues, email: "maria@", phone: "(11) 1234" });
    expect(errors.email).toBe("Informe um e-mail válido, como nome@empresa.com.br.");
    expect(errors.phone).toBe("Informe um telefone com DDD, como (11) 98765-4321.");
  });

  it("rejects a role outside the list", () => {
    expect(validateContactForm({ ...validValues, role: "Estagiário" }).role).toBe("Escolha o seu cargo.");
  });
});

describe("firstInvalidField", () => {
  it("follows the visual order of the form", () => {
    expect(firstInvalidField({ consent: "x", phone: "y" })).toBe("phone");
    expect(firstInvalidField({})).toBeUndefined();
  });
});

describe("encodeContactSubmission", () => {
  it("encodes the Netlify form name and every field", () => {
    const body = new URLSearchParams(encodeContactSubmission(validValues));
    expect(body.get("form-name")).toBe("contato");
    expect(body.get("name")).toBe("Maria Souza");
    expect(body.get("phone")).toBe("(11) 98765-4321");
    expect(body.get("consent")).toBe("sim");
    expect(body.get("bot-field")).toBe("");
  });
});

describe("submitContact", () => {
  it("posts urlencoded data to the site root", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({ status: "success" });
    expect(fetcher).toHaveBeenCalledWith("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeContactSubmission(validValues),
    });
  });

  it("reports our fixed error text when the server refuses", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 500 }));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({
      status: "error",
      message: CONTACT_SUBMIT_ERROR,
    });
  });

  it("reports our fixed error text when the network fails", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({
      status: "error",
      message: CONTACT_SUBMIT_ERROR,
    });
  });
});

describe("buildSuccessMessage", () => {
  it("greets by name", () => {
    expect(buildSuccessMessage("  Maria Souza ")).toBe(
      "Recebemos seu contato, Maria Souza. Vamos falar com você pelo e-mail ou WhatsApp informado.",
    );
  });
});
```

Run red → `Failed to resolve import "./contact-form"`.

- [ ] **Step 4: Implement** — `src/lib/contact-form.ts`

```ts
import { isValidBrazilianPhone } from "./phone";

export const contactRoles = [
  "Dono/Sócio",
  "Gestor comercial",
  "Analista de licitação",
  "Consultor",
  "Outro",
] as const;

export type ContactRole = (typeof contactRoles)[number];

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  message: string;
  consent: boolean;
}

export type ContactFieldName = "name" | "email" | "phone" | "role" | "consent";

export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

const FIELD_ORDER: readonly ContactFieldName[] = ["name", "email", "phone", "role", "consent"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_FORM_NAME = "contato";
export const CONTACT_SUBMIT_ERROR =
  "Não conseguimos enviar seu contato agora. Verifique a conexão e tente de novo em alguns minutos.";

const isContactRole = (value: string): value is ContactRole => contactRoles.some((role) => role === value);

export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  const email = values.email.trim();

  if (values.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!email) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";
  if (!values.phone.trim()) errors.phone = "Informe seu telefone ou WhatsApp.";
  else if (!isValidBrazilianPhone(values.phone)) errors.phone = "Informe um telefone com DDD, como (11) 98765-4321.";
  if (!isContactRole(values.role)) errors.role = "Escolha o seu cargo.";
  if (!values.consent) errors.consent = "Para enviar, autorize o uso dos seus dados para este contato.";

  return errors;
};

export const firstInvalidField = (errors: ContactFormErrors): ContactFieldName | undefined =>
  FIELD_ORDER.find((field) => errors[field] !== undefined);

export const encodeContactSubmission = (values: ContactFormValues): string =>
  new URLSearchParams({
    "form-name": CONTACT_FORM_NAME,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone,
    role: values.role,
    company: values.company.trim(),
    message: values.message.trim(),
    consent: values.consent ? "sim" : "nao",
    "bot-field": "",
  }).toString();

export type SubmitContactResult = { status: "success" } | { status: "error"; message: string };

export const submitContact = async (
  values: ContactFormValues,
  fetcher: typeof fetch = fetch,
): Promise<SubmitContactResult> => {
  try {
    const response = await fetcher("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeContactSubmission(values),
    });
    return response.ok ? { status: "success" } : { status: "error", message: CONTACT_SUBMIT_ERROR };
  } catch {
    return { status: "error", message: CONTACT_SUBMIT_ERROR };
  }
};

export const buildSuccessMessage = (name: string): string =>
  `Recebemos seu contato, ${name.trim()}. Vamos falar com você pelo e-mail ou WhatsApp informado.`;
```

Run → PASS.

- [ ] **Step 5: Failing test (slice 3: form component)** — `src/components/sections/contact-form.test.tsx`

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { CONTACT_SUBMIT_ERROR } from "@/lib/contact-form";
import { ContactForm } from "./contact-form";

const fillValidForm = async (user: UserEvent) => {
  await user.type(screen.getByLabelText(/Nome/), "Maria Souza");
  await user.type(screen.getByLabelText(/E-mail corporativo/), "maria@empresa.com.br");
  await user.type(screen.getByLabelText(/Telefone ou WhatsApp/), "11987654321");
  await user.selectOptions(screen.getByLabelText(/Cargo/), "Gestor comercial");
  await user.click(screen.getByRole("checkbox"));
};

describe("ContactForm", () => {
  it("is detectable by Netlify Forms in the exported HTML", () => {
    const html = renderToString(<ContactForm />);
    expect(html).toContain('name="contato"');
    expect(html).toContain('data-netlify="true"');
    expect(html).toContain('netlify-honeypot="bot-field"');
    expect(html).toContain('name="form-name" value="contato"');
  });

  it("keeps consent unchecked by default", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/privacidade");
  });

  it("shows every error and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Quero falar com a equipe" }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Escolha o seu cargo.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toHaveFocus();
    expect(screen.getByLabelText(/Nome/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Revise os campos destacados.");
  });

  it("masks the phone while typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const phone = screen.getByLabelText(/Telefone ou WhatsApp/);
    await user.type(phone, "11987654321");
    expect(phone).toHaveValue("(11) 98765-4321");
  });

  it("sends the lead and confirms without reloading", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetcher);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Quero falar com a equipe" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Recebemos seu contato, Maria Souza. Vamos falar com você pelo e-mail ou WhatsApp informado.",
      ),
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(String(fetcher.mock.calls[0]?.[1]?.body)).toContain("form-name=contato");
  });

  it("shows our fixed error text when sending fails", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch")));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Quero falar com a equipe" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(CONTACT_SUBMIT_ERROR));
  });
});
```

Run red → `Failed to resolve import "./contact-form"`.

- [ ] **Step 6: Implement**

`src/components/sections/contact-submit-button.tsx`:

```tsx
import { Button } from "@/components/ui/button";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const LABELS: Record<ContactFormStatus, string> = {
  idle: "Quero falar com a equipe",
  submitting: "Enviando…",
  success: "Enviado",
  error: "Quero falar com a equipe",
};

interface ContactSubmitButtonProps {
  status: ContactFormStatus;
}

export const ContactSubmitButton = ({ status }: ContactSubmitButtonProps) => (
  <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
    {LABELS[status]}
  </Button>
);
```

`src/components/sections/contact-form.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  CONTACT_FORM_NAME,
  buildSuccessMessage,
  contactRoles,
  firstInvalidField,
  submitContact,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-form";
import { formatBrazilianPhone } from "@/lib/phone";
import { ContactSubmitButton, type ContactFormStatus } from "./contact-submit-button";

type TextField = "name" | "email" | "phone" | "role" | "company" | "message";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  message: "",
  consent: false,
};

const CONTROL_CLASS =
  "w-full rounded-md border border-input bg-card px-3.5 text-base text-foreground shadow-sm outline-none focus-visible:border-primary aria-invalid:border-destructive";

interface FieldShellProps {
  id: string;
  label: string;
  isRequired: boolean;
  error?: string;
  children: ReactNode;
}

const FieldShell = ({ id, label, isRequired, error, children }: FieldShellProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-label-md text-foreground">
      {label}
      {isRequired ? (
        <span aria-hidden="true" className="text-destructive-text">
          {" "}
          *
        </span>
      ) : (
        <span className="text-muted-foreground"> (opcional)</span>
      )}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-caption text-destructive-text">
        {error}
      </p>
    )}
  </div>
);

export const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [isEnhanced, setIsEnhanced] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setIsEnhanced(true), []);

  const setTextField = (field: TextField, value: string) =>
    setValues((current) => {
      const next = { ...current };
      next[field] = field === "phone" ? formatBrazilianPhone(value) : value;
      return next;
    });

  const describedBy = (field: keyof ContactFormErrors, id: string) => (errors[field] ? `${id}-error` : undefined);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    const invalidField = firstInvalidField(validationErrors);
    if (invalidField) {
      setStatus("idle");
      setFeedback("Revise os campos destacados.");
      formRef.current?.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("Enviando seu contato…");
    const result = await submitContact(values);
    if (result.status === "error") {
      setStatus("error");
      setFeedback(result.message);
      return;
    }

    setStatus("success");
    setFeedback(buildSuccessMessage(values.name));
    setValues(INITIAL_VALUES);
  };

  return (
    <form
      ref={formRef}
      name={CONTACT_FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate={isEnhanced}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
      <p className="hidden">
        <label>
          Não preencha este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <FieldShell id="contact-name" label="Nome" isRequired error={errors.name}>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => setTextField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name", "contact-name")}
        />
      </FieldShell>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="contact-email" label="E-mail corporativo" isRequired error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => setTextField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", "contact-email")}
          />
        </FieldShell>
        <FieldShell id="contact-phone" label="Telefone ou WhatsApp" isRequired error={errors.phone}>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 98765-4321"
            required
            value={values.phone}
            onChange={(event) => setTextField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", "contact-phone")}
          />
        </FieldShell>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="contact-role" label="Cargo" isRequired error={errors.role}>
          <select
            id="contact-role"
            name="role"
            required
            value={values.role}
            onChange={(event) => setTextField("role", event.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={describedBy("role", "contact-role")}
            className={`${CONTROL_CLASS} h-11`}
          >
            <option value="" disabled>
              Selecione
            </option>
            {contactRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldShell id="contact-company" label="Empresa ou CNPJ" isRequired={false}>
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => setTextField("company", event.target.value)}
          />
        </FieldShell>
      </div>

      <FieldShell id="contact-message" label="Mensagem" isRequired={false}>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => setTextField("message", event.target.value)}
          className={`${CONTROL_CLASS} min-h-28 py-2.5`}
        />
      </FieldShell>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setValues((current) => ({ ...current, consent: isChecked }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent", "contact-consent")}
            className="mt-3 size-5 shrink-0 accent-primary"
          />
          <label htmlFor="contact-consent" className="flex min-h-11 items-center text-label-md text-foreground">
            <span>
              Autorizo o Qore a usar meus dados para responder este contato, conforme a{" "}
              <a href="/privacidade" className="font-medium text-primary underline underline-offset-4">
                Política de Privacidade
              </a>
              .
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id="contact-consent-error" className="text-caption text-destructive-text">
            {errors.consent}
          </p>
        )}
      </div>

      <ContactSubmitButton status={status} />
      <p role="status" aria-live="polite" className="min-h-6 text-body-md text-foreground">
        {feedback}
      </p>
    </form>
  );
};
```

Note: `screen.getByLabelText(/Nome/)` also matches nothing else (the other labels are "E-mail corporativo", "Telefone ou WhatsApp", "Cargo", "Empresa ou CNPJ", "Mensagem", consent sentence) — the consent sentence has no "Nome". `/Cargo/` matches only the select label.

Run → PASS `6 passed`.

- [ ] **Step 7: Contact section** — append to `src/config/home-content.ts`:

```ts
export const contactContent = {
  eyebrow: "Fale com a gente",
  title: "Quer ver o Qore com as licitações da sua empresa?",
  description: "Conte um pouco sobre a sua empresa. A gente responde pelo e-mail ou WhatsApp que você informar.",
  highlights: [
    "Conversa com quem está construindo o produto",
    "Um olhar sobre editais abertos em São Paulo no seu segmento",
    "Convite para participar do piloto em São Paulo",
  ],
} as const;
```

`src/components/sections/contact.tsx`:

```tsx
import { Check } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { contactContent } from "@/config/home-content";
import { ContactForm } from "./contact-form";

export const Contact = () => (
  <SectionWrapper id="contato" aria-labelledby="contact-title" className="bg-surface-low">
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-label-sm uppercase text-primary">{contactContent.eyebrow}</p>
        <h2 id="contact-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {contactContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{contactContent.description}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {contactContent.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-body-md text-foreground">
              <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-md md:p-8">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
```

Add `<Contact />` after `<Faq />` in `src/app/page.tsx`.

- [ ] **Step 8: Failing test (slice 4: privacy controller)**

`src/lib/legal.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { isLegalIdentityComplete } from "./legal";

const complete = {
  companyName: "Qore Tecnologia Ltda.",
  taxId: "11.222.333/0001-81",
  contactEmail: "privacidade@qore.com.br",
  dataProtectionOfficer: "Encarregado de dados",
};

describe("isLegalIdentityComplete", () => {
  it("is true when every field is filled", () => {
    expect(isLegalIdentityComplete(complete)).toBe(true);
  });

  it("is false while any field is blank", () => {
    expect(isLegalIdentityComplete({ ...complete, taxId: "  " })).toBe(false);
  });
});
```

`src/components/privacy/controller-identity.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ControllerIdentity } from "./controller-identity";

const empty = { companyName: "", taxId: "", contactEmail: "", dataProtectionOfficer: "" };

describe("ControllerIdentity", () => {
  it("promises publication before the pilot while legal data is missing", () => {
    render(<ControllerIdentity legal={empty} />);
    expect(
      screen.getByText(
        "Os dados do controlador (razão social, CNPJ e canal do encarregado) serão publicados aqui antes da abertura do piloto.",
      ),
    ).toBeInTheDocument();
  });

  it("lists the controller once legal data exists", () => {
    render(
      <ControllerIdentity
        legal={{
          companyName: "Qore Tecnologia Ltda.",
          taxId: "11.222.333/0001-81",
          contactEmail: "privacidade@qore.com.br",
          dataProtectionOfficer: "Ana Lima",
        }}
      />,
    );
    expect(screen.getByText("Qore Tecnologia Ltda.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "privacidade@qore.com.br" })).toHaveAttribute(
      "href",
      "mailto:privacidade@qore.com.br",
    );
  });
});
```

Run red → `Failed to resolve import` ×2.

- [ ] **Step 9: Implement**

`src/lib/legal.ts`:

```ts
import type { LegalIdentity } from "@/types";

export const isLegalIdentityComplete = (legal: LegalIdentity): boolean =>
  Object.values(legal).every((value) => value.trim() !== "");
```

`src/components/privacy/controller-identity.tsx`:

```tsx
import { isLegalIdentityComplete } from "@/lib/legal";
import type { LegalIdentity } from "@/types";

interface ControllerIdentityProps {
  legal: LegalIdentity;
}

export const ControllerIdentity = ({ legal }: ControllerIdentityProps) => {
  if (!isLegalIdentityComplete(legal)) {
    return (
      <p>
        Os dados do controlador (razão social, CNPJ e canal do encarregado) serão publicados aqui antes da abertura do
        piloto.
      </p>
    );
  }

  return (
    <dl className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-x-6">
      <dt className="font-medium">Razão social</dt>
      <dd>{legal.companyName}</dd>
      <dt className="font-medium">CNPJ</dt>
      <dd className="tabular-nums">{legal.taxId}</dd>
      <dt className="font-medium">Encarregado de dados</dt>
      <dd>{legal.dataProtectionOfficer}</dd>
      <dt className="font-medium">Contato</dt>
      <dd>
        <a href={`mailto:${legal.contactEmail}`} className="text-primary underline underline-offset-4">
          {legal.contactEmail}
        </a>
      </dd>
    </dl>
  );
};
```

Note: the "complete" test fixture uses a fictional CNPJ only inside the test file; `tests/unit/source-content.test.ts` scans `src/` and would flag `00.000.000` only, which this fixture does not contain.

`src/app/privacidade/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ControllerIdentity } from "@/components/privacy/controller-identity";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Qore usa os dados enviados pelo formulário Fale Conosco.",
  alternates: { canonical: "/privacidade" },
};

const SECTION_TITLE_CLASS = "mt-10 text-headline-sm";

const PrivacyPage = () => (
  <main id="conteudo" tabIndex={-1} className="pt-28 pb-16">
    <Container className="max-w-3xl text-body-md text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-headline-xl-mobile md:text-headline-xl">Política de Privacidade</h1>
      <p className="text-muted-foreground">Última atualização: 25 de setembro de 2026.</p>

      <h2 className={SECTION_TITLE_CLASS}>Para que usamos seus dados</h2>
      <p>
        Usamos os dados do formulário Fale Conosco apenas para responder o seu contato e conversar sobre o piloto do
        Qore. Não vendemos seus dados nem os usamos para publicidade.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Quais dados coletamos</h2>
      <ul>
        <li>Nome</li>
        <li>E-mail</li>
        <li>Telefone ou WhatsApp</li>
        <li>Cargo</li>
        <li>Empresa ou CNPJ, se você informar</li>
        <li>Mensagem, se você escrever</li>
      </ul>
      <p>O envio é processado pelo Netlify, serviço que hospeda este site.</p>

      <h2 className={SECTION_TITLE_CLASS}>Base legal</h2>
      <p>
        Consentimento (art. 7º, I, da Lei 13.709/2018, LGPD), que você dá ao marcar a caixa de autorização no
        formulário. Você pode retirar o consentimento a qualquer momento.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Por quanto tempo guardamos</h2>
      <p>
        Guardamos os dados enquanto durar a conversa sobre o piloto e por até 12 meses depois do último contato. Depois
        disso, apagamos.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Seus direitos</h2>
      <p>Pelo art. 18 da LGPD, você pode pedir:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados;</li>
        <li>portabilidade;</li>
        <li>informação sobre com quem compartilhamos seus dados;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>Para exercer esses direitos, use o canal indicado na seção abaixo.</p>

      <h2 className={SECTION_TITLE_CLASS}>Quem é o controlador</h2>
      <ControllerIdentity legal={siteConfig.legal} />
    </Container>
  </main>
);

export default PrivacyPage;
```

Run → PASS.

- [ ] **Step 10: Full gate** → exit 0; `out/privacidade.html` exists; `grep -c 'data-netlify="true"' out/index.html` → `1`.

- [ ] **Step 11: Commit (four micro commits)**

```bash
git add src/lib/phone.ts src/lib/phone.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: mask and validate Brazilian phone numbers"
git add src/lib/contact-form.ts src/lib/contact-form.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: validate and submit contact leads to Netlify Forms"
git add src/components/sections/contact.tsx src/components/sections/contact-form.tsx src/components/sections/contact-submit-button.tsx src/components/sections/contact-form.test.tsx src/config/home-content.ts src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the contact form with inline errors and LGPD consent"
git add src/lib/legal.ts src/lib/legal.test.ts src/components/privacy src/app/privacidade
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the privacy page for the contact form"
```

---

### Task 6: Animation islands — GSAP, Lottie, Motion (Parts 12–14)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 12: GSAP islands — how-it-works line and desktop platform pin

**Files:**
- `pnpm add gsap`
- Create: `src/lib/motion-preferences.ts` (+ test), `src/lib/load-scroll-trigger.ts` (+ test), `src/hooks/use-near-viewport.ts` (+ test)
- Create: `src/components/sections/how-it-works-line-animator.tsx`, Test: `src/components/sections/how-it-works-line-animator.test.tsx`
- Modify: `src/components/sections/how-it-works.tsx`, `src/components/sections/platform-tour-tabs.tsx`, Test: `src/components/sections/platform-tour-pin.test.tsx`

**Seams:** `prefersReducedMotion()`, `isDesktopViewport()`; `loadScrollTrigger()`; `useNearViewport(ref, rootMargin)`; rendered `HowItWorks` with `loadScrollTrigger` replaced at the module boundary; rendered `PlatformTourTabs` with `loadScrollTrigger` replaced at the module boundary.

**Interfaces:**
- Produces: `REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"`, `DESKTOP_MEDIA_QUERY = "(min-width: 1024px)"`, `prefersReducedMotion(): boolean`, `isDesktopViewport(): boolean`; `loadScrollTrigger(): Promise<{ gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }>`; `useNearViewport(ref: RefObject<Element | null>, rootMargin?: string): boolean` (default `"400px 0px"`); `HowItWorksLineAnimator({ sectionId: string })`.

- [ ] **Step 0: Invoke the `tdd` skill.** Then `pnpm add gsap`.

- [ ] **Step 1: Failing tests (slice 1: helpers)**

`src/lib/motion-preferences.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { installMatchMediaMock } from "@/test-utils/browser-mocks";
import { DESKTOP_MEDIA_QUERY, REDUCED_MOTION_QUERY, isDesktopViewport, prefersReducedMotion } from "./motion-preferences";

describe("motion preferences", () => {
  it("reports reduced motion when the user asks for it", () => {
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("reports full motion by default", () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it("detects a desktop viewport", () => {
    installMatchMediaMock([DESKTOP_MEDIA_QUERY]);
    expect(isDesktopViewport()).toBe(true);
  });
});
```

`src/hooks/use-near-viewport.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { useNearViewport } from "./use-near-viewport";

const Probe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useNearViewport(ref);
  return <div ref={ref}>{isNear ? "perto" : "longe"}</div>;
};

describe("useNearViewport", () => {
  it("stays false until the element approaches", () => {
    render(<Probe />);
    expect(screen.getByText("longe")).toBeInTheDocument();
  });

  it("turns true once and stops observing", () => {
    render(<Probe />);
    const element = screen.getByText("longe");
    act(() => IntersectionObserverMock.trigger(element, true));
    expect(screen.getByText("perto")).toBeInTheDocument();
    expect(IntersectionObserverMock.instances.size).toBe(0);
  });

  it("uses a generous root margin so loading starts early", () => {
    render(<Probe />);
    expect([...IntersectionObserverMock.instances][0]?.rootMargin).toBe("400px 0px");
  });
});
```

`src/lib/load-scroll-trigger.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { loadScrollTrigger } from "./load-scroll-trigger";

describe("loadScrollTrigger", () => {
  it("returns GSAP with ScrollTrigger registered", async () => {
    const { gsap, ScrollTrigger } = await loadScrollTrigger();
    expect(typeof ScrollTrigger.create).toBe("function");
    expect(gsap.core.globals().ScrollTrigger).toBe(ScrollTrigger);
  });
});
```

Run red: `pnpm test src/lib/motion-preferences.test.ts src/hooks src/lib/load-scroll-trigger.test.ts` → FAIL `Failed to resolve import` ×3.

- [ ] **Step 2: Implement**

`src/lib/motion-preferences.ts`:

```ts
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export const prefersReducedMotion = (): boolean => window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const isDesktopViewport = (): boolean => window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
```

`src/hooks/use-near-viewport.ts`:

```ts
import { useEffect, useState, type RefObject } from "react";

export const useNearViewport = (ref: RefObject<Element | null>, rootMargin = "400px 0px"): boolean => {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNear) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, isNear]);

  return isNear;
};
```

`src/lib/load-scroll-trigger.ts`:

```ts
export const loadScrollTrigger = async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
};
```

Run → PASS. (If `gsap.core.globals().ScrollTrigger` is not exposed in the installed version, assert instead `expect(ScrollTrigger.getAll()).toEqual([])` — both prove the plugin loaded; paste which one you used.)

- [ ] **Step 3: Failing test (slice 2: line)** — `src/components/sections/how-it-works-line-animator.test.tsx`

```tsx
import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { HowItWorks } from "./how-it-works";

const fakeGsap = vi.hoisted(() => ({
  fromTo: vi.fn(),
  context: vi.fn((build: () => void) => {
    build();
    return { revert: vi.fn() };
  }),
}));

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: fakeGsap, ScrollTrigger: {} })),
}));

const approachSection = (container: HTMLElement) => {
  const marker = container.querySelector("[data-line-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

describe("HowItWorks line animation", () => {
  it("scrubs both lines with transforms once the section is near", async () => {
    fakeGsap.fromTo.mockClear();
    const { container } = render(<HowItWorks />);
    approachSection(container);
    await waitFor(() => expect(fakeGsap.fromTo).toHaveBeenCalledTimes(2));
    const fromStates = fakeGsap.fromTo.mock.calls.map((call) => call[1]);
    expect(fromStates).toEqual([{ scaleX: 0 }, { scaleY: 0 }]);
  });

  it("does nothing when the user prefers reduced motion", async () => {
    fakeGsap.fromTo.mockClear();
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<HowItWorks />);
    approachSection(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fakeGsap.fromTo).not.toHaveBeenCalled();
  });
});
```

Run red → FAIL `marker missing`.

- [ ] **Step 4: Implement** — `src/components/sections/how-it-works-line-animator.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { prefersReducedMotion } from "@/lib/motion-preferences";

interface HowItWorksLineAnimatorProps {
  sectionId: string;
}

export const HowItWorksLineAnimator = ({ sectionId }: HowItWorksLineAnimatorProps) => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const isNear = useNearViewport(markerRef);

  useEffect(() => {
    if (!isNear || prefersReducedMotion()) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    let isCancelled = false;
    let revert = () => {};

    void loadScrollTrigger().then(({ gsap }) => {
      if (isCancelled) return;
      const context = gsap.context(() => {
        section.querySelectorAll<HTMLElement>("[data-step-line]").forEach((line) => {
          const scrollTrigger = { trigger: section, start: "top 75%", end: "bottom 60%", scrub: true };
          if (line.dataset.stepLine === "vertical") {
            gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger });
            return;
          }
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger });
        });
      }, section);
      revert = () => context.revert();
    });

    return () => {
      isCancelled = true;
      revert();
    };
  }, [isNear, sectionId]);

  return <span ref={markerRef} data-line-marker aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
```

In `src/components/sections/how-it-works.tsx` add the import and render `<HowItWorksLineAnimator sectionId="como-funciona" />` as the first child inside `SectionWrapper`. The section already has `className="relative"`.

Run → PASS `2 passed`.

- [ ] **Step 5: Failing test (slice 3: pin)** — `src/components/sections/platform-tour-pin.test.tsx`

```tsx
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { platformTabs } from "@/config/home-content";
import { DESKTOP_MEDIA_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { PlatformTourTabs } from "./platform-tour-tabs";

interface PinOptions {
  pin: boolean;
  onUpdate: (self: { progress: number }) => void;
}

const fakeScrollTrigger = vi.hoisted(() => ({
  create: vi.fn((options: PinOptions) => ({ options, kill: vi.fn() })),
}));

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: {}, ScrollTrigger: fakeScrollTrigger })),
}));

const approachTour = (container: HTMLElement) => {
  const tour = container.querySelector("[data-platform-tour]");
  if (!tour) throw new Error("tour missing");
  act(() => IntersectionObserverMock.trigger(tour, true));
};

describe("PlatformTourTabs pin", () => {
  it("pins on desktop and crossfades screens with scroll progress", async () => {
    fakeScrollTrigger.create.mockClear();
    installMatchMediaMock([DESKTOP_MEDIA_QUERY]);
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    approachTour(container);
    await waitFor(() => expect(fakeScrollTrigger.create).toHaveBeenCalledTimes(1));
    const options = fakeScrollTrigger.create.mock.calls[0]?.[0];
    expect(options?.pin).toBe(true);
    act(() => options?.onUpdate({ progress: 0.5 }));
    expect(screen.getByRole("tab", { name: "Busca" })).toHaveAttribute("aria-selected", "true");
    act(() => options?.onUpdate({ progress: 1 }));
    expect(screen.getByRole("tab", { name: "Calendário" })).toHaveAttribute("aria-selected", "true");
  });

  it("keeps plain tabs on mobile", async () => {
    fakeScrollTrigger.create.mockClear();
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    approachTour(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fakeScrollTrigger.create).not.toHaveBeenCalled();
  });
});
```

Run red → FAIL `tour missing`.

- [ ] **Step 6: Implement** — in `src/components/sections/platform-tour-tabs.tsx`:

Add imports:

```tsx
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion-preferences";
```

Inside the component, after `const baseId = useId();`:

```tsx
  const tourRef = useRef<HTMLDivElement>(null);
  const isNear = useNearViewport(tourRef);

  useEffect(() => {
    const tour = tourRef.current;
    if (!isNear || !tour || prefersReducedMotion() || !isDesktopViewport()) return;

    let isCancelled = false;
    let kill = () => {};

    void loadScrollTrigger().then(({ ScrollTrigger }) => {
      if (isCancelled) return;
      const trigger = ScrollTrigger.create({
        trigger: tour,
        pin: true,
        start: "top 88px",
        end: `+=${tabs.length * 60}%`,
        onUpdate: (self: { progress: number }) =>
          setActiveIndex(Math.min(tabs.length - 1, Math.floor(self.progress * tabs.length))),
      });
      kill = () => trigger.kill();
    });

    return () => {
      isCancelled = true;
      kill();
    };
  }, [isNear, tabs.length]);
```

Change the root element to `<div ref={tourRef} data-platform-tour className="mt-10 lg:mx-auto lg:max-w-4xl">`.

Progress 0.5 × 5 = 2.5 → index 2 ("Busca"); progress 1 → clamped to 4 ("Calendário").

Run → PASS; also rerun `platform-tour-tabs.test.tsx` → still PASS.

- [ ] **Step 7: Full gate** → exit 0. Then check the bundle split: `grep -l "ScrollTrigger" out/_next/static/chunks/*.js` lists files; `node scripts/initial-javascript.mjs` scripts must not include those files (Part 17 automates this).

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/motion-preferences.ts src/lib/motion-preferences.test.ts src/hooks src/lib/load-scroll-trigger.ts src/lib/load-scroll-trigger.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: load GSAP ScrollTrigger on demand and honor reduced motion"
git add src/components/sections/how-it-works-line-animator.tsx src/components/sections/how-it-works-line-animator.test.tsx src/components/sections/how-it-works.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: draw the how it works line on scroll"
git add src/components/sections/platform-tour-tabs.tsx src/components/sections/platform-tour-pin.test.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: pin the platform tour on desktop and crossfade screens on scroll"
```

---

#### Part 13: Lottie island for the responsible AI illustration

**Files:**
- `pnpm add @lottiefiles/dotlottie-web`
- Create: `public/animations/ai-reading.json`, `public/animations/dotlottie-player.wasm` (copied)
- Test: `tests/unit/ai-reading-animation.test.ts`
- Create: `src/components/sections/ai-reading-animation.tsx`, Test: `src/components/sections/ai-reading-animation.test.tsx`
- Modify: `src/components/sections/responsible-ai.tsx`

**Seams:** the animation JSON file; rendered `AiReadingAnimation` with `@lottiefiles/dotlottie-web` replaced at the module boundary.

**Interfaces:**
- Produces: `AiReadingAnimation()`; files served at `/animations/ai-reading.json` and `/animations/dotlottie-player.wasm`.

- [ ] **Step 0: Invoke the `tdd` skill.** Then:

```bash
pnpm add @lottiefiles/dotlottie-web
ls node_modules/@lottiefiles/dotlottie-web/dist/*.wasm
```

Expected: `node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm`. If the listed file has another name, copy that file under the name `dotlottie-player.wasm` below.

```bash
mkdir -p public/animations
cp node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm public/animations/dotlottie-player.wasm
```

- [ ] **Step 1: Failing test (slice 1: file)** — `tests/unit/ai-reading-animation.test.ts`

```ts
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

interface LottieLayer {
  nm: string;
}

interface LottieAnimation {
  w: number;
  h: number;
  fr: number;
  ip: number;
  op: number;
  layers: LottieLayer[];
}

const source = readFileSync(join(process.cwd(), "public", "animations", "ai-reading.json"), "utf8");
const animation: LottieAnimation = JSON.parse(source);
const rawAnimation: unknown = JSON.parse(source);

const findAnimatedPaths = (value: unknown, path: string): string[] => {
  if (Array.isArray(value)) return value.flatMap((item, index) => findAnimatedPaths(item, `${path}[${index}]`));
  if (typeof value !== "object" || value === null) return [];
  const entries = Object.entries(value);
  const own = entries.some(([key, child]) => key === "a" && child === 1) ? [path] : [];
  return [...own, ...entries.flatMap(([key, child]) => findAnimatedPaths(child, `${path}.${key}`))];
};

describe("ai-reading.json", () => {
  it("is a 5 second 30 fps loop at 320×240", () => {
    expect([animation.w, animation.h, animation.fr, animation.ip, animation.op]).toEqual([320, 240, 30, 0, 150]);
  });

  it("tells the story edital → highlighted excerpt → summary", () => {
    expect(animation.layers.map((layer) => layer.nm)).toEqual(["summary-card", "source-highlight", "notice-document"]);
  });

  it("animates only opacity, position and scale", () => {
    expect(findAnimatedPaths(rawAnimation, "root")).toEqual([
      "root.layers[0].ks.o",
      "root.layers[0].ks.p",
      "root.layers[1].ks.o",
      "root.layers[1].ks.s",
    ]);
  });
});
```

Run red → FAIL `ENOENT: no such file or directory, open '.../public/animations/ai-reading.json'`.

- [ ] **Step 2: Author the animation** — `public/animations/ai-reading.json` (geometry mirrors `AiReadingPoster`; colors are the design tokens in 0–1 RGB)

```json
{
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 150,
  "w": 320,
  "h": 240,
  "nm": "qore-ai-reading",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "summary-card",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "t": 50, "s": [0], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.2], "y": [1] } },
            { "t": 75, "s": [100], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.67], "y": [1] } },
            { "t": 130, "s": [100], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.67], "y": [1] } },
            { "t": 148, "s": [0] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": {
          "a": 1,
          "k": [
            { "t": 50, "s": [20, 0, 0], "o": { "x": 0.33, "y": 0 }, "i": { "x": 0.2, "y": 1 } },
            { "t": 75, "s": [0, 0, 0] }
          ]
        },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "nm": "tag",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [40, 10] }, "p": { "a": 0, "k": [215, 160] }, "r": { "a": 0, "k": 5 } },
            { "ty": "fl", "c": { "a": 0, "k": [0.016, 0.471, 0.341, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "nm": "line-3",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [80, 6] }, "p": { "a": 0, "k": [235, 143] }, "r": { "a": 0, "k": 3 } },
            { "ty": "fl", "c": { "a": 0, "k": [0.482, 0.847, 0.694, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "nm": "line-2",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [90, 6] }, "p": { "a": 0, "k": [240, 128] }, "r": { "a": 0, "k": 3 } },
            { "ty": "fl", "c": { "a": 0, "k": [0.482, 0.847, 0.694, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "nm": "title",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [70, 8] }, "p": { "a": 0, "k": [230, 109] }, "r": { "a": 0, "k": 4 } },
            { "ty": "fl", "c": { "a": 0, "k": [0.016, 0.471, 0.341, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        },
        {
          "ty": "gr",
          "nm": "card",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [120, 90] }, "p": { "a": 0, "k": [240, 130] }, "r": { "a": 0, "k": 10 } },
            { "ty": "st", "c": { "a": 0, "k": [0.016, 0.471, 0.341, 1] }, "o": { "a": 0, "k": 100 }, "w": { "a": 0, "k": 2 }, "lc": 2, "lj": 2 },
            { "ty": "fl", "c": { "a": 0, "k": [0.925, 0.992, 0.961, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ],
      "ip": 0,
      "op": 150,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "source-highlight",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "t": 20, "s": [0], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.2], "y": [1] } },
            { "t": 40, "s": [60], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.67], "y": [1] } },
            { "t": 130, "s": [60], "o": { "x": [0.33], "y": [0] }, "i": { "x": [0.67], "y": [1] } },
            { "t": 148, "s": [0] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [50, 104, 0] },
        "a": { "a": 0, "k": [50, 104, 0] },
        "s": {
          "a": 1,
          "k": [
            { "t": 20, "s": [0, 100, 100], "o": { "x": [0.33, 0.33, 0.33], "y": [0, 0, 0] }, "i": { "x": [0.2, 0.2, 0.2], "y": [1, 1, 1] } },
            { "t": 40, "s": [100, 100, 100] }
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "nm": "highlight",
          "it": [
            { "ty": "rc", "d": 1, "s": { "a": 0, "k": [120, 18] }, "p": { "a": 0, "k": [110, 104] }, "r": { "a": 0, "k": 4 } },
            { "ty": "fl", "c": { "a": 0, "k": [0.482, 0.847, 0.694, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
            { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
          ]
        }
      ],
      "ip": 0,
      "op": 150,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "notice-document",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [0, 0, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        { "ty": "gr", "nm": "line-1", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 64] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-2", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 84] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-3", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 104] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-4", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 124] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-5", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 144] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-6", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [110, 8] }, "p": { "a": 0, "k": [110, 164] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "line-7", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [70, 8] }, "p": { "a": 0, "k": [90, 184] }, "r": { "a": 0, "k": 4 } },
          { "ty": "fl", "c": { "a": 0, "k": [0.827, 0.894, 0.996, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] },
        { "ty": "gr", "nm": "page", "it": [
          { "ty": "rc", "d": 1, "s": { "a": 0, "k": [140, 180] }, "p": { "a": 0, "k": [110, 120] }, "r": { "a": 0, "k": 8 } },
          { "ty": "st", "c": { "a": 0, "k": [0.741, 0.788, 0.757, 1] }, "o": { "a": 0, "k": 100 }, "w": { "a": 0, "k": 2 }, "lc": 2, "lj": 2 },
          { "ty": "fl", "c": { "a": 0, "k": [1, 1, 1, 1] }, "o": { "a": 0, "k": 100 }, "r": 1 },
          { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
        ] }
      ],
      "ip": 0,
      "op": 150,
      "st": 0,
      "bm": 0
    }
  ]
}
```

Timeline: frames 0–20 document only; 20–40 the excerpt highlight grows left→right (scaleX from the anchor at x=50) and fades to 60%; 50–75 the summary card slides 20px left and fades in; hold to 130; 130–148 highlight and card fade out; loop at 150. Layer order = paint order (first on top).

Run → PASS `3 passed`. Visual check: open `https://lottiefiles.com/preview` is NOT allowed (external upload); instead verify in the browser in Step 6.

- [ ] **Step 3: Failing test (slice 2: component)** — `src/components/sections/ai-reading-animation.test.tsx`

```tsx
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { AiReadingAnimation } from "./ai-reading-animation";

interface PlayerOptions {
  canvas: HTMLCanvasElement;
  src: string;
  autoplay: boolean;
  loop: boolean;
  renderConfig: { freezeOnOffscreen: boolean };
}

const lottie = vi.hoisted(() => {
  const instances: Array<{ options: PlayerOptions; listeners: Map<string, () => void>; destroy: () => void }> = [];
  class DotLottieMock {
    static setWasmUrl = vi.fn();
    readonly options: PlayerOptions;
    readonly listeners = new Map<string, () => void>();
    readonly destroy = vi.fn();
    constructor(options: PlayerOptions) {
      this.options = options;
      instances.push(this);
    }
    addEventListener = (name: string, listener: () => void) => {
      this.listeners.set(name, listener);
    };
  }
  return { DotLottieMock, instances };
});

vi.mock("@lottiefiles/dotlottie-web", () => ({ DotLottie: lottie.DotLottieMock }));

const approach = (container: HTMLElement) => {
  const frame = container.firstElementChild;
  if (!frame) throw new Error("frame missing");
  act(() => IntersectionObserverMock.trigger(frame, true));
};

describe("AiReadingAnimation", () => {
  it("shows the static poster before the player loads", () => {
    render(<AiReadingAnimation />);
    expect(screen.getByRole("img", { name: /Ilustração: o edital/ })).toBeInTheDocument();
    expect(lottie.instances).toHaveLength(0);
  });

  it("loads the self-hosted player and plays in a loop once near the viewport", async () => {
    lottie.instances.length = 0;
    const { container } = render(<AiReadingAnimation />);
    approach(container);
    await waitFor(() => expect(lottie.instances).toHaveLength(1));
    expect(lottie.DotLottieMock.setWasmUrl).toHaveBeenCalledWith("/animations/dotlottie-player.wasm");
    expect(lottie.instances[0]?.options).toMatchObject({
      src: "/animations/ai-reading.json",
      autoplay: true,
      loop: true,
      renderConfig: { freezeOnOffscreen: true },
    });
  });

  it("stays on the first frame when the user prefers reduced motion", async () => {
    lottie.instances.length = 0;
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<AiReadingAnimation />);
    approach(container);
    await waitFor(() => expect(lottie.instances).toHaveLength(1));
    expect(lottie.instances[0]?.options).toMatchObject({ autoplay: false, loop: false });
  });

  it("swaps the poster for the canvas after load and cleans up on unmount", async () => {
    lottie.instances.length = 0;
    const { container, unmount } = render(<AiReadingAnimation />);
    approach(container);
    await waitFor(() => expect(lottie.instances).toHaveLength(1));
    act(() => lottie.instances[0]?.listeners.get("load")?.());
    expect(container.querySelector("canvas")).toHaveClass("opacity-100");
    unmount();
    expect(lottie.instances[0]?.destroy).toHaveBeenCalled();
  });
});
```

Run red → `Failed to resolve import "./ai-reading-animation"`.

- [ ] **Step 4: Implement** — `src/components/sections/ai-reading-animation.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { prefersReducedMotion } from "@/lib/motion-preferences";
import { cn } from "@/lib/utils";
import { AiReadingPoster } from "./ai-reading-poster";

const ANIMATION_SOURCE = "/animations/ai-reading.json";
const WASM_SOURCE = "/animations/dotlottie-player.wasm";

export const AiReadingAnimation = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isNear = useNearViewport(frameRef, "200px 0px");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isNear || !canvas) return;

    let isCancelled = false;
    let destroy = () => {};

    void import("@lottiefiles/dotlottie-web").then(({ DotLottie }) => {
      if (isCancelled) return;
      DotLottie.setWasmUrl(WASM_SOURCE);
      const shouldAnimate = !prefersReducedMotion();
      const player = new DotLottie({
        canvas,
        src: ANIMATION_SOURCE,
        autoplay: shouldAnimate,
        loop: shouldAnimate,
        renderConfig: { freezeOnOffscreen: true },
      });
      player.addEventListener("load", () => setIsReady(true));
      destroy = () => player.destroy();
    });

    return () => {
      isCancelled = true;
      destroy();
    };
  }, [isNear]);

  return (
    <div ref={frameRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-low">
      <AiReadingPoster
        className={cn("absolute inset-0 size-full transition-opacity duration-300", isReady && "opacity-0")}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full opacity-0 transition-opacity duration-300",
          isReady && "opacity-100",
        )}
      />
    </div>
  );
};
```

If `pnpm typecheck` rejects the `load` listener signature, type the callback exactly as the library's `EventListener<"load">` export requires (read `node_modules/@lottiefiles/dotlottie-web/dist/index.d.ts`) — do not cast.

In `src/components/sections/responsible-ai.tsx` replace the poster frame `<div className="relative aspect-[4/3] …"><AiReadingPoster … /></div>` with `<AiReadingAnimation />` and swap the import.

Run → PASS; rerun `responsible-ai.test.tsx` → PASS.

- [ ] **Step 5: Full gate** → exit 0; `out/animations/ai-reading.json` and `out/animations/dotlottie-player.wasm` exist.

- [ ] **Step 6: Visual check** — `pnpm dev`, open `http://localhost:3000/#ia-responsavel`, confirm the loop (document → highlight grows → card slides in) and that DevTools Network shows the WASM from `localhost`, not a CDN. Toggle "Emulate prefers-reduced-motion: reduce" and reload: only the document is drawn (first frame).

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml public/animations tests/unit/ai-reading-animation.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add the hand-authored edital reading animation"
git add src/components/sections/ai-reading-animation.tsx src/components/sections/ai-reading-animation.test.tsx src/components/sections/responsible-ai.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: play the reading animation on demand with a self-hosted player"
```

---

#### Part 14: Motion for the persona toggle and the form button

**Files:**
- Create: `src/lib/motion-features.ts`, Test: `src/lib/motion-features.test.ts`
- Modify: `src/components/sections/persona-toggle.tsx`, `src/components/sections/contact-submit-button.tsx`
- Test: `src/components/sections/contact-submit-button.test.tsx`

**Seams:** `loadMotionFeatures()`; rendered `ContactSubmitButton` per status; existing `PersonaToggle` tests (must stay green).

**Interfaces:**
- Produces: `loadMotionFeatures(): Promise<typeof domAnimation>` exported from `src/lib/motion-features.ts`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing tests**

`src/lib/motion-features.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { loadMotionFeatures } from "./motion-features";

describe("loadMotionFeatures", () => {
  it("resolves the domAnimation feature bundle", async () => {
    const features = await loadMotionFeatures();
    expect(features).toHaveProperty("renderer");
    expect(features).toHaveProperty("animation");
  });
});
```

`src/components/sections/contact-submit-button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSubmitButton } from "./contact-submit-button";

describe("ContactSubmitButton", () => {
  it.each([
    ["idle", "Quero falar com a equipe"],
    ["submitting", "Enviando…"],
    ["success", "Enviado"],
    ["error", "Quero falar com a equipe"],
  ] as const)("labels the %s state", (status, label) => {
    render(<ContactSubmitButton status={status} />);
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it("blocks double submission while sending", () => {
    render(<ContactSubmitButton status="submitting" />);
    expect(screen.getByRole("button", { name: "Enviando…" })).toBeDisabled();
  });

  it("animates the label inside a lazy Motion boundary", () => {
    render(<ContactSubmitButton status="success" />);
    expect(screen.getByText("Enviado")).toHaveAttribute("data-motion-label");
  });
});
```

Run red: `pnpm test src/lib/motion-features.test.ts src/components/sections/contact-submit-button.test.tsx` → FAIL `Failed to resolve import "./motion-features"` and `expected element to have attribute data-motion-label`.

- [ ] **Step 2: Implement**

`src/lib/motion-features.ts`:

```ts
export const loadMotionFeatures = () => import("motion/react").then((module) => module.domAnimation);
```

`src/components/sections/contact-submit-button.tsx`:

```tsx
"use client";

import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { Button } from "@/components/ui/button";
import { loadMotionFeatures } from "@/lib/motion-features";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const LABELS: Record<ContactFormStatus, string> = {
  idle: "Quero falar com a equipe",
  submitting: "Enviando…",
  success: "Enviado",
  error: "Quero falar com a equipe",
};

interface ContactSubmitButtonProps {
  status: ContactFormStatus;
}

export const ContactSubmitButton = ({ status }: ContactSubmitButtonProps) => (
  <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <Button type="submit" size="lg" className="w-full overflow-hidden" disabled={status === "submitting"}>
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={status}
            data-motion-label
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {LABELS[status]}
          </m.span>
        </AnimatePresence>
      </Button>
    </MotionConfig>
  </LazyMotion>
);
```

In `src/components/sections/persona-toggle.tsx`:
- add `import { LazyMotion, MotionConfig, m } from "motion/react";` and `import { loadMotionFeatures } from "@/lib/motion-features";`
- wrap the returned root `<div className="mt-8">…</div>` in `<LazyMotion features={loadMotionFeatures} strict><MotionConfig reducedMotion="user">…</MotionConfig></LazyMotion>`
- inside each `<article>`, wrap the `<dl>…</dl>` in:

```tsx
            <m.div
              initial={false}
              animate={{ opacity: persona.id === activeId ? 1 : 0, y: persona.id === activeId ? 0 : 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* existing <dl> */}
            </m.div>
```

(Replace the placeholder comment with the existing `<dl>` element — do not leave a comment.)

With `initial={false}` the server HTML carries no inline `opacity: 0`, so the no-JS test in `persona-toggle.test.tsx` stays green.

- [ ] **Step 3: Run green** — `pnpm test src/lib/motion-features.test.ts src/components/sections` → PASS (including the earlier persona and contact-form tests).

- [ ] **Step 4: Full gate** → exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/motion-features.ts src/lib/motion-features.test.ts src/components/sections/contact-submit-button.tsx src/components/sections/contact-submit-button.test.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: animate the contact button states with lazy Motion features"
git add src/components/sections/persona-toggle.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: fade between persona views with lazy Motion features"
```

---

### Task 7: SEO and panel screenshots (Parts 15–16)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 15: SEO — metadata, sitemap, robots, JSON-LD and OG image

**Files:**
- Rewrite: `src/lib/structured-data.ts`, Test: `src/lib/structured-data.test.ts`
- Create: `src/lib/site-metadata.ts`, Test: `src/lib/site-metadata.test.ts`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, Test: `src/app/seo-routes.test.ts`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`
- `pnpm add -D sharp`; Create: `scripts/generate-brand-assets.mjs`, generated `public/og.png`, `src/app/apple-icon.png`; Test: `tests/unit/brand-assets.test.ts`
- Modify: `package.json` (script `brand:assets`)

**Seams:** `buildStructuredData`, `serializeJsonLd`; `buildRootMetadata`; default exports of `sitemap.ts` / `robots.ts`; generated image files.

**Interfaces:**
- Produces: `buildStructuredData(input: { siteName: string; siteUrl: string; description: string; faqItems: readonly FAQItem[] })` returning `{ "@context": "https://schema.org"; "@graph": [Organization, WebSite, FAQPage] }`, `serializeJsonLd(data: unknown): string`; `buildRootMetadata(input: { siteName: string; slogan: string; description: string; siteUrl: string }): Metadata`.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test (slice 1: JSON-LD)** — `src/lib/structured-data.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { buildStructuredData, serializeJsonLd } from "./structured-data";

const input = {
  siteName: "Qore",
  siteUrl: "https://preview.qore.com.br",
  description: "Descrição",
  faqItems: [{ question: "Quanto custa?", answer: "Ainda não publicamos preço." }],
};

describe("buildStructuredData", () => {
  it("describes the organization, the website and the FAQ", () => {
    const data = buildStructuredData(input);
    expect(data["@graph"].map((node) => node["@type"])).toEqual(["Organization", "WebSite", "FAQPage"]);
  });

  it("derives every URL from the site origin", () => {
    const [organization, website] = buildStructuredData(input)["@graph"];
    expect(organization).toMatchObject({
      url: "https://preview.qore.com.br/",
      logo: "https://preview.qore.com.br/apple-icon.png",
    });
    expect(website).toMatchObject({ url: "https://preview.qore.com.br/", inLanguage: "pt-BR" });
  });

  it("never publishes an offer, a price or invented organization fields", () => {
    const json = JSON.stringify(buildStructuredData(input));
    expect(json).not.toMatch(/Offer|price|SoftwareApplication|sameAs|address|founder|taxID/);
  });

  it("maps FAQ items to questions and answers", () => {
    const faqPage = buildStructuredData(input)["@graph"][2];
    expect(faqPage).toEqual({
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quanto custa?", acceptedAnswer: { "@type": "Answer", text: "Ainda não publicamos preço." } },
      ],
    });
  });
});

describe("serializeJsonLd", () => {
  it("escapes angle brackets so the script tag cannot be closed early", () => {
    expect(serializeJsonLd({ text: "</script>" })).toBe('{"text":"\\u003c/script>"}');
  });
});
```

Run red → FAIL `buildStructuredData is not a function` / missing export.

- [ ] **Step 2: Implement** — replace `src/lib/structured-data.ts`

```ts
import { absoluteUrl } from "@/lib/site-url";
import type { FAQItem } from "@/types";

interface StructuredDataInput {
  siteName: string;
  siteUrl: string;
  description: string;
  faqItems: readonly FAQItem[];
}

export const buildStructuredData = ({ siteName, siteUrl, description, faqItems }: StructuredDataInput) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl(siteUrl, "/"),
      logo: absoluteUrl(siteUrl, "/apple-icon.png"),
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl(siteUrl, "/"),
      inLanguage: "pt-BR",
      description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
});

export const serializeJsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
```

Update `src/app/page.tsx`: add at the top of `<main>`:

```tsx
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(
          buildStructuredData({
            siteName: siteConfig.name,
            siteUrl: siteConfig.url,
            description: siteConfig.description,
            faqItems,
          }),
        ),
      }}
    />
```

with imports `buildStructuredData, serializeJsonLd` from `@/lib/structured-data`, `siteConfig` from `@/config/site`, `faqItems` from `@/config/faq`.

Run → PASS. Also rerun `tests/unit/source-content.test.ts` (checks no `SoftwareApplication`/`Offer` in the file) → PASS.

- [ ] **Step 3: Failing test (slice 2: metadata and routes)**

`src/lib/site-metadata.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildRootMetadata } from "./site-metadata";

const metadata = buildRootMetadata({
  siteName: "Qore",
  slogan: "A IA lê o edital. Você decide.",
  description: "Descrição",
  siteUrl: "https://preview.qore.com.br",
});

describe("buildRootMetadata", () => {
  it("sets the canonical base from the site URL", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://preview.qore.com.br/");
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("titles pages with the slogan and a template", () => {
    expect(metadata.title).toEqual({ default: "Qore | A IA lê o edital. Você decide.", template: "%s | Qore" });
  });

  it("shares a 1200×630 Open Graph image and a large Twitter card", () => {
    expect(metadata.openGraph).toMatchObject({
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", images: ["/og.png"] });
  });
});
```

`src/app/seo-routes.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists the home and the privacy page", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://qore.com.br/", "https://qore.com.br/privacidade"]);
  });
});

describe("robots", () => {
  it("allows crawling and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://qore.com.br/sitemap.xml",
    });
  });
});
```

(These use the default URL: tests run without `NEXT_PUBLIC_SITE_URL`.)

Run red → `Failed to resolve import` ×3.

- [ ] **Step 4: Implement**

`src/lib/site-metadata.ts`:

```ts
import type { Metadata } from "next";

interface RootMetadataInput {
  siteName: string;
  slogan: string;
  description: string;
  siteUrl: string;
}

export const buildRootMetadata = ({ siteName, slogan, description, siteUrl }: RootMetadataInput): Metadata => {
  const title = `${siteName} | ${slogan}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "/",
      siteName,
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${siteName}: ${slogan}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
};
```

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: absoluteUrl(siteConfig.url, "/"), changeFrequency: "monthly", priority: 1 },
  { url: absoluteUrl(siteConfig.url, "/privacidade"), changeFrequency: "yearly", priority: 0.3 },
];

export default sitemap;
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => ({
  rules: [{ userAgent: "*", allow: "/" }],
  sitemap: absoluteUrl(siteConfig.url, "/sitemap.xml"),
});

export default robots;
```

In `src/app/layout.tsx` replace the `metadata` export:

```tsx
import type { Metadata, Viewport } from "next";
import { buildRootMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRootMetadata({
  siteName: siteConfig.name,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  siteUrl: siteConfig.url,
});

export const viewport: Viewport = { themeColor: "#047857" };
```

Run → PASS.

- [ ] **Step 5: Failing test (slice 3: images)** — `pnpm add -D sharp`, then `tests/unit/brand-assets.test.ts`:

```ts
// @vitest-environment node
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

describe("brand assets", () => {
  it("has a 1200×630 Open Graph image", async () => {
    const { width, height, format } = await sharp(join(process.cwd(), "public", "og.png")).metadata();
    expect([width, height, format]).toEqual([1200, 630, "png"]);
  });

  it("has a 180×180 apple icon", async () => {
    const { width, height } = await sharp(join(process.cwd(), "src", "app", "apple-icon.png")).metadata();
    expect([width, height]).toEqual([180, 180]);
  });
});
```

Run red → FAIL `Input file is missing: .../public/og.png`.

- [ ] **Step 6: Implement** — `scripts/generate-brand-assets.mjs`

```js
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const iconPath = fileURLToPath(new URL("../src/app/icon.svg", import.meta.url));
const appleIconPath = fileURLToPath(new URL("../src/app/apple-icon.png", import.meta.url));
const ogImagePath = fileURLToPath(new URL("../public/og.png", import.meta.url));

const FONT_STACK = "Hanken Grotesk, Inter, Arial, sans-serif";

const iconSvg = await readFile(iconPath, "utf8");

await sharp(Buffer.from(iconSvg), { density: 384 }).resize(180, 180).png().toFile(appleIconPath);

const positionedIcon = iconSvg.replace("<svg ", '<svg x="96" y="88" width="96" height="96" ');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f8f9ff"/>
  <rect y="598" width="1200" height="32" fill="#047857"/>
  ${positionedIcon}
  <text x="212" y="156" font-family="${FONT_STACK}" font-size="56" font-weight="700" fill="#0f172a">Qore<tspan fill="#047857">.</tspan></text>
  <text x="96" y="340" font-family="${FONT_STACK}" font-size="80" font-weight="700" letter-spacing="-2" fill="#0f172a">A IA lê o edital.</text>
  <text x="96" y="436" font-family="${FONT_STACK}" font-size="80" font-weight="700" letter-spacing="-2" fill="#047857">Você decide.</text>
  <text x="96" y="520" font-family="${FONT_STACK}" font-size="32" fill="#475569">Piloto em São Paulo</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(ogImagePath);

console.log("generated", appleIconPath, ogImagePath);
```

Add to `package.json` scripts: `"brand:assets": "node scripts/generate-brand-assets.mjs"`.

Run: `pnpm brand:assets` → prints `generated …/apple-icon.png …/og.png`. Open `public/og.png` with the Read tool and confirm the slogan is legible (system font fallback is acceptable).

Run the test → PASS `2 passed`.

- [ ] **Step 7: Full gate** → exit 0; `out/sitemap.xml`, `out/robots.txt`, `out/og.png`, `out/apple-icon.png` exist; `grep -o '<link rel="canonical"[^>]*>' out/index.html` shows `https://qore.com.br`.

- [ ] **Step 8: Commit**

```bash
git add src/lib/structured-data.ts src/lib/structured-data.test.ts src/app/page.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: publish Organization, WebSite and FAQPage JSON-LD without offers"
git add src/lib/site-metadata.ts src/lib/site-metadata.test.ts src/app/sitemap.ts src/app/robots.ts src/app/seo-routes.test.ts src/app/layout.tsx
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: generate metadata, sitemap and robots from the site URL"
git add package.json pnpm-lock.yaml scripts/generate-brand-assets.mjs public/og.png src/app/apple-icon.png tests/unit/brand-assets.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: generate the Open Graph image and apple icon from the logo"
```

---

#### Part 16: Panel screenshots from qore-web

**Files:**
- `pnpm add -D playwright` and `pnpm exec playwright install chromium`
- Create: `scripts/capture-screenshots.mjs`, generated `public/screenshots/{manager-dashboard,radar,search,pricing,calendar}-{640,1280}.{avif,webp}`
- Test: `tests/unit/screenshots.test.ts`
- Modify: `package.json` (script `screenshots:capture`)

**Seams:** the generated files (existence, format, dimensions).

**Interfaces:**
- Consumes: `platformTabs[].image` basenames from Part 8.

- [ ] **Step 0: Invoke the `tdd` skill.**

- [ ] **Step 1: Failing test** — `tests/unit/screenshots.test.ts`

```ts
// @vitest-environment node
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { platformTabs } from "@/config/home-content";

const WIDTHS = [640, 1280] as const;
const FORMATS = [
  ["avif", "heif"],
  ["webp", "webp"],
] as const;

const cases = platformTabs.flatMap((tab) =>
  WIDTHS.flatMap((width) => FORMATS.map(([extension, format]) => ({ file: `${tab.image}-${width}.${extension}`, width, format }))),
);

describe("platform screenshots", () => {
  it.each(cases)("$file is a $width px wide 16:10 image", async ({ file, width, format }) => {
    const metadata = await sharp(join(process.cwd(), "public", "screenshots", file)).metadata();
    expect([metadata.width, metadata.height, metadata.format]).toEqual([width, (width * 10) / 16, format]);
  });
});
```

(sharp reports AVIF as `format: "heif"`.)

Run red → FAIL ×20 `Input file is missing`.

- [ ] **Step 2: Implement** — `pnpm add -D playwright && pnpm exec playwright install chromium`, then `scripts/capture-screenshots.mjs`:

```js
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const baseUrl = process.env.QORE_WEB_URL ?? "http://localhost:3000";
const outputDirectory = fileURLToPath(new URL("../public/screenshots/", import.meta.url));
const VIEWPORT = { width: 1440, height: 900 };
const WIDTHS = [640, 1280];
const FABRICATED_PANEL_TERMS = /taxa de vitória|win rate|go\/no-go|média histórica|concorrentes/i;

/** @param {import("playwright").Page} page */
const removeWinRateCard = (page) =>
  page.evaluate(() => {
    const kpiSelector = "section[aria-label='Indicadores do mês']";
    const label = [...document.querySelectorAll(`${kpiSelector} *`)].find(
      (element) => element.textContent?.trim() === "Taxa de vitória",
    );
    label?.closest(`${kpiSelector} > *`)?.remove();
  });

/** @param {import("playwright").Page} page */
const settle = async (page) => {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
};

const screens = [
  {
    name: "manager-dashboard",
    path: "/performance",
    prepare: async (page) => {
      await page.getByText("Valor ganho").waitFor();
      await removeWinRateCard(page);
    },
  },
  { name: "radar", path: "/tenders", prepare: settle },
  { name: "search", path: "/search", prepare: settle },
  {
    name: "pricing",
    path: "/bids/new",
    prepare: async (page) => {
      await page.getByRole("link", { name: "Iniciar proposta" }).first().click();
      await page.getByRole("button", { name: "Avançar para Itens" }).click();
      await page.getByRole("button", { name: "Avançar para Precificação" }).click();
      await page.getByTestId("wizard-step-3").waitFor();
      await settle(page);
    },
  },
  { name: "calendar", path: "/calendar", prepare: settle },
];

/** @param {import("playwright").Page} page @param {string} name */
const assertNoFabricatedPanels = async (page, name) => {
  const count = await page.getByText(FABRICATED_PANEL_TERMS).count();
  if (count > 0) throw new Error(`${name}: a fabricated panel is still visible (SPA-426)`);
};

/** @param {string} name @param {Buffer} png */
const saveVariants = (name, png) =>
  Promise.all(
    WIDTHS.flatMap((width) => {
      const resized = sharp(png).resize({ width });
      return [
        resized.clone().avif({ quality: 50 }).toFile(`${outputDirectory}${name}-${width}.avif`),
        resized.clone().webp({ quality: 72 }).toFile(`${outputDirectory}${name}-${width}.webp`),
      ];
    }),
  );

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  await context.addCookies([{ name: "qore_onboarding_done", value: "1", url: baseUrl }]);

  for (const screen of screens) {
    const page = await context.newPage();
    page.setDefaultTimeout(120_000);
    await page.goto(new URL(screen.path, baseUrl).toString(), { waitUntil: "networkidle" });
    await screen.prepare(page);
    await assertNoFabricatedPanels(page, screen.name);
    await saveVariants(screen.name, await page.screenshot({ type: "png" }));
    await page.close();
    console.log(`captured ${screen.name}`);
  }
} finally {
  await browser.close();
}
```

Add to `package.json` scripts: `"screenshots:capture": "node scripts/capture-screenshots.mjs"`.

- [ ] **Step 3: Capture** — in a second terminal:

```bash
cd /Users/emerson/Documents/workspace/startups/qore/qore-web
git rev-parse --abbrev-ref HEAD   # expect: developer
npm run dev                       # MSW demo data is on by default (NEXT_PUBLIC_ENABLE_MSW defaults to true)
```

Wait for `Ready`, then in qore-lp: `pnpm screenshots:capture`.
Expected: five `captured …` lines. If `assertNoFabricatedPanels` throws, stop and report the screen name to Emerson — do not hide more UI without his decision. Stop the qore-web dev server afterwards. Look at each `-1280.webp` with the Read tool.

- [ ] **Step 4: Run green** — `pnpm test tests/unit/screenshots.test.ts` → PASS `20 passed`.

- [ ] **Step 5: Full gate** → exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml scripts/capture-screenshots.mjs tests/unit/screenshots.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "chore: add the panel screenshot capture script"
git add public/screenshots
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "feat: add AVIF and WebP screenshots of the demo panel"
```

---

### Task 8: Post-build checks, Lighthouse CI and docs (Parts 17–18)

One reviewable task; commit per Part as listed. Review gate after the last Part.

#### Part 17: Post-build checks, coverage lock and Lighthouse CI

**Files:**
- Create: `vitest.export.config.ts`, `tests/export/static-server.ts`, `tests/export/exported-html.test.ts`, `tests/export/rendered-page.test.ts`
- Create: `lighthouserc.mobile.json`, `lighthouserc.desktop.json`
- Modify: `vitest.config.ts` (thresholds), `package.json` (scripts, `@lhci/cli`), `.gitignore`, `tsconfig.json` (exclude `.lighthouseci`)

**Seams:** files in `out/`; the exported site served statically and driven by Chromium; Lighthouse scores.

**Interfaces:**
- Consumes: `FORBIDDEN_TERMS`, `measureInitialJavaScript`, `tests/export/initial-js-baseline.json`.
- Produces scripts: `test:export`, `lhci`, `verify`.

- [ ] **Step 0: Invoke the `tdd` skill.** `pnpm add -D @lhci/cli`.

- [ ] **Step 1: Export suite config** — `vitest.export.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/export/**/*.test.ts"],
    testTimeout: 60_000,
  },
});
```

`package.json` scripts add:

```json
    "test:export": "vitest run --config vitest.export.config.ts",
    "lhci": "lhci autorun --config=./lighthouserc.mobile.json && lhci autorun --config=./lighthouserc.desktop.json",
    "verify": "pnpm lint && pnpm typecheck && pnpm test:coverage && pnpm build && pnpm test:export && pnpm lhci"
```

- [ ] **Step 2: Failing test (slice 1: exported HTML)** — `tests/export/exported-html.test.ts`

```ts
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { measureInitialJavaScript } from "../../scripts/initial-javascript.mjs";
import { FORBIDDEN_TERMS } from "../forbidden-terms";
import baseline from "./initial-js-baseline.json";

const OUT_DIRECTORY = join(process.cwd(), "out");
const APP_JAVASCRIPT_BUDGET_BYTES = 90 * 1024;

const listHtmlFiles = (): string[] =>
  readdirSync(OUT_DIRECTORY, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));

const readOut = (file: string) => readFileSync(join(OUT_DIRECTORY, file), "utf8");

beforeAll(() => {
  if (!existsSync(join(OUT_DIRECTORY, "index.html"))) throw new Error("Run pnpm build before pnpm test:export");
});

describe("exported HTML", () => {
  it.each(FORBIDDEN_TERMS)("never mentions %s", (term) => {
    const offenders = listHtmlFiles().filter((file) =>
      readFileSync(file, "utf8").toLowerCase().includes(term.toLowerCase()),
    );
    expect(offenders).toEqual([]);
  });

  it("ships the Netlify form in static HTML", () => {
    const home = readOut("index.html");
    expect(home).toContain('name="contato"');
    expect(home).toContain('data-netlify="true"');
    expect(home).toContain('netlify-honeypot="bot-field"');
  });

  it("has no dead links or login route", () => {
    const home = readOut("index.html");
    expect(home).not.toContain('href="#"');
    expect(home).not.toContain("/login");
    expect(existsSync(join(OUT_DIRECTORY, "login.html"))).toBe(false);
  });

  it("exports the privacy page, sitemap and robots", () => {
    expect(readOut("privacidade.html")).toContain("Política de Privacidade");
    expect(readOut("sitemap.xml")).toContain("/privacidade");
    expect(readOut("robots.txt")).toContain("Sitemap:");
  });

  it("keeps the landing JavaScript within 90 KB gzip on top of the Next runtime", () => {
    const { gzipBytes } = measureInitialJavaScript(OUT_DIRECTORY);
    expect(gzipBytes - baseline.gzipBytes).toBeLessThanOrEqual(APP_JAVASCRIPT_BUDGET_BYTES);
  });

  it("keeps GSAP and dotLottie out of the initial chunks", () => {
    const { files } = measureInitialJavaScript(OUT_DIRECTORY);
    const initialCode = files.map((file) => readFileSync(join(OUT_DIRECTORY, file), "utf8")).join("\n");
    expect(initialCode).not.toContain("ScrollTrigger");
    expect(initialCode).not.toContain("DotLottie");
  });
});
```

Run red first on purpose against a stale state: `rm -rf out && pnpm test:export` → FAIL `Run pnpm build before pnpm test:export`. Then `pnpm build && pnpm test:export` → expected PASS; if any assertion fails, fix the product code (not the test) in its own `fix:` commit and paste both outputs.

- [ ] **Step 3: Failing test (slice 2: rendered page)** — `tests/export/static-server.ts`

```ts
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { extname, join, normalize } from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const resolveFile = (root: string, urlPath: string): string | undefined => {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0] ?? "/"));
  const candidates = [cleanPath, `${cleanPath}.html`, join(cleanPath, "index.html")].map((candidate) =>
    join(root, candidate),
  );
  return candidates.find((candidate) => candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile());
};

export const startStaticServer = (root: string): Promise<{ url: string; server: Server }> =>
  new Promise((resolve) => {
    const server = createServer((request, response) => {
      const file = resolveFile(root, request.url ?? "/");
      if (!file) {
        response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        response.end(readFileSync(join(root, "404.html")));
        return;
      }
      response.writeHead(200, { "Content-Type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream" });
      response.end(readFileSync(file));
    });
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      resolve({ url: `http://127.0.0.1:${port}`, server });
    });
  });
```

`tests/export/rendered-page.test.ts`:

```ts
import type { Server } from "node:http";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startStaticServer } from "./static-server";

let browser: Browser;
let server: Server;
let baseUrl: string;

beforeAll(async () => {
  const started = await startStaticServer(join(process.cwd(), "out"));
  server = started.server;
  baseUrl = started.url;
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
  server.close();
});

describe("rendered landing page", () => {
  it("has no horizontal scroll at 375px", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(baseUrl);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBe(0);
    await page.close();
  });

  it("keeps every control at least 44px tall with 16px form text", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(baseUrl);
    const problems = await page.evaluate(() => {
      const selector = "button, summary, select, textarea, input:not([type=hidden]):not([type=checkbox]), nav a, [role=tab]";
      return [...document.querySelectorAll<HTMLElement>(selector)]
        .filter((element) => element.offsetParent !== null)
        .flatMap((element) => {
          const issues: string[] = [];
          if (element.getBoundingClientRect().height < 44) issues.push(`${element.outerHTML.slice(0, 80)} is short`);
          const isFormControl = ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName);
          if (isFormControl && parseFloat(getComputedStyle(element).fontSize) < 16) {
            issues.push(`${element.outerHTML.slice(0, 80)} font < 16px`);
          }
          return issues;
        });
    });
    expect(problems).toEqual([]);
    await page.close();
  });

  it("shows all content without JavaScript", async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl);
    await expect(page.getByText("Resumo Inteligente Qore").isVisible()).resolves.toBe(true);
    await expect(page.locator("#plataforma figure").count()).resolves.toBe(5);
    await expect(page.getByText("Para quem prepara a proposta").isVisible()).resolves.toBe(true);
    await expect(page.getByRole("button", { name: "Quero falar com a equipe" }).isVisible()).resolves.toBe(true);
    await context.close();
  });

  it("opens and closes an FAQ answer natively", async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl);
    const question = page.locator("#faq summary").first();
    await question.click();
    await expect(page.locator("#faq details").first().getAttribute("open")).resolves.toBe("");
    await question.click();
    await expect(page.locator("#faq details").first().getAttribute("open")).resolves.toBeNull();
    await page.close();
  });

  it("serves the exported 404 for unknown paths", async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${baseUrl}/nao-existe`);
    expect(response?.status()).toBe(404);
    await page.close();
  });
});
```

Run: `pnpm build && pnpm test:export`. Paste the output. Any failure is a product bug: fix it in the product code with its own `fix:` commit (e.g. a link shorter than 44px), rerun until green.

- [ ] **Step 4: Lock coverage** — in `vitest.config.ts` set:

```ts
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/**", "src/hooks/**"],
      exclude: ["src/components/ui/**", "**/*.test.{ts,tsx}"],
      thresholds: { statements: 91, branches: 91, functions: 91, lines: 91 },
    },
```

Run: `pnpm test:coverage`. If a metric is below 91, the output names the file; add the missing behavior test at an already-agreed seam of that file (red → green), never lower the threshold.

- [ ] **Step 5: Lighthouse CI** — `lighthouserc.mobile.json`

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out",
      "autodiscoverUrlBlocklist": ["/404.html", "/_not-found.html"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 1 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 1 }]
      }
    },
    "upload": { "target": "filesystem", "outputDir": "./.lighthouseci/mobile" }
  }
}
```

`lighthouserc.desktop.json` — identical except `"collect"` gains `"settings": { "preset": "desktop" }` and `"outputDir": "./.lighthouseci/desktop"`.

Append to `.gitignore`:

```
# lighthouse
/.lighthouseci/
```

Run: `pnpm build && pnpm lhci`. Expected: `All results processed!` for both runs with no failed assertions. On failure, open the JSON report in `.lighthouseci/`, fix the product (one `fix:` commit per root cause), rerun. Paste the final summary lines.

- [ ] **Step 6: Full verify** — `pnpm verify` → exit 0.

- [ ] **Step 7: Commit**

```bash
git add vitest.export.config.ts tests/export/exported-html.test.ts package.json pnpm-lock.yaml
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "test: check the exported HTML for forbidden terms, the form and the JS budget"
git add tests/export/static-server.ts tests/export/rendered-page.test.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "test: check 375px layout, touch targets and no-JavaScript content in Chromium"
git add vitest.config.ts
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "test: lock coverage above 90 percent"
git add lighthouserc.mobile.json lighthouserc.desktop.json .gitignore
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "ci: require Lighthouse 100 on mobile and desktop"
```

---

#### Part 18: Project docs — pnpm, commands and conventions

**Files:**
- Modify (gitignored, not committed): `.claude/CLAUDE.md`, `.claude/agents/qore-frontend-architect.md`, `.claude/agents/qore-performance-engineer.md`
- Modify (committed): `README.md`

No code: no TDD cycle. Verification is by grep.

- [ ] **Step 1: `.claude/CLAUDE.md`** — replace the Stack, Comandos and Convenções sections with:

```markdown
## O que é

Landing page do Qore (SaaS de licitações públicas). Piloto só em São Paulo, captação de leads pelo Netlify Forms. Spec: `docs/specs/2026-09-25-landing-relaunch/design.md`.

## Stack

Next.js 15.5 (App Router, `output: "export"`) + React 19 + Tailwind 4 (`@theme` em `src/app/globals.css`, tokens do Institutional Clarity) + primitivos shadcn/ui sobre `radix-ui` + `lucide-react`. Animações sob demanda: GSAP ScrollTrigger, `@lottiefiles/dotlottie-web`, Motion (`LazyMotion`). TypeScript strict, pnpm. Deploy estático no Netlify (`pnpm build` → `out/`).

## Comandos

```bash
pnpm dev                  # dev server
pnpm build                # export estático → out/
pnpm lint                 # eslint
pnpm typecheck            # tsc --noEmit
pnpm test                 # vitest (unit + componentes)
pnpm test:coverage        # vitest com limiar de 91% travado
pnpm test:export          # checagens sobre out/ (rodar depois do build)
pnpm lhci                 # Lighthouse CI mobile e desktop, mínimo 1.0 nas 4 categorias
pnpm verify               # tudo acima em ordem
pnpm brand:assets         # regera public/og.png e src/app/apple-icon.png
pnpm screenshots:capture  # captura telas do qore-web (npm run dev na branch developer, porta 3000)
```

`NEXT_PUBLIC_SITE_URL` (padrão `https://qore.com.br`) define canonical, sitemap, robots, OG e JSON-LD.

## Convenções locais

- `src/app/page.tsx` monta as seções na ordem da spec; cada seção em `src/components/sections/*.tsx`. Server Component por padrão; ilhas `"use client"` só para menu, abas, toggle, formulário e animações.
- Copy e dados em `src/config/*` (`home-content.ts`, `faq.ts`, `navigation.ts`, `site.ts`), nunca dentro do componente.
- Primitivos em `src/components/ui/*` vêm do shadcn, mas foram ajustados para alvo de 44px, input de 16px e anel de foco duplo. Mantenha esses ajustes ao regerar.
- Toda tela de produto leva o selo "Tela ilustrativa"; mini-painéis levam "Exemplo ilustrativo". Termos proibidos em `tests/forbidden-terms.ts`.
- `siteConfig.legal` vazio é bloqueio de go-live.
- `out/` é artefato de build.
```

- [ ] **Step 2: Agents** — in `.claude/agents/qore-frontend-architect.md` replace line 17 with `- **pnpm** como package manager. \`pnpm dev\`, \`pnpm build\`. Build é validado.` and line 50 with `- **Valide** ao fim de mudanças significativas: \`pnpm verify\`.`. In `.claude/agents/qore-performance-engineer.md` replace lines 37–38 with:

```markdown
  - `pnpm build && pnpm test:export` — confere o orçamento de JS inicial e os chunks sob demanda.
  - `pnpm lhci` — Lighthouse CI mobile e desktop sobre `out/`.
```

- [ ] **Step 3: Verify**

Run: `grep -rn "bun" .claude/CLAUDE.md .claude/agents/`
Expected: no output. (`.claude/settings.local.json` still lists `bun` permissions — left untouched on purpose; tell Emerson.)

- [ ] **Step 4: README** — replace `README.md`:

```markdown
# Qore — landing page

Landing do piloto do Qore em São Paulo. Next.js (export estático) no Netlify.

```bash
pnpm install
pnpm dev
pnpm verify
```

Variável: `NEXT_PUBLIC_SITE_URL` (padrão `https://qore.com.br`).
Spec: `docs/specs/2026-09-25-landing-relaunch/design.md`.
```

- [ ] **Step 5: Commit (README only; `.claude/` is gitignored)**

```bash
git add README.md
git -c user.name="Emerson Silva" -c user.email="emerson_jdss@hotmail.com" commit -m "docs: document pnpm commands and the site URL variable"
```

Report to Emerson that `.claude/CLAUDE.md` and the agents were updated locally but are gitignored.

---

## Self-review

**Spec coverage**

| Spec item | Task |
| --- | --- |
| Remove stats, testimonials, pricing, social-proof, trust-badges, dashboard-mockup, features-grid, feature-showcase, cta-section, /login, testimonials/pricing config, JSON-LD offer | 2 |
| Server Components by default, islands only | 6–14 |
| FAQ with native `<details>` | 10 |
| Tokens in `@theme`, no CDN Tailwind, no Material Symbols, lucide icons | 4, all sections |
| Fonts Hanken Grotesk 600/700 + Inter 400/500/600, latin, swap | 4 |
| Logo SVG + wordmark, favicon + apple-icon from same SVG | 5, 15 |
| `NEXT_PUBLIC_SITE_URL` driving canonical/sitemap/robots/OG/JSON-LD | 1, 15 |
| Netlify Forms, honeypot, fetch urlencoded POST `/`, in-page success/error | 11 |
| No placeholders for legal data; privacy page with finalidade, dados, base legal, retenção, direitos, controlador fallback | 11 |
| AVIF/WebP screenshots via sharp, `<picture>`, width/height, lazy | 8, 16 |
| "Tela ilustrativa" / "Exemplo ilustrativo"; SPA-426 panels absent | 7, 8, 9, 16 |
| Sections 1–12 in order with specified animations | 6–14 |
| Lighthouse 1.0 ×4 mobile+desktop, staticDistDir ./out | 17 |
| JS budget, lazy GSAP/Lottie/Motion, no external CSS import, CLS 0 | 4, 12–14, 17 (resolution §1, §3) |
| transform/opacity only; reduced motion; no-JS content | 4, 6, 8, 9, 12–14, 17 |
| AA contrast, focus ring, 44px, 16px, headings, landmarks, skip link, `lang` | 4, 6, 17 |
| No horizontal scroll at 375px | 17 |
| netlify.toml pnpm, no SPA redirect, HSTS, Permissions-Policy | 3 |
| `sitemap.ts`, `robots.ts` replacing static files | 2, 15 |
| Metadata, OG 1200×630 by script, Twitter card | 15 |
| JSON-LD Organization/WebSite/FAQPage, no SoftwareApplication | 15 |
| Scripts `test`, `typecheck`, `lhci` | 1, 17 |
| `.claude/CLAUDE.md` and agents pnpm | 18 |
| Vitest: form validation, fetch success/error, persona toggle, phone mask, env URLs, JSON-LD | 1, 9, 11, 15 |
| Coverage >90% on 4 metrics, locked | 17 |
| Forbidden-terms scan of exported HTML | 2 (source), 17 (HTML) |

**Placeholder scan:** the only literal left for the implementer to fill is the measured `gzipBytes` in Part 2 Step 6 (a runtime measurement, with the exact command). Part 13 names a fallback if the WASM filename differs. No TBD/TODO.

**Type consistency:** `siteConfig.{name,slogan,description,url,legal}` (Part 2) used in 6, 11, 15. `CONTACT_HREF` (Part 6) used in 7, 10. `PlatformTab.image` basenames (Part 8) match Part 16 capture names. `ContactFormStatus` is defined in `contact-submit-button.tsx` (Part 11) and kept in Part 14. `useNearViewport`, `prefersReducedMotion`, `isDesktopViewport`, `loadScrollTrigger` (Part 12) used in 12–13. `IntersectionObserverMock.trigger` / `installMatchMediaMock` (Part 6) used in 12–13. `AiReadingPoster` (Part 9) reused in 13. `measureInitialJavaScript` / baseline JSON (Part 2) used in 17.
