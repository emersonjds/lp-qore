// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "../../scripts/content-security-policy.mjs";

const sha256 = (code: string) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`;

const directivesOf = (policy: string) =>
  new Map(
    policy.split(";").map((directive) => {
      const [name = "", ...sources] = directive.trim().split(/\s+/);
      return [name, sources] as const;
    }),
  );

describe("buildContentSecurityPolicy", () => {
  const pages = [
    '<script src="/_next/static/chunks/a.js"></script><script>self.__next_f.push([1])</script>' +
      '<script type="application/ld+json">{"@context":"https://schema.org"}</script>',
    "<script>self.__next_f.push([2])</script><script>self.__next_f.push([1])</script>",
  ];

  it("allows exactly the inline scripts of every page by hash, with no unsafe-inline for scripts", () => {
    const scriptSources = directivesOf(buildContentSecurityPolicy(pages)).get("script-src");
    expect(scriptSources).toEqual(["'self'", sha256("self.__next_f.push([1])"), sha256("self.__next_f.push([2])")]);
  });

  it("keeps the rest of the policy scoped to what the page loads", () => {
    const directives = directivesOf(buildContentSecurityPolicy(pages));
    expect(directives.get("default-src")).toEqual(["'self'"]);
    expect(directives.get("style-src")).toEqual(["'self'", "'unsafe-inline'"]);
    expect(directives.get("font-src")).toEqual(["'self'"]);
    expect(directives.get("img-src")).toEqual(["'self'", "data:"]);
    expect(directives.get("connect-src")).toEqual(["'self'", "https://brasilapi.com.br", "https://pncp.gov.br"]);
    expect(directives.get("form-action")).toEqual(["'self'"]);
    expect(directives.get("frame-ancestors")).toEqual(["'none'"]);
    expect(directives.get("base-uri")).toEqual(["'self'"]);
    expect(directives.get("object-src")).toEqual(["'none'"]);
    expect(directives.has("upgrade-insecure-requests")).toBe(true);
  });
});
