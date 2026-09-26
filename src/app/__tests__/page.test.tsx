import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { footerNavigation, primaryNavigation } from "@/config/navigation";
import HomePage from "../page";

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

  it("points every menu and footer anchor to a real section", () => {
    const { container } = render(<HomePage />);
    [...primaryNavigation, ...footerNavigation]
      .map((link) => link.href)
      .filter((href) => href.startsWith("/#"))
      .forEach((href) => expect(container.querySelector(href.slice(1))).not.toBeNull());
  });
});
