import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { footerNavigation, primaryNavigation } from "@/config/navigation";
import HomePage from "../page";

describe("HomePage", () => {
  it("orders the sections as decided by the owner", () => {
    const { container } = render(<HomePage />);
    const sectionIds = [...container.querySelectorAll("main > section[id]")].map((section) => section.id);
    expect(sectionIds).toEqual([
      "inicio",
      "problema",
      "como-funciona",
      "funcionalidades",
      "proposta",
      "documentos",
      "plataforma",
      "funcoes",
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
