import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProposalHighlight } from "../proposal-highlight";

describe("ProposalHighlight", () => {
  it("promises a proposal about 80% ready with the company brand", () => {
    render(<ProposalHighlight />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sua proposta chega cerca de 80% pronta");
    expect(screen.getByText(/você só completa os preços/)).toBeInTheDocument();
  });

  it("simulates the pricing step as an illustrative window instead of a screenshot", () => {
    render(<ProposalHighlight />);
    const window = screen.getByRole("figure", { name: "Exemplo ilustrativo: Precificação inteligente" });
    expect(window).toHaveTextContent("Exemplo ilustrativo");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("overlays a progress chip that fills to 80% and then shows only the price is missing", () => {
    const { container } = render(<ProposalHighlight />);
    const overlay = container.querySelector("[data-proposal-progress]");
    expect(overlay).toHaveAttribute("data-reveal");
    expect(overlay).toHaveTextContent("Proposta 80% pronta");
    expect(overlay?.querySelector("[data-progress-fill]")).toHaveClass("w-4/5");
    expect(container.querySelector("[data-proposal-progress] ~ [data-missing-chip]")).toHaveTextContent("Falta só o preço");
  });
});
