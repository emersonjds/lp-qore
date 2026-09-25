import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { proposalContent } from "@/config/features";
import { ProposalHighlight } from "../proposal-highlight";

describe("ProposalHighlight", () => {
  it("promises a proposal about 80% ready with the company brand", () => {
    render(<ProposalHighlight />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sua proposta chega cerca de 80% pronta");
    expect(screen.getByText(/você só completa os preços/)).toBeInTheDocument();
  });

  it("draws the document at 80% with prices as the only pending step", () => {
    const { container } = render(<ProposalHighlight />);
    const progress = screen.getByRole("progressbar", { name: "Proposta preenchida" });
    expect(progress).toHaveAttribute("aria-valuenow", "80");
    expect(progress.querySelector("[data-proposal-progress]")).not.toBeNull();
    const pendingSteps = container.querySelectorAll("[data-pending-step]");
    expect(pendingSteps).toHaveLength(1);
    expect(pendingSteps[0]).toHaveTextContent("Preços");
  });

  it("reserves a slot for the company brand and seals the drawing as an example", () => {
    render(<ProposalHighlight />);
    expect(screen.getByText("Sua marca")).toBeInTheDocument();
    expect(screen.getByText("Exemplo ilustrativo")).toBeInTheDocument();
  });

  it("takes the document labels from the content config", () => {
    render(<ProposalHighlight />);
    expect(screen.getByText(proposalContent.documentTitle)).toBeInTheDocument();
    expect(screen.getAllByText(proposalContent.completedLabel)).toHaveLength(proposalContent.completedSteps.length);
    expect(screen.getByText(proposalContent.pendingLabel)).toBeInTheDocument();
    expect(screen.getByText(proposalContent.brandSlotLabel)).toBeInTheDocument();
  });

  it("accepts a real screenshot in place of the drawing", () => {
    render(<ProposalHighlight visual={<img src="/screenshots/pricing.webp" alt="Etapa de precificação" />} />);
    expect(screen.getByRole("img", { name: "Etapa de precificação" })).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
