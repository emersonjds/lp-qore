import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "../how-it-works";

describe("HowItWorks", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Do CNPJ à proposta em três etapas");
    expect(
      screen.getByText("Informe o CNPJ, receba o radar e responda com o edital resumido e a proposta encaminhada. A decisão continua com a sua equipe."),
    ).toBeInTheDocument();
  });

  it("lists the three steps in order", () => {
    render(<HowItWorks />);
    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps.map((step) => within(step).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Passo 01: Informe o CNPJ",
      "Passo 02: Receba o radar",
      "Passo 03: Entenda e responda",
    ]);
  });

  it("connects the steps with a desktop-only line drawn fully without JavaScript", () => {
    const { container } = render(<HowItWorks />);
    const lines = container.querySelectorAll("[data-step-line]");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveAttribute("aria-hidden", "true");
    expect(lines[0]).toHaveClass("hidden", "md:block");
  });

  it("highlights the first step badge like the Stitch flow", () => {
    const { container } = render(<HowItWorks />);
    const badges = [...container.querySelectorAll("[data-step-badge]")];
    expect(badges.map((badge) => badge.textContent)).toEqual(["01", "02", "03"]);
    expect(badges[0]).toHaveClass("bg-primary", "text-primary-foreground");
    badges.slice(1).forEach((badge) => expect(badge).toHaveClass("bg-surface-container-high", "text-primary"));
    badges.forEach((badge) => expect(badge.className).not.toMatch(/transition-colors/));
  });
});
