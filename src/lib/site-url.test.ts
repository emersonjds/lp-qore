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
