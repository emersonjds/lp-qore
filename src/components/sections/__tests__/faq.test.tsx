import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { faqItems } from "@/config/faq";
import { Faq } from "../faq";

describe("Faq", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Perguntas frequentes");
    expect(
      screen.getByText("O que a Qore faz, o que ela não faz e como começar."),
    ).toBeInTheDocument();
  });

  it("renders the six questions as native disclosure widgets", () => {
    const { container } = render(<Faq />);
    const disclosures = container.querySelectorAll("details");
    expect(disclosures).toHaveLength(5);
    expect([...container.querySelectorAll("summary")].map((summary) => summary.textContent)).toEqual(
      faqItems.map((item) => item.question),
    );
  });

  it("opens with the Stitch eyebrow and answers the price question through the demo", () => {
    render(<Faq />);
    expect(screen.getByText("Tire suas dúvidas")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Perguntas frequentes");
    expect(screen.getByText(/O valor varia conforme o porte da empresa/)).toBeInTheDocument();
  });

  it("explains how the proposal gets about 80% ready", () => {
    render(<Faq />);
    expect(screen.getByText("Como a proposta fica pronta?")).toBeInTheDocument();
    expect(screen.getByText(/chega cerca de 80% pronta/)).toBeInTheDocument();
  });

  it("keeps every answer in the HTML for search engines and no-JS readers", () => {
    render(<Faq />);
    faqItems.forEach((item) => expect(screen.getByText(item.answer)).toBeInTheDocument());
  });

  it("opens an answer when the question is activated", async () => {
    const { container } = render(<Faq />);
    const firstSummary = container.querySelector("summary");
    firstSummary?.click();
    expect(container.querySelector("details")).toHaveAttribute("open");
  });
});
