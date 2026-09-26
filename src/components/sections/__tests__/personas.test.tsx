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

  it("frames a real phone screen for each role, sealed as illustrative", () => {
    render(<Personas />);
    const analyst = screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas" });
    expect(within(analyst).getByRole("img", { name: /Radar de licitações/ })).toHaveAttribute(
      "src",
      "/screenshots/radar-mobile-780.webp",
    );
    const manager = screen.getByRole("article", { name: "Visão da operação inteira em uma tela" });
    expect(within(manager).getByRole("img", { name: /Painel do gestor/ })).toHaveAttribute(
      "src",
      "/screenshots/manager-dashboard-mobile-780.webp",
    );
    expect(screen.getAllByText("Tela ilustrativa")).toHaveLength(2);
  });

  it("keeps no drawn mini panels", () => {
    const { container } = render(<Personas />);
    expect(container.querySelector("[data-match-score]")).toBeNull();
    expect(screen.queryByText("Exemplo ilustrativo")).not.toBeInTheDocument();
  });
});
