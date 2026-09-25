import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Personas } from "../personas";

describe("Personas", () => {
  it("lists what each role gets, with the analyst's CNPJ match first", () => {
    render(<Personas />);
    const analyst = screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas" });
    const analystFeatures = within(analyst).getAllByRole("heading", { level: 4 }).map((heading) => heading.textContent);
    expect(analystFeatures).toHaveLength(7);
    expect(analystFeatures[0]).toBe("Match por CNPJ");
    expect(analystFeatures).toContain("Checklist de habilitação");
    const manager = screen.getByRole("article", { name: "Visão da operação inteira em uma tela" });
    const managerFeatures = within(manager).getAllByRole("heading", { level: 4 }).map((heading) => heading.textContent);
    expect(managerFeatures).toHaveLength(6);
    expect(managerFeatures).toContain("Aprovação de propostas");
  });

  it("shows an illustrative CNPJ match score for the analyst", () => {
    const { container } = render(<Personas />);
    const score = container.querySelector("[data-match-score]");
    expect(score).not.toBeNull();
    expect(score).toHaveAttribute("data-match-score", "87");
  });

  it("seals both role panels as illustrative examples", () => {
    render(<Personas />);
    expect(screen.getAllByText("Exemplo ilustrativo")).toHaveLength(2);
  });

  it("shows no win rate number on the manager panel", () => {
    render(<Personas />);
    const manager = screen.getByRole("article", { name: "Visão da operação inteira em uma tela" });
    const panel = within(manager).getByRole("figure");
    expect(panel.textContent).not.toMatch(/%/);
  });
});
