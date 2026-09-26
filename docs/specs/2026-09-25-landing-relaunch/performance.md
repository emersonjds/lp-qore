# Performance: Lighthouse findings and decisions (26/09/2026)

## Lighthouse CI thresholds

| Preset | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| desktop | 1.0 | 1.0 | 1.0 | 1.0 |
| mobile | **0.96** (measured floor) | 1.0 | 1.0 | 1.0 |

The owner decides whether 0.96 on mobile is acceptable. The floor was measured on `/index.html` with `pnpm lhci`: 3 runs, all 0.96, LCP 2.8 s, FCP 1.1 s, TBT ≤ 10 ms, CLS 0.

## Why mobile stops at 0.96

- Lighthouse mobile uses simulated throttling (Lantern). It first loads the page without throttling, then replays the dependency graph at slow-4G speeds.
- Lantern treats every script whose evaluation starts before the observed LCP as LCP-blocking, in both its optimistic and its pessimistic graph.
- Served locally, every Next chunk finishes downloading in about 20 ms. Chrome's loading scheduler runs these already-downloaded async chunks before it presents the first frame. In our traces the main-thread paint came at about 53 ms and the frame was presented at about 72 ms, with the scripts evaluated in between.
- As a result, the Next/React runtime (about 115 KB gzip) is charged to LCP at slow-4G speeds. With every app chunk removed and only the runtime left, LCP was still 2.8 s.

## Levers measured

| Change | Mobile LCP | Mobile perf | Decision |
| --- | --- | --- | --- |
| Baseline (next/font/google, all chunks in `<head>`) | 2.9 s | 0.95 | — |
| Fonts subset to Portuguese glyphs and the weights in use (81 KB → 41 KB) | 2.8 s | 0.96–0.97 | kept |
| Mobile menu dialog (Radix) loaded on first open (−10.7 KB gzip initial JS) | 2.8 s | 0.96 | kept: less JS for every visitor |
| Fetch Next chunks only after first-contentful-paint | 1.8 s | 1.0 | **rejected** |
| `experimental.inlineCss` | 2.9 s | 0.95 | rejected: adds console errors |
| `content-visibility: auto` on sections below the fold | 2.9 s | 0.95 | rejected: breaks axe checks |
| Remove the hero blur filters | 2.9 s | 0.95 | rejected: no effect |
| Remove the font preload | 2.6 s (FCP 1.7 s) | 0.96 | rejected: FCP gets worse |

The chunk deferral was rejected because it hurts real users:
- On Slow 4G repeat visits the page never hydrated (0/5 runs). The loader ran at FCP, before the parser had reached the `_R_` placeholder.
- When it did work, it cost +640 ms to interactivity to save 96 ms of paint.

## Fonts

- The site serves Inter (400–600) and Hanken Grotesk (600–700) itself, as variable woff2 files. They are subset to U+0020–007E, U+00A0–00FF and the typographic punctuation the copy uses.
- `pnpm test:export` fails when the exported HTML uses a character outside that range.
- Both faces are above the fold (Hanken Grotesk for the H1, Inter for the subtitle), so both stay preloaded.
- The originals are kept in `assets/fonts/`. The regeneration command is in the README.
