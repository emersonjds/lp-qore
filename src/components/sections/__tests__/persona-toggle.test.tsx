import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PersonaToggle, type PersonaView } from "../persona-toggle";

const personas: readonly [PersonaView, PersonaView] = [
  {
    id: "analyst",
    toggleLabel: "Analista de licitações",
    title: "Seu dia sem planilha nem PDF de 80 páginas",
    features: <p>Lista do analista</p>,
    visual: <p>Visual do analista</p>,
  },
  {
    id: "manager",
    toggleLabel: "Gestor de licitações",
    title: "Visão da operação inteira em uma tela",
    features: <p>Lista do gestor</p>,
    visual: <p>Visual do gestor</p>,
  },
];

const renderToggle = () => render(<PersonaToggle personas={personas} />);

describe("PersonaToggle", () => {
  it("starts on the analyst view", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: "Analista de licitações" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas" })).not.toHaveClass(
      "invisible",
    );
  });

  it("switches to the manager view", async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole("button", { name: "Gestor de licitações" }));
    expect(screen.getByRole("button", { name: "Gestor de licitações" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Visão da operação inteira em uma tela" })).not.toHaveClass("invisible");
    expect(
      screen.getByRole("article", { name: "Seu dia sem planilha nem PDF de 80 páginas", hidden: true }),
    ).toHaveClass("invisible");
  });

  it("renders each role's list and visual", () => {
    renderToggle();
    expect(screen.getByText("Lista do analista")).toBeInTheDocument();
    expect(screen.getByText("Visual do analista")).toBeInTheDocument();
    expect(screen.getByText("Visual do gestor")).toBeInTheDocument();
  });

  it("renders both views before JavaScript runs", () => {
    const html = renderToString(<PersonaToggle personas={personas} />);
    expect(html).not.toContain("invisible");
    expect(html).toContain("Seu dia sem planilha nem PDF de 80 páginas");
    expect(html).toContain("Visão da operação inteira em uma tela");
  });
});
