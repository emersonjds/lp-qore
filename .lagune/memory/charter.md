# Qore LP Security Charter

## Principles

### I. The page runs only the code the site ships

Always serve the site with a Content-Security-Policy that allows scripts, styles, fonts, and images only from the site itself (plus the inline pieces the static export needs), lets the browser call only the named public APIs, and forbids being framed. Never load third-party scripts without adding them to the policy on purpose.

- Why: a landing page that collects contact details is a phishing target. Without a policy, one injected script (a compromised dependency, a bad copy paste) can read the form and send the leads anywhere.

### II. Responses from outside services are data, never markup

Always treat what brasilapi.com.br and pncp.gov.br return as untrusted. Validate the shape before use, render it only as text through React, and never show a raw server message or error body to the visitor.

- Why: a third-party API can be compromised, spoofed, or simply change. Rendering its content as HTML or echoing its error text turns their problem into script running on our page.

### III. Personal data is collected minimally and sent only to the form backend

Always send lead data (name, e-mail, phone, CNPJ) only to the site's own form endpoint over HTTPS, collect only the fields the form needs, and never write it to browser storage, logs, analytics, or a URL.

- Why: under LGPD a lead's personal data leaking through a query string, a console log, or a third-party request is an incident the company must answer for.

### IV. All visitor input is validated before use

Always validate and bound form and CNPJ input at the point it is read (length, allowed characters, check digits) before it reaches a request URL, the form payload, or the page.

- Why: unchecked input is how a crafted value becomes a request to an unintended URL or markup injected into the page.

### V. Inline structured data cannot break out of its script tag

Always serialize JSON-LD with the characters that can close or confuse a script element escaped, and build it only from site configuration, never from visitor input.

- Why: an unescaped `</script>` inside inline JSON is a classic way to turn data into executable markup.

### VI. Dependencies stay patched and minimal

Always keep production dependencies free of known high or critical advisories, and never add a dependency for something the platform or a few lines already do.

- Why: every package is code running in the visitor's browser or in the build, and a known-vulnerable one is the cheapest attack there is.

## Baseline discipline

Lagune holds this charter, every principle, every time. A principle is not suspended because a control looks small, familiar, or unlikely to be hit. This is not a judgement call.

### Only the controls the project needs

Lagune recommends and applies only the controls this project's context calls for. A control the project does not need is never added for completeness, and a generic checklist is not thoroughness. Every later phase acts on what the system actually does, never on what it might hypothetically do.

- Why: effort spent on risks the project does not have buries the risks it does have. Fewer, right-sized controls are easier to apply, prove, and keep true than a checklist no one finishes.

### Prefer the simplest vetted control

When a control is needed, reach for the safest option already proven, in order: a control this project already has, then a platform or framework built-in, then a well-maintained vetted library, and only then custom code. Never hand-roll a security primitive (cryptography, escaping, authentication, sessions) that a vetted standard already provides. A new dependency is new attack surface, justified and not assumed. Code, an endpoint, or a feature the project does not use is attack surface too, so removing it is itself a control.

- Why: hand-rolled security is where subtle, unaudited bugs live, and a second control duplicating an existing one is the one that gets forgotten and drifts. Boring, standard controls are easier to audit and harder to get wrong, and less surface is less to defend.

### When a control seems skippable

A control is held even when a reason to skip it feels reasonable:

- "Too small to need a control": small gaps are where breaches start.
- "Already handled elsewhere": assumed coverage is exactly how gaps hide.
- "Unlikely to be hit": attackers target the path no one is watching.
- "It works, ship it": working and safe are different claims, and the charter requires both.

## Governance

This charter overrides ad hoc decisions on the landing page. Any change to headers, third-party calls, the forms, or dependencies is checked against it before merge. Amendments are made by the owner (Emerson), reviewed in a pull request, and bump the version. Defaults marked "pending owner decision" in the security report were adopted conservatively and stay until the owner confirms or changes them.

Version: 1.0.0 | Ratified: 2026-09-26
