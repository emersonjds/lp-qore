import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Personas } from "../personas";

const managerView = () => screen.getByRole("article", { name: "Visão da operação inteira em uma tela", hidden: true });
const analystView = () => screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas", hidden: true });

const kpiLabels = (view: HTMLElement) =>
  [...view.querySelectorAll("[data-role-kpi] [data-kpi-label]")].map((label) => label.textContent);

describe("Personas", () => {
  it("builds the section for each role in the team, starting with the manager", () => {
    render(<Personas />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Construído para cada função na equipe de licitações",
    );
    expect(screen.getByText("Interface sob medida")).toBeInTheDocument();
    expect(screen.getAllByRole("button").map((button) => button.textContent)).toEqual([
      "Visão do Gestor",
      "Visão do Analista",
    ]);
    expect(screen.getByRole("button", { name: "Visão do Gestor" })).toHaveAttribute("aria-pressed", "true");
  });

  it("simulates the manager's KPI cards and counts the example numbers up", () => {
    render(<Personas />);
    const view = managerView();
    expect(kpiLabels(view)).toEqual([
      "Valor ganho acumulado",
      "Taxa de vitória em sessões",
      "Funil por órgão comprador",
      "Produtividade do time",
    ]);
    const counted = [...view.querySelectorAll("[data-role-kpi] [data-count-up]")].map((counter) => counter.textContent);
    expect(counted).toEqual(["R$ 4,2M", "34,8%"]);
    expect(within(view).getByText("Mais editais triados")).toBeInTheDocument();
    expect(within(view).getByText("Exemplo ilustrativo")).toBeInTheDocument();
  });

  it("simulates the analyst's day, flagging the urgent deadline", () => {
    render(<Personas />);
    const view = analystView();
    expect(kpiLabels(view)).toEqual([
      "Fila de prioridades do dia",
      "Checklist de certidões",
      "Alerta de preço",
      "Proposta em montagem",
    ]);
    expect(within(view).getByText("Urgente: DAEE até 18h")).toBeInTheDocument();
    expect(within(view).getByText("Exemplo ilustrativo")).toBeInTheDocument();
  });

  it("keeps unbacked comparisons out of the example cards", () => {
    const { container } = render(<Personas />);
    expect(container.textContent).not.toMatch(/Média estadual|\+9|4x|Zero horas|automaticamente/);
  });

  it("still lists what each role gets, with the analyst's CNPJ match first", () => {
    render(<Personas />);
    const analystFeatures = within(analystView())
      .getAllByRole("heading", { level: 4, hidden: true })
      .map((heading) => heading.textContent);
    expect(analystFeatures).toHaveLength(7);
    expect(analystFeatures[0]).toBe("Match por CNPJ");
    const managerFeatures = within(managerView()).getAllByRole("heading", { level: 4 }).map((heading) => heading.textContent);
    expect(managerFeatures).toHaveLength(6);
    expect(managerFeatures).toContain("Aprovação de propostas");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
