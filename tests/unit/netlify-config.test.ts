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

  it("sends a Content-Security-Policy scoped to what the page loads", () => {
    const policy = /Content-Security-Policy = "([^"\n]*)"/.exec(netlifyConfig)?.[1] ?? "";
    const directives = new Map(
      policy.split(";").map((directive) => {
        const [name = "", ...sources] = directive.trim().split(/\s+/);
        return [name, sources.join(" ")] as const;
      }),
    );
    expect(directives.get("default-src")).toBe("'self'");
    expect(directives.get("script-src")).toBe("'self' 'unsafe-inline'");
    expect(directives.get("style-src")).toBe("'self' 'unsafe-inline'");
    expect(directives.get("font-src")).toBe("'self'");
    expect(directives.get("img-src")).toBe("'self' data:");
    expect(directives.get("connect-src")).toBe("'self' https://brasilapi.com.br https://pncp.gov.br");
    expect(directives.get("form-action")).toBe("'self'");
    expect(directives.get("frame-ancestors")).toBe("'none'");
    expect(directives.get("base-uri")).toBe("'self'");
    expect(directives.get("object-src")).toBe("'none'");
  });

  it("points the site URL at the Netlify address until the own domain is live", () => {
    expect(netlifyConfig).toContain('NEXT_PUBLIC_SITE_URL = "https://qorelicitacoes.netlify.app"');
  });
});
