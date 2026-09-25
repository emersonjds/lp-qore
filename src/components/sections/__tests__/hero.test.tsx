import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../hero";

describe("Hero", () => {
  it("states the slogan as the only level-one heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A IA lê o edital. Você decide.");
  });

  it("offers contact and how-it-works actions without signup", () => {
    render(<Hero />);
    const primary = screen.getByRole("link", { name: "Quero ver a Qore com as minhas licitações" });
    expect(primary).toHaveAttribute("href", "/#contato");
    expect(primary).toHaveAttribute("data-cta", "hero-primary");
    const secondary = screen.getByRole("link", { name: "Ver como funciona" });
    expect(secondary).toHaveAttribute("href", "/#como-funciona");
    expect(secondary).toHaveAttribute("data-cta", "hero-secondary");
    expect(screen.getByText("Sem cadastro e sem cartão")).toBeInTheDocument();
  });

  it("says the product is available in São Paulo", () => {
    render(<Hero />);
    expect(screen.getByText("Disponível para São Paulo")).toBeInTheDocument();
  });

  it("gives the sticky mobile bar a hero to watch", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section#inicio")).not.toBeNull();
  });

  it("marks the summary card as an illustrative screen with page citations", () => {
    render(<Hero />);
    const card = screen.getByRole("figure", { name: "Resumo Inteligente Qore" });
    expect(card).toHaveTextContent("Tela ilustrativa");
    expect(card).toHaveTextContent("pág. 12");
  });
});
