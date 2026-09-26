import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "../platform-tour-tabs";

describe("PlatformTourTabs", () => {
  it("offers the five Stitch modules as tabs", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      "Painel do gestor",
      "Radar de oportunidades",
      "Resumo do edital com IA",
      "Precificação inteligente",
      "Calendário de prazos",
    ]);
  });

  it("shows the first screen and hides the others after hydration", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Painel do gestor" })).not.toHaveClass("invisible");
    expect(screen.getByRole("tabpanel", { name: "Radar de oportunidades", hidden: true })).toHaveClass("invisible");
  });

  it("switches screens on click", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    await user.click(screen.getByRole("tab", { name: "Precificação inteligente" }));
    expect(screen.getByRole("tab", { name: "Precificação inteligente" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Precificação inteligente" })).not.toHaveClass("invisible");
  });

  it("moves between tabs with the arrow, Home and End keys", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    screen.getByRole("tab", { name: "Painel do gestor" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Radar de oportunidades" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Calendário de prazos" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}{Home}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
  });

  it.each([
    ["Painel do gestor", "Visão consolidada de licitações"],
    ["Radar de oportunidades", "Radar ativo: filtro pelo CNAE da empresa"],
    ["Resumo do edital com IA", "Extração das cláusulas de habilitação"],
    ["Precificação inteligente", "Composição de custos e risco de inexequibilidade"],
    ["Calendário de prazos", "Linha do tempo do pregão"],
  ])("draws the %s screen as an illustrative simulated window", (label, heading) => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    const panel = screen.getByRole("tabpanel", { name: label, hidden: true });
    const window = within(panel).getByRole("figure", { hidden: true });
    expect(within(window).getByRole("heading", { name: heading, hidden: true })).toBeInTheDocument();
  });

  it("counts the manager KPIs up and grows the modality bars", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    const panel = screen.getByRole("tabpanel", { name: "Painel do gestor" });
    expect([...panel.querySelectorAll("[data-count-up]")].map((counter) => counter.textContent)).toEqual(["42", "8", "14"]);
    expect(panel.querySelectorAll("[data-bar]")).toHaveLength(3);
    expect(panel.querySelectorAll("[data-day-lit]").length).toBeGreaterThan(0);
    expect(panel).toHaveAttribute("data-screen-active");
    expect(screen.getByRole("tabpanel", { name: "Radar de oportunidades", hidden: true })).not.toHaveAttribute(
      "data-screen-active",
    );
  });

  it("renders every screen visibly before JavaScript runs, without screenshots", () => {
    const html = renderToString(<PlatformTourTabs tabs={platformTabs} />);
    expect(html).not.toContain("invisible");
    expect(html).not.toContain("<img");
    expect(html.match(/<figure/g)).toHaveLength(5);
  });
});
