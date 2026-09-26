# Lagune History

## Closed findings

### Production dependencies with known advisories

- **Classification:** Low
- **Category:** Use of components with known vulnerabilities (CWE-1395)
- **What it is:** `pnpm audit --prod` reports 34 advisories (2 critical, 17 high, 13 moderate, 2 low) in `next@15.5.12` and in packages it pulls in (`postcss@8.4.31`, `nanoid`, `sharp`).
- **Closed:** 2026-09-26

### Backtracking regex in the initial JavaScript measure script

- **Classification:** Low
- **Category:** Regular expression denial of service (CWE-1333)
- **What it is:** The build check that measures how much JavaScript the home page loads finds script tags with a regular expression that the Lagune ReDoS checker marks unsafe (`<script[^>]*\ssrc="([^"]+)"`).
- **Closed:** 2026-09-26
