import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage, { metadata } from "../privacidade/page";

describe("PrivacyPage", () => {
  it("refers to the demo form, never to a generic contact form", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.textContent).toContain("formulário de demonstração");
    expect(container.textContent).not.toMatch(/Fale Conosco/i);
    expect(metadata.description).toBe("Como a Qore usa os dados enviados pelo formulário de demonstração.");
  });

  it("lists every field the demo form collects, qualification included", () => {
    render(<PrivacyPage />);
    const collected = screen.getAllByRole("list")[0];
    expect(collected).toHaveTextContent("Porte da empresa");
    expect(collected).toHaveTextContent("Licitações por mês");
  });

  it("names BrasilAPI and PNCP as the services the free radar queries with the typed CNPJ", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.textContent).toContain("BrasilAPI");
    expect(container.textContent).toContain("PNCP");
  });
});
