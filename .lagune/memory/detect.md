# Qore LP Detect Map

- **Scope:** full project scan (static Next.js export served by Netlify: headers, Netlify Forms `contato` and `radar`, client-side CNPJ radar, inline JSON-LD, production dependencies, build scripts)
- **Mapped:** 2026-09-26

## Findings

### Missing Content-Security-Policy

- **What it is:** The site sends frame, sniffing, referrer, HSTS, and permissions headers, but no Content-Security-Policy. The browser is never told which scripts, styles, fonts, and API hosts the page is allowed to use.
- **Why it matters:** Without a policy, any script that gets onto the page (a compromised package, an injected tag) can load more code from anywhere and send the contact and radar form data (name, e-mail, phone, CNPJ) to any server. The policy is the second wall behind React's escaping.
- **Evidence:** The catch-all `/*` headers block in the Netlify configuration lists five security headers and no CSP. The page uses inline Next export scripts, an inline JSON-LD block, self-hosted fonts, inline styles, and browser calls to brasilapi.com.br and pncp.gov.br plus a POST to the site root for Netlify Forms.

### Public lead forms rely only on a honeypot

- **What it is:** The `contato` and `radar` Netlify forms accept anonymous POSTs. The only anti-automation control in the code is the `bot-field` honeypot; the radar lead is sent by script with `bot-field` always empty and no visible trap.
- **Why it matters:** A bot can post straight to the site root with `form-name=contato` or `radar` and flood the lead inbox with junk or fake personal data, burying real leads and the Netlify submission quota.
- **Evidence:** The contact form component declares the honeypot; the radar lead encoder hard-codes an empty `bot-field`; both post through `postNetlifyForm`.

### Radar sends the CNPJ to third parties not named in the privacy policy

- **What it is:** When a visitor runs the radar, the browser sends the typed CNPJ to BrasilAPI and queries PNCP. The privacy policy names only Netlify as a processor of the data collected.
- **Why it matters:** For a MEI the CNPJ identifies a person. Under LGPD the visitor must be told which third parties receive their data; an undisclosed recipient is a transparency gap the company has to answer for.
- **Evidence:** The company lookup in the radar module calls the BrasilAPI CNPJ endpoint directly from the browser; the privacy configuration lists Netlify as the only processor.

### Radar lead stores the company name returned by the Receita lookup

- **What it is:** The radar lead sent to Netlify Forms includes `companyName` and `activity` exactly as BrasilAPI returned them.
- **Why it matters:** For a MEI the legal name often carries the owner's full name and, in the older format, their CPF. The site then stores personal data the visitor never typed and the form does not need, against the minimization rule of LGPD.
- **Evidence:** The radar lead gate passes `result.company.name` into the lead encoder, which forwards it to the `radar` Netlify form.

## Applied sub-skills

- .lagune/skills/regex.md: checker over the whole project; `src` and `tests` are clean; unsafe patterns found only in generated `out/` and `coverage/` (build artifacts, git-ignored).
- .lagune/skills/browser.md: "Missing Content-Security-Policy". Confirmed held: JSON-LD is built from site config only and `serializeJsonLd` escapes `<`; radar results and errors render as React text from fixed pt-BR constants; no DOM HTML sinks, no web storage, no `postMessage`, no `target="_blank"`; framing denied by `X-Frame-Options: DENY`.
- .lagune/skills/javascript.md: no `eval`, `Function`, dynamic `require`, or bracket assignment from untrusted keys in `src`; API JSON is read through `isRecord`/`readString` guards.
- .lagune/skills/network.md: radar destinations are two fixed HTTPS hosts; the checker returns `safe` for both; the CNPJ reaches the URL only as 14 digits after `extractCnpjDigits`.
- .lagune/skills/http-request.md: CORS checker clean; no cookies or sessions exist, so CSRF has nothing to ride; contributes to "Public lead forms rely only on a honeypot".
- .lagune/skills/transport.md: HSTS with two-year max-age is set; all third-party calls are HTTPS.
- .lagune/skills/secrets.md: checker flags only minified `out/` chunks (Next runtime); no secret in source, only `NEXT_PUBLIC_SITE_URL`, which is public by design.

## Not determined

- Whether Netlify's own spam filter (Akismet) and submission limits are enabled on this site: that lives in the Netlify dashboard, not in the repository.
- Whether lead exports from Netlify are opened in a spreadsheet (CSV formula injection from lead fields); the repository does not produce CSV.
