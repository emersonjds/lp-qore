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

  it("shows the real manager dashboard screenshot sealed as an illustrative screen", () => {
    render(<Hero />);
    const frame = screen.getByRole("figure", { name: /Painel do gestor/ });
    expect(frame).toHaveTextContent("Tela ilustrativa");
    const image = screen.getByRole("img", { name: /Painel do gestor/ });
    expect(image).toHaveAttribute("src", "/screenshots/manager-dashboard-1280.webp");
    expect(image).toHaveAttribute("width", "1280");
    expect(image).toHaveAttribute("height", "800");
  });

  it("loads the screenshot eagerly without competing with the heading for priority", () => {
    render(<Hero />);
    const image = screen.getByRole("img", { name: /Painel do gestor/ });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).not.toHaveAttribute("fetchpriority");
  });

  it("keeps no drawn mock of the product", () => {
    render(<Hero />);
    expect(screen.queryByText("Resumo Inteligente Qore")).not.toBeInTheDocument();
  });
});
