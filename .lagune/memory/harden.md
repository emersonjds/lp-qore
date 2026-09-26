# Qore LP Hardening Record

- **Scope:** all fixes in the defense plan (the run was authorized in the task brief; fixes marked "owner decision" in the plan were not applied)
- **Hardened:** 2026-09-26

## Applied

### Missing Content-Security-Policy

- **Status:** Partial
- **What changed:** The site now sends a Content-Security-Policy on every path: only its own scripts, styles, fonts, and images (plus `data:` images), browser calls only to itself, BrasilAPI, and PNCP, forms posting only to itself, no framing, no plugins, and a fixed base URL. A headless-browser check serves the exported site with the same header read from the Netlify configuration and fails on any CSP violation, while running the radar and both forms.
- **Where:** The catch-all headers block of the Netlify configuration; the unit check on the Netlify configuration; a new export check on CSP; the export test static server now accepts extra response headers.
- **Verdict:** ❓ Inconclusive
- **Reason:** Header present and proven in headless Chromium (zero violations on /, /privacidade/, 404, radar and both forms; stripping `'unsafe-inline'` or the API hosts makes the check fail). `script-src 'unsafe-inline'` still lets an injected inline script run; closing needs hash-based script-src, and Netlify's production header merge is not provable locally.

## Remaining

- Missing Content-Security-Policy: `script-src` keeps `'unsafe-inline'` because the static export inlines its flight data. A hash-based policy needs a post-build step that writes the hashes of every inline script into the deployed headers; owner decision.
- Public lead forms rely only on a honeypot: owner decision (confirm Netlify spam filter, or add a challenge that must enter the CSP and privacy policy). Not applied.
- Radar sends the CNPJ to third parties not named in the privacy policy: owner decision on legal copy. Not applied.
- Radar lead stores the company name returned by the Receita lookup: owner decision (drop the name or strip CPF-like digits). Not applied.
