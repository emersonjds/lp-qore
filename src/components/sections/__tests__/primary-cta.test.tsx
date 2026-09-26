import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("render white text on emerald everywhere on the page", async () => {
    const user = userEvent.setup();
    render(
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
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await screen.findByRole("dialog");
    const primaryButtons = [...document.body.querySelectorAll('[data-slot="button"][data-variant="default"]')];
    expect(primaryButtons.map((button) => button.getAttribute("data-cta"))).toEqual(
      expect.arrayContaining([
        "header",
        "hero-primary",
        "after-features",
        "after-integrations",
        "audience",
        "contact-submit",
        "mobile-sticky",
        "mobile-menu",
      ]),
    );
    primaryButtons.forEach((button) => {
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
      expect(button.className).not.toMatch(DARK_TEXT_CLASS);
    });
  });
});
