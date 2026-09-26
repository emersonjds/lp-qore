import type { Server } from "node:http";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startStaticServer } from "./static-server";

let browser: Browser;
let server: Server;
let baseUrl: string;

beforeAll(async () => {
  const started = await startStaticServer(join(process.cwd(), "out"));
  server = started.server;
  baseUrl = started.url;
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
  server.close();
});

describe("rendered landing page", () => {
  it("has no horizontal scroll at 375px", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(baseUrl);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBe(0);
    await page.close();
  });

  it("keeps every control at least 44px tall with 16px form text", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(baseUrl);
    const problems = await page.evaluate(() => {
      const selector = "button, summary, select, textarea, input:not([type=hidden]):not([type=checkbox]), nav a, [role=tab]";
      return [...document.querySelectorAll<HTMLElement>(selector)]
        .filter((element) => element.offsetParent !== null)
        .flatMap((element) => {
          const issues: string[] = [];
          if (element.getBoundingClientRect().height < 44) issues.push(`${element.outerHTML.slice(0, 80)} is short`);
          const isFormControl = ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName);
          if (isFormControl && parseFloat(getComputedStyle(element).fontSize) < 16) {
            issues.push(`${element.outerHTML.slice(0, 80)} font < 16px`);
          }
          return issues;
        });
    });
    expect(problems).toEqual([]);
    await page.close();
  });

  it("shows all content without JavaScript", async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl);
    await expect(page.getByText("Resumo Inteligente Qore").first().isVisible()).resolves.toBe(true);
    await expect(page.locator("#plataforma figure").count()).resolves.toBe(5);
    await expect(page.getByText("Seu dia sem planilha nem PDF de 80 páginas").isVisible()).resolves.toBe(true);
    await expect(page.getByRole("button", { name: "Quero assinar" }).isVisible()).resolves.toBe(true);
    await context.close();
  });

  it("hydrates the islands after the first paint", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(baseUrl);
    await page.getByRole("tab").first().waitFor({ state: "visible", timeout: 10_000 });
    expect(errors).toEqual([]);
    await page.close();
  });

  it("opens the mobile menu on demand", async () => {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(baseUrl);
    await page.getByRole("tab").first().waitFor({ state: "attached", timeout: 10_000 });
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Como funciona" }).waitFor({ state: "visible", timeout: 10_000 });
    await page.close();
  });

  it("opens and closes an FAQ answer natively", async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl);
    const question = page.locator("#faq summary").first();
    await question.click();
    await expect(page.locator("#faq details").first().getAttribute("open")).resolves.toBe("");
    await question.click();
    await expect(page.locator("#faq details").first().getAttribute("open")).resolves.toBeNull();
    await page.close();
  });

  it("serves the exported 404 for unknown paths", async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${baseUrl}/nao-existe`);
    expect(response?.status()).toBe(404);
    await page.close();
  });
});
