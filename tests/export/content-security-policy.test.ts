import { readFileSync } from "node:fs";
import type { Server } from "node:http";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startStaticServer } from "./static-server";

const netlifyConfig = readFileSync(join(process.cwd(), "netlify.toml"), "utf8");
const contentSecurityPolicy = /Content-Security-Policy = "([^"\n]*)"/.exec(netlifyConfig)?.[1] ?? "";

let browser: Browser;
let server: Server;
let baseUrl: string;

beforeAll(async () => {
  const started = await startStaticServer(join(process.cwd(), "out"), {
    "Content-Security-Policy": contentSecurityPolicy,
  });
  server = started.server;
  baseUrl = started.url;
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
  server.close();
});

const openWithViolationLog = async (path: string): Promise<{ page: Page; violations: string[] }> => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const violations: string[] = [];
  page.on("console", (message) => {
    if (message.text().includes("Content Security Policy")) violations.push(message.text());
  });
  await page.route("https://brasilapi.com.br/**", (route) =>
    route.fulfill({
      json: { razao_social: "Empresa Teste Ltda", cnae_fiscal_descricao: "Comércio de medicamentos", municipio: "Campinas", uf: "SP" },
    }),
  );
  await page.route("https://pncp.gov.br/**", (route) =>
    route.fulfill({
      json: {
        totalRegistros: 1,
        data: [{ objetoCompra: "Aquisição de medicamentos", orgaoEntidade: { razaoSocial: "Prefeitura" }, dataEncerramentoProposta: "2026-10-10T10:00:00" }],
      },
    }),
  );
  await page.route(`${baseUrl}/`, (route) =>
    route.request().method() === "POST" ? route.fulfill({ status: 200, body: "" }) : route.fallback(),
  );
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  return { page, violations };
};

describe("Content-Security-Policy from netlify.toml", () => {
  it("is declared", () => {
    expect(contentSecurityPolicy).toContain("default-src 'self'");
  });

  it.each(["/", "/privacidade/", "/pagina-inexistente"])("renders %s without violations", async (path) => {
    const { page, violations } = await openWithViolationLog(path);
    await page.mouse.wheel(0, 20_000);
    await page.waitForTimeout(500);
    expect(violations).toEqual([]);
    await page.close();
  });

  it("keeps the CNPJ radar and its lead form working", async () => {
    const { page, violations } = await openWithViolationLog("/");
    await page.fill("#radar-cnpj", "11222333000181");
    await page.click('[data-cta="radar-search"]');
    expect(await page.locator("#radar-company").textContent()).toBe("Empresa Teste Ltda");
    await page.fill("#radar-name", "Maria");
    await page.fill("#radar-email", "maria@empresa.com.br");
    await page.check("#radar-consent");
    await page.click('[data-cta="radar-lead-submit"]');
    await page.locator('[data-cta="radar-lead-submit"]:disabled').waitFor();
    expect(await page.locator('[data-cta="radar-lead-submit"]').isDisabled()).toBe(true);
    expect(violations).toEqual([]);
    await page.close();
  });

  it("keeps the contact form submitting", async () => {
    const { page, violations } = await openWithViolationLog("/");
    await page.fill("#contact-name", "João Silva");
    await page.fill("#contact-email", "joao@empresa.com.br");
    await page.fill("#contact-phone", "11987654321");
    await page.selectOption("#contact-role", { index: 1 });
    await page.selectOption("#contact-company-size", { index: 1 });
    await page.selectOption("#contact-monthly-tenders", { index: 1 });
    await page.check("#contact-consent");
    await page.locator('form[name="contato"] button[type="submit"]').click();
    await page.waitForFunction(() => document.body.innerText.includes("Recebemos seu contato, João Silva"));
    expect(violations).toEqual([]);
    await page.close();
  });
});
