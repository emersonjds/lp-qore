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

  it("points the site URL at the Netlify address until the own domain is live", () => {
    expect(netlifyConfig).toContain('NEXT_PUBLIC_SITE_URL = "https://qorelicitacoes.netlify.app"');
  });
});
