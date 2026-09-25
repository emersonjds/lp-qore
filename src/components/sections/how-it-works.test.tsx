import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "./how-it-works";

describe("HowItWorks", () => {
  it("lists the three steps in order", () => {
    render(<HowItWorks />);
    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps.map((step) => within(step).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Passo 01: Informe o CNPJ",
      "Passo 02: Receba o radar",
      "Passo 03: Entenda e responda",
    ]);
  });

  it("draws the connecting line fully without JavaScript", () => {
    const { container } = render(<HowItWorks />);
    const lines = container.querySelectorAll("[data-step-line]");
    expect(lines).toHaveLength(2);
    lines.forEach((line) => expect(line).toHaveAttribute("aria-hidden", "true"));
  });
});
