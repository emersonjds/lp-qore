import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { faqItems } from "@/config/faq";
import { Faq } from "../faq";

describe("Faq", () => {
  it("renders the five questions as native disclosure widgets", () => {
    const { container } = render(<Faq />);
    const disclosures = container.querySelectorAll("details");
    expect(disclosures).toHaveLength(5);
    expect([...container.querySelectorAll("summary")].map((summary) => summary.textContent)).toEqual(
      faqItems.map((item) => item.question),
    );
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
