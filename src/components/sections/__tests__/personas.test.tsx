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

  it("simulates a screen for each role instead of a screenshot", () => {
    render(<Personas />);
    const analyst = screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas" });
    expect(within(analyst).getByRole("figure", { name: "Exemplo ilustrativo: Radar de oportunidades" })).toBeInTheDocument();
    const manager = screen.getByRole("article", { name: "Visão da operação inteira em uma tela" });
    expect(within(manager).getByRole("figure", { name: "Exemplo ilustrativo: Painel do gestor" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows the analyst an example match chip that counts up to 87%", () => {
    render(<Personas />);
    const chip = screen.getByTestId("match-chip");
    expect(chip).toHaveTextContent("Aderência");
    expect(chip).toHaveTextContent("Exemplo");
    expect(chip.querySelector("[data-count-up]")).toHaveTextContent("87%");
  });
});
