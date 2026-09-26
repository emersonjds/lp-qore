import { render, screen, within } from "@testing-library/react";
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

  it("shows a legible edital excerpt next to the AI summary, each point citing its page", () => {
    render(<ResponsibleAi />);
    const excerpt = screen.getByRole("figure", { name: "Exemplo ilustrativo: trecho do edital e resumo da IA" });
    expect(within(excerpt).getByText("Objeto:")).toBeInTheDocument();
    expect(within(excerpt).getByText("Prazo da proposta:")).toBeInTheDocument();
    expect(within(excerpt).getByText("Habilitação:")).toBeInTheDocument();
    expect(within(excerpt).getByText("Resumo da IA")).toBeInTheDocument();
    expect(within(excerpt).getAllByText(/^pág\. \d+$/).map((chip) => chip.textContent)).toEqual([
      "pág. 12",
      "pág. 31",
      "pág. 44",
      "pág. 12",
      "pág. 31",
      "pág. 44",
    ]);
  });

  it("keeps the commitments in the text column beside the illustration", () => {
    render(<ResponsibleAi />);
    const title = screen.getByRole("heading", { level: 2 });
    const commitments = screen.getByRole("list", { name: "Compromissos da IA" });
    expect(title.parentElement).toContainElement(commitments);
  });

  it("speaks as an operating product, in the present tense", () => {
    render(<ResponsibleAi />);
    expect(screen.getByText(/A IA trabalha como apoio da sua equipe/)).toBeInTheDocument();
  });
});
