import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { measureInitialJavaScript } from "../../scripts/initial-javascript.mjs";
import { FORBIDDEN_TERMS } from "../forbidden-terms";
import baseline from "./initial-js-baseline.json";

const OUT_DIRECTORY = join(process.cwd(), "out");
const APP_JAVASCRIPT_BUDGET_BYTES = 90 * 1024;

const listHtmlFiles = (): string[] =>
  readdirSync(OUT_DIRECTORY, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));

const readOut = (file: string) => readFileSync(join(OUT_DIRECTORY, file), "utf8");

beforeAll(() => {
  if (!existsSync(join(OUT_DIRECTORY, "index.html"))) throw new Error("Run pnpm build before pnpm test:export");
});

describe("exported HTML", () => {
  it.each(FORBIDDEN_TERMS)("never mentions %s", (term) => {
    const offenders = listHtmlFiles().filter((file) =>
      readFileSync(file, "utf8").toLowerCase().includes(term.toLowerCase()),
    );
    expect(offenders).toEqual([]);
  });

  it("ships the Netlify form in static HTML", () => {
    const home = readOut("index.html");
    expect(home).toContain('name="contato"');
    expect(home).toContain('data-netlify="true"');
    expect(home).toContain('netlify-honeypot="bot-field"');
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
});
