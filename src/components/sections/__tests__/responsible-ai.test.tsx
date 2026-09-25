import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResponsibleAi } from "../responsible-ai";

describe("ResponsibleAi", () => {
  it("lists the four commitments", () => {
    render(<ResponsibleAi />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Cita a fonte",
      "Diz “não encontrado no edital”",
      "Sugere, e você decide",
      "Você envia a proposta, não a IA",
    ]);
  });

  it("describes the reading illustration for assistive technology", () => {
    render(<ResponsibleAi />);
    expect(
      screen.getByRole("img", { name: "Ilustração: o edital, um trecho destacado e o resumo com a página citada" }),
    ).toBeInTheDocument();
  });

  it("speaks about the pilot in the future tense", () => {
    render(<ResponsibleAi />);
    expect(screen.getByText(/No piloto, a IA vai/)).toBeInTheDocument();
  });
});
