import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { footerNavigation, primaryNavigation } from "@/config/navigation";
import HomePage from "../page";
import PrivacyPage from "../privacidade/page";

const MASCULINE_BRAND = /\b(o|ao|do|no|pelo) Qore\b/i;

describe("HomePage", () => {
  it("tells the sales story in the Stitch order, with the platform right after how it works", () => {
    const { container } = render(<HomePage />);
    const sectionIds = [...container.querySelectorAll("main > section[id]")].map((section) => section.id);
    expect(sectionIds).toEqual([
      "inicio",
      "problema",
      "como-funciona",
      "plataforma",
      "funcionalidades",
      "proposta",
      "documentos",
      "funcoes",
      "para-quem-e",
      "resultados",
      "integracoes",
      "ia-responsavel",
      "cobertura",
      "quem-somos",
      "faq",
      "contato",
    ]);
  });

  it("alternates the surface and surface-low backgrounds like the Stitch reference", () => {
    const { container } = render(<HomePage />);
    const lowSections = [...container.querySelectorAll("main > section[id]")]
      .filter((section) => section.classList.contains("bg-surface-low"))
      .map((section) => section.id);
    expect(lowSections).toEqual([
      "problema",
      "plataforma",
      "documentos",
      "para-quem-e",
      "integracoes",
      "ia-responsavel",
      "quem-somos",
      "contato",
    ]);
  });

  it("points every menu and footer anchor to a real section", () => {
    const { container } = render(<HomePage />);
    [...primaryNavigation, ...footerNavigation]
      .map((link) => link.href)
      .filter((href) => href.startsWith("/#"))
      .forEach((href) => expect(container.querySelector(href.slice(1))).not.toBeNull());
  });

  it("shows the simulated screens without any example seal, in text or accessible names", () => {
    const { container } = render(<HomePage />);
    expect(container.innerHTML).not.toMatch(/exemplo/i);
  });
});

describe("brand gender", () => {
  it.each([
    ["home", HomePage],
    ["privacy", PrivacyPage],
  ])("always calls the brand \"a Qore\" on the %s page", (_page, Page) => {
    const { container } = render(<Page />);
    expect(container.innerHTML).not.toMatch(MASCULINE_BRAND);
  });
});
