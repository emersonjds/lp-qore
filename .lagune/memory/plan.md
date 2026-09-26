# Qore LP Defense Plan

- **Scope:** all detect findings
- **Planned:** 2026-09-26

## Fixes

### Public lead forms rely only on a honeypot

- **Category:** Missing anti-automation on a public form (CWE-799)
- **CVSS:** CVSS:4.0/AV:N/AC:L/AT:P/PR:N/UI:N/VC:N/VI:L/VA:N/SC:N/SI:N/SA:N (6.3, Medium)
- **Priority:** Medium
- **Why this priority:** Internet-facing and anonymous, but the only stake is the integrity of the lead inbox; assumed Netlify's spam filter is on (not confirmable from the repo).
- **Upholds:** III. Personal data is collected minimally and sent only to the form backend, IV. All visitor input is validated before use
- **Fix:** Owner decision. Options: confirm Netlify spam filtering in the dashboard (no code); or enable Netlify's reCAPTCHA / a Turnstile challenge, which adds a third-party script that must be named in the CSP and in the privacy policy. No code change until the owner picks one.
- **References:** [CWE-799: Improper Control of Interaction Frequency](https://cwe.mitre.org/data/definitions/799.html)

### Missing Content-Security-Policy

- **Category:** Missing defense-in-depth header (CWE-1021, CWE-693)
- **CVSS:** CVSS:4.0/AV:N/AC:H/AT:P/PR:N/UI:A/VC:L/VI:L/VA:N/SC:N/SI:N/SA:N (2.1, Low)
- **Priority:** Low
- **Why this priority:** No injection point exists today, so the header only limits the damage of a future one; the page holds lead PII, which keeps it first among the code fixes.
- **Upholds:** I. The page runs only the code the site ships, III. Personal data is collected minimally and sent only to the form backend
- **Fix:** Add a `Content-Security-Policy` to the `/*` headers: `default-src 'self'`, `script-src 'self' 'unsafe-inline'` (Next static export inlines its flight data and cannot carry nonces), `style-src 'self' 'unsafe-inline'`, `font-src 'self'`, `img-src 'self' data:`, `connect-src 'self' https://brasilapi.com.br https://pncp.gov.br`, `form-action 'self'`, `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'`. Prove it in a headless browser against the exported site with the header applied. A hash-based `script-src` without `'unsafe-inline'` is a follow-up owner decision (needs a post-build step that writes the hashes).
- **References:** [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

### Radar sends the CNPJ to third parties not named in the privacy policy

- **Category:** Insufficient transparency on personal data sharing (LGPD art. 9; CWE-359)
- **CVSS:** CVSS:4.0/AV:N/AC:H/AT:P/PR:N/UI:A/VC:L/VI:N/VA:N/SC:N/SI:N/SA:N (2.1, Low)
- **Priority:** Low
- **Why this priority:** Legal rather than technical exposure; the data is a company identifier that is personal only for a MEI.
- **Upholds:** III. Personal data is collected minimally and sent only to the form backend
- **Fix:** Owner decision (legal copy): name BrasilAPI and PNCP in the privacy policy as recipients of the CNPJ typed in the radar.
- **References:** [CWE-359: Exposure of Private Personal Information](https://cwe.mitre.org/data/definitions/359.html)

### Radar lead stores the company name returned by the Receita lookup

- **Category:** Collection of personal data beyond purpose (LGPD art. 6, III; CWE-359)
- **CVSS:** CVSS:4.0/AV:N/AC:H/AT:P/PR:H/UI:N/VC:L/VI:N/VA:N/SC:N/SI:N/SA:N (2.1, Low)
- **Priority:** Low
- **Why this priority:** Readable only by whoever has access to the Netlify form submissions; the sales team uses the name to qualify the lead.
- **Upholds:** III. Personal data is collected minimally and sent only to the form backend
- **Fix:** Owner decision: keep only the CNPJ in the lead (the name can be looked up again) or strip digit runs that look like a CPF from `companyName` before sending.
- **References:** [CWE-359: Exposure of Private Personal Information](https://cwe.mitre.org/data/definitions/359.html)

## Open questions

- Netlify dashboard settings (spam filter, form notifications, who can read submissions) are outside the repository.
