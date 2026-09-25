import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Problem } from "../problem";

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

  it("shows each market number with its source and date", () => {
    render(<Problem />);
    const numbers = screen.getAllByTestId("market-number");
    expect(numbers.map((number) => number.textContent)).toEqual([
      "3.817pregões eletrônicos com proposta aberta em São PauloFonte: PNCP — API de consulta, 25/09/2026",
      "~174 mileditais publicados por mês no BrasilFonte: PNCP, 26/07/2026",
    ]);
  });
});
