import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { personasContent } from "@/config/home-content";
import { PersonaToggle } from "../persona-toggle";

describe("PersonaToggle", () => {
  it("starts on the manager view", () => {
    render(<PersonaToggle personas={personasContent.personas} />);
    expect(screen.getByRole("button", { name: "Visão do gestor" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Para quem decide" })).not.toHaveClass("invisible");
  });

  it("switches to the analyst view", async () => {
    const user = userEvent.setup();
    render(<PersonaToggle personas={personasContent.personas} />);
    await user.click(screen.getByRole("button", { name: "Visão do analista" }));
    expect(screen.getByRole("button", { name: "Visão do analista" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("article", { name: "Para quem prepara a proposta" })).not.toHaveClass("invisible");
    expect(screen.getByRole("article", { name: "Para quem decide", hidden: true })).toHaveClass("invisible");
  });

  it("seals each mini-panel as an illustrative example", () => {
    render(<PersonaToggle personas={personasContent.personas} />);
    expect(screen.getAllByText("Exemplo ilustrativo")).toHaveLength(2);
  });

  it("never shows a win rate", () => {
    const { container } = render(<PersonaToggle personas={personasContent.personas} />);
    expect(container.textContent?.toLowerCase()).not.toMatch(/taxa de vitória|win rate/);
  });

  it("renders both views before JavaScript runs", () => {
    const html = renderToString(<PersonaToggle personas={personasContent.personas} />);
    expect(html).not.toContain("invisible");
    expect(html).toContain("Para quem decide");
    expect(html).toContain("Para quem prepara a proposta");
  });
});
