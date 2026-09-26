/*
 * Captures the real qore-web panel for the landing page (docs/design/screenshots/, reference for the simulated screens; not shipped in the build).
 *
 * Prerequisites: qore-web on branch `developer`, `npm run dev` running there (MSW demo data is on by
 * default). The onboarding cookie `qore_onboarding_done=1` is set here, as in qore-web/tests/e2e/manager-dashboard.spec.ts.
 * Next 16 `next dev` may append an agent-rules block to qore-web/CLAUDE.md: restore it with `git checkout -- CLAUDE.md`.
 *
 * Env: QORE_WEB_URL (default http://localhost:3000), SCREENSHOTS_RAW_DIRECTORY (optional folder for the full PNGs to inspect).
 * Rerun: `QORE_WEB_URL=http://localhost:3000 pnpm screenshots:capture`, then `pnpm test tests/unit/screenshots.test.ts`.
 *
 * Temporary: /search shows national coverage copy ("todo o Brasil", "SP e RS") that the landing may not show.
 * The script hides it until Linear SPA-504 fixes the qore-web copy; delete hideNationalCoverageNotes then.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const baseUrl = process.env.QORE_WEB_URL ?? "http://localhost:3000";
const rawDirectory = process.env.SCREENSHOTS_RAW_DIRECTORY;
const outputDirectory = fileURLToPath(new URL("../docs/design/screenshots/", import.meta.url));
const DEVICE_SCALE_FACTOR = 2;
const FABRICATED_PANEL_TERMS = /go\/no-go|média histórica|concorrentes|todo o Brasil|SP e RS|Demais estados/i;
const DEV_OVERLAY_STYLE = "nextjs-portal, .tsqd-parent-container { display: none !important; }";
const MOBILE_HEADER_HEIGHT = 56;

const LAYOUTS = {
  desktop: { viewport: { width: 1280, height: 800 }, suffix: "", widths: [640, 1280] },
  mobile: {
    viewport: { width: 390, height: 844 + MOBILE_HEADER_HEIGHT },
    clip: { x: 0, y: MOBILE_HEADER_HEIGHT, width: 390, height: 844 },
    suffix: "-mobile",
    widths: [390, 780],
  },
};

const DEV_SWITCHER_NAMES = [/^Template da home ativo/, /^Papel de demonstração ativo/];

/** @param {import("playwright").Page} page */
const devSwitchers = (page) => DEV_SWITCHER_NAMES.map((name) => page.getByRole("button", { name }));

/** @param {import("playwright").Page} page */
const hideDevSwitchers = (page) =>
  Promise.all(
    devSwitchers(page).map((switcher) =>
      switcher.evaluateAll((elements) => elements.forEach((element) => (element.style.display = "none"))),
    ),
  );

/** @param {import("playwright").Page} page */
const settle = async (page) => {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
};

/** @param {import("playwright").Page} page */
const openPricingStep = async (page) => {
  await page.getByRole("link", { name: "Iniciar proposta" }).first().click();
  await page.getByRole("button", { name: "Avançar para Itens" }).click();
  await page.getByRole("button", { name: "Avançar para Precificação" }).click();
  await page.getByTestId("wizard-step-3").waitFor();
  await settle(page);
};

/** @param {import("playwright").Page} page */
const hideNationalCoverageNotes = (page) =>
  page.evaluate(() => {
    const notes = /todo o Brasil|SP e RS|Demais estados/;
    for (const element of document.querySelectorAll("body *")) {
      const ownText = [...element.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join("");
      if (notes.test(ownText)) element.style.display = "none";
    }
  });

/** @param {import("playwright").Page} page */
const searchWithSaoPauloOnly = async (page) => {
  await page.getByRole("checkbox", { name: /RS/ }).first().click();
  await page.getByPlaceholder("Buscar por objeto, órgão ou palavra-chave (ex: marketing)").fill("marketing");
  await page.keyboard.press("Enter");
  await settle(page);
  await hideNationalCoverageNotes(page);
};

/** @param {import("playwright").Page} page */
const openNextMonth = async (page) => {
  await page.getByRole("button", { name: "Próximo período" }).click();
  await settle(page);
};

const screens = [
  { name: "manager-dashboard", path: "/performance", layouts: ["desktop", "mobile"], prepare: settle },
  { name: "radar", path: "/tenders", layouts: ["desktop", "mobile"], prepare: settle },
  { name: "search", path: "/search", layouts: ["desktop"], prepare: searchWithSaoPauloOnly },
  { name: "pricing", path: "/bids/new", layouts: ["desktop"], prepare: openPricingStep },
  { name: "calendar", path: "/calendar", layouts: ["desktop"], prepare: openNextMonth },
  { name: "documents", path: "/documents", layouts: ["mobile"], prepare: settle },
];

/** @param {import("playwright").Page} page @param {string} name */
const assertCleanScreen = async (page, name) => {
  if ((await page.getByText(FABRICATED_PANEL_TERMS).filter({ visible: true }).count()) > 0) {
    throw new Error(`${name}: a fabricated panel is visible`);
  }
  for (const switcher of devSwitchers(page)) {
    if ((await switcher.filter({ visible: true }).count()) > 0) throw new Error(`${name}: a dev switcher is visible`);
  }
  if ((await page.getByRole("alert").filter({ hasText: /erro|error|falha/i }).count()) > 0) {
    throw new Error(`${name}: an error message is visible`);
  }
};

/** @param {string} fileName @param {Buffer} png @param {number[]} widths */
const saveVariants = (fileName, png, widths) =>
  Promise.all(
    widths.flatMap((width) => {
      const resized = sharp(png).resize({ width });
      return [
        resized.clone().avif({ quality: 50 }).toFile(`${outputDirectory}${fileName}-${width}.avif`),
        resized.clone().webp({ quality: 74 }).toFile(`${outputDirectory}${fileName}-${width}.webp`),
      ];
    }),
  );

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [layoutName, layout] of Object.entries(LAYOUTS)) {
    const context = await browser.newContext({
      viewport: layout.viewport,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      isMobile: layoutName === "mobile",
      hasTouch: layoutName === "mobile",
      locale: "pt-BR",
      reducedMotion: "reduce",
    });
    await context.addCookies([{ name: "qore_onboarding_done", value: "1", url: baseUrl }]);

    for (const screen of screens.filter((candidate) => candidate.layouts.includes(layoutName))) {
      const page = await context.newPage();
      page.setDefaultTimeout(120_000);
      await page.goto(new URL(screen.path, baseUrl).toString(), { waitUntil: "networkidle" });
      await page.addStyleTag({ content: DEV_OVERLAY_STYLE });
      await screen.prepare(page);
      await hideDevSwitchers(page);
      await assertCleanScreen(page, screen.name);
      const fileName = `${screen.name}${layout.suffix}`;
      const png = await page.screenshot({ type: "png", clip: layout.clip });
      if (rawDirectory) await writeFile(`${rawDirectory}/${fileName}.png`, png);
      await saveVariants(fileName, png, layout.widths);
      await page.close();
      console.log(`captured ${fileName}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
