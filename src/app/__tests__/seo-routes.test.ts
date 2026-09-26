import { describe, expect, it } from "vitest";
import robots from "../robots";
import sitemap from "../sitemap";

describe("sitemap", () => {
  it("lists the home and the privacy page", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://qore.com.br/", "https://qore.com.br/privacidade"]);
  });
});

describe("robots", () => {
  it("allows crawling and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://qore.com.br/sitemap.xml",
    });
  });
});
