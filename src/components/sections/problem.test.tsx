import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Problem } from "./problem";

describe("Problem", () => {
  it("lists three pains, each revealed on scroll", () => {
    render(<Problem />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    items.forEach((item) => expect(item).toHaveAttribute("data-reveal"));
  });

  it("names each pain as a level-three heading", () => {
    render(<Problem />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Editais espalhados em vários portais",
      "80 páginas lidas na véspera do prazo",
      "Proposta desclassificada por preço ou documento faltando",
    ]);
  });
});
