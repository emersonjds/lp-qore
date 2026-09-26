import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimeSaved } from "../time-saved";

describe("TimeSaved", () => {
  it("anchors at #resultados with the owner's title", () => {
    const { container } = render(<TimeSaved />);
    expect(container.querySelector("section#resultados")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Tempo que volta para a equipe");
  });

  it("compares four tasks before and after, row by row", () => {
    const { container } = render(<TimeSaved />);
    const rows = [...container.querySelectorAll("[data-before-after]")];
    expect(rows.map((row) => row.querySelector("h3")?.textContent)).toEqual([
      "Leitura do edital",
      "Busca de oportunidades",
      "Montagem da proposta",
      "Certidões",
    ]);
    expect(rows[2]).toHaveTextContent("Do zero");
    expect(rows[2]).toHaveTextContent("Cerca de 80% pronta");
  });

  it("invents no number other than the approved 80%", () => {
    const { container } = render(<TimeSaved />);
    const numbers = container.textContent?.match(/\d+/g) ?? [];
    expect(numbers).toEqual(["80"]);
  });

  it("slides each row in turn and highlights the Qore side", () => {
    const { container } = render(<TimeSaved />);
    const rows = [...container.querySelectorAll<HTMLElement>("[data-before-after]")];
    rows.forEach((row) => expect(row).toHaveAttribute("data-reveal"));
    expect(rows.map((row) => row.style.getPropertyValue("--order"))).toEqual(["0", "1", "2", "3"]);
  });
});
