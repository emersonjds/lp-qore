import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./hero";

describe("Hero", () => {
  it("states the slogan as the only level-one heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A IA lê o edital. Você decide.");
  });

  it("offers contact and how-it-works actions without signup", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("href", "/#contato");
    expect(screen.getByRole("link", { name: "Ver como funciona" })).toHaveAttribute("href", "/#como-funciona");
    expect(screen.getByText("Sem cadastro e sem cartão")).toBeInTheDocument();
  });

  it("marks the summary card as an illustrative screen with page citations", () => {
    render(<Hero />);
    const card = screen.getByRole("figure", { name: "Resumo Inteligente Qore" });
    expect(card).toHaveTextContent("Tela ilustrativa");
    expect(card).toHaveTextContent("pág. 12");
  });
});
