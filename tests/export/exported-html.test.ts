import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { measureInitialJavaScript } from "../../scripts/initial-javascript.mjs";
import { FORBIDDEN_TERMS } from "../forbidden-terms";
import baseline from "./initial-js-baseline.json";

const OUT_DIRECTORY = join(process.cwd(), "out");
const APP_JAVASCRIPT_BUDGET_BYTES = 90 * 1024;
const SUBSET_FONT_CHARACTERS = /^[\u0020-\u007e\u00a0-\u00ff\u2013\u2014\u2018-\u201a\u201c-\u201e\u2022\u2026\s]*$/;

const readVisibleText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ");

const listHtmlFiles = (): string[] =>
  readdirSync(OUT_DIRECTORY, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));

const readOut = (file: string) => readFileSync(join(OUT_DIRECTORY, file), "utf8");

beforeAll(() => {
  if (!existsSync(join(OUT_DIRECTORY, "index.html"))) throw new Error("Run pnpm build before pnpm test:export");
});

describe("exported HTML", () => {
  it("inlines the stylesheet with font URLs that resolve from any page", () => {
    listHtmlFiles().forEach((file) => {
      const html = readFileSync(file, "utf8");
      expect(html).not.toContain('rel="stylesheet"');
      const styles = html.match(/<style\b[^>]*>[\s\S]*?<\/style>/g) ?? [];
      styles.forEach((style) => expect(style).not.toContain("url(../media/"));
    });
    expect(readOut("index.html")).toContain("url(/_next/static/media/");
  });

  it("ships no legacy polyfills to the Baseline browsers the site targets", () => {
    const chunkDirectory = join(OUT_DIRECTORY, "_next", "static", "chunks");
    const polyfilled = readdirSync(chunkDirectory, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
      .filter((entry) => readFileSync(join(entry.parentPath, entry.name), "utf8").includes("String.prototype.trimStart=String.prototype.trimLeft"))
      .map((entry) => entry.name);
    expect(polyfilled).toEqual([]);
  });

  it.each(FORBIDDEN_TERMS)("never mentions %s", (term) => {
    const offenders = listHtmlFiles().filter((file) =>
      readFileSync(file, "utf8").toLowerCase().includes(term.toLowerCase()),
    );
    expect(offenders).toEqual([]);
  });

  it("only uses characters the subset fonts cover", () => {
    const uncovered = listHtmlFiles().flatMap((file) =>
      [...new Set(readVisibleText(readFileSync(file, "utf8")))].filter((character) => !SUBSET_FONT_CHARACTERS.test(character)),
    );
    expect(uncovered).toEqual([]);
  });

  it.each(["index.html", "privacidade.html"])("calls the brand \"a Qore\" in %s, metadata included", (file) => {
    expect(readOut(file)).not.toMatch(/\b(o|ao|do|no|pelo) Qore\b/i);
  });

  it("ships the Netlify form in static HTML", () => {
    const home = readOut("index.html");
    expect(home).toContain('name="contato"');
    expect(home).toContain('data-netlify="true"');
    expect(home).toContain('netlify-honeypot="bot-field"');
    expect(home).toContain('name="companySize"');
    expect(home).toContain('name="monthlyTenders"');
  });

  it("has no dead links or login route", () => {
    const home = readOut("index.html");
    expect(home).not.toContain('href="#"');
    expect(home).not.toContain("/login");
    expect(existsSync(join(OUT_DIRECTORY, "login.html"))).toBe(false);
  });

  it("exports the privacy page, sitemap and robots", () => {
    expect(readOut("privacidade.html")).toContain("Política de Privacidade");
    expect(readOut("sitemap.xml")).toContain("/privacidade");
    expect(readOut("robots.txt")).toContain("Sitemap:");
  });

  it("keeps the landing JavaScript within 90 KB gzip on top of the Next runtime", () => {
    const { gzipBytes } = measureInitialJavaScript(OUT_DIRECTORY);
    expect(gzipBytes - baseline.gzipBytes).toBeLessThanOrEqual(APP_JAVASCRIPT_BUDGET_BYTES);
  });

  it("keeps GSAP out of the initial chunks", () => {
    const { files } = measureInitialJavaScript(OUT_DIRECTORY);
    const initialCode = files.map((file) => readFileSync(join(OUT_DIRECTORY, file), "utf8")).join("\n");
    expect(initialCode).not.toContain("GreenSock");
    expect(initialCode).not.toContain("scrollerProxy");
  });

  it("loads the mobile menu dialog only when it is opened", () => {
    const { files } = measureInitialJavaScript(OUT_DIRECTORY);
    const initialCode = files.map((file) => readFileSync(join(OUT_DIRECTORY, file), "utf8")).join("\n");
    expect(initialCode).not.toContain("FocusScope");
    expect(initialCode).not.toContain("RemoveScroll");
  });
});
