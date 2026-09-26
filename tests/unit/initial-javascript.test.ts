// @vitest-environment node
import { describe, expect, it } from "vitest";
import { listInitialScripts } from "../../scripts/initial-javascript.mjs";

describe("listInitialScripts", () => {
  it("lists the Next chunks loaded by script tags, without query strings", () => {
    const html =
      '<script src="/_next/static/chunks/a.js?v=1" async=""></script><script id="x" src="/_next/static/chunks/b.js"></script>' +
      '<script src="https://cdn.example.com/c.js"></script><script>self.__next_f=[]</script><link src="/_next/d.js">';
    expect(listInitialScripts(html)).toEqual(["/_next/static/chunks/a.js", "/_next/static/chunks/b.js"]);
  });

  it("scans hostile markup in linear time", () => {
    const html = "<script ".repeat(20_000);
    const startedAt = performance.now();
    expect(listInitialScripts(html)).toEqual([]);
    expect(performance.now() - startedAt).toBeLessThan(200);
  });
});
