import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ctaBanners } from "@/config/home-content";
import { Audience } from "../audience";
import { Contact } from "../contact";
import { CtaBanner } from "../cta-banner";
import { Header } from "../header";
import { Hero } from "../hero";
import { MobileCtaBar } from "../mobile-cta-bar";

const DARK_TEXT_CLASS = /(^|\s)text-(foreground|muted-foreground|black|primary|secondary-foreground|(slate|gray|zinc|neutral|stone|emerald)-\d{3})(\s|$)/;

describe("Primary CTAs", () => {
  it("render white text on emerald everywhere on the page", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <>
        <Header />
        <Hero />
        <CtaBanner {...ctaBanners.afterFeatures} />
        <CtaBanner {...ctaBanners.afterIntegrations} />
        <Audience />
        <Contact />
        <MobileCtaBar />
      </>,
    );
    const primaryButtons = [...container.querySelectorAll('[data-slot="button"][data-variant="default"]')];
    expect(primaryButtons.map((button) => button.getAttribute("data-cta"))).toEqual(
      expect.arrayContaining(["header", "hero-primary", "after-features", "after-integrations", "audience", "contact-submit", "mobile-sticky"]),
    );
    primaryButtons.forEach((button) => {
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
      expect(button.className).not.toMatch(DARK_TEXT_CLASS);
    });
  });
});
