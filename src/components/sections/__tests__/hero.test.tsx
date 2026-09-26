import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../hero";

const splitView = () => screen.getByRole("figure", { name: /Edital original ao lado do resumo/ });

describe("Hero", () => {
  it("states the slogan as the only level-one heading, never animated", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("A IA lê o edital. Você decide.");
    expect(heading.className).not.toMatch(/animate/);
  });

  it("invites to a demo and to see how it works", () => {
    render(<Hero />);
    const primary = screen.getByRole("link", { name: "Quero uma demonstração" });
    expect(primary).toHaveAttribute("href", "/#contato");
    expect(primary).toHaveAttribute("data-cta", "hero-primary");
    const secondary = screen.getByRole("link", { name: "Ver como funciona" });
    expect(secondary).toHaveAttribute("href", "/#como-funciona");
    expect(secondary).toHaveAttribute("data-cta", "hero-secondary");
  });

  it("says the product is available in São Paulo and backs it with honest trust points", () => {
    render(<Hero />);
    expect(screen.getByText("Disponível para São Paulo")).toBeInTheDocument();
    expect(screen.queryByText("Citação direta de artigos e páginas")).not.toBeInTheDocument();
    expect(screen.getByText("Alinhado à Lei 14.133/2021")).toBeInTheDocument();
  });

  it("gives the sticky mobile bar a hero to watch", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section#inicio")).not.toBeNull();
  });

  it("simulates the edital next to the Qore summary instead of a real screenshot", () => {
    render(<Hero />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    const figure = splitView();
    expect(figure).toHaveTextContent("Edital PE nº 104/2026 — Secretaria da Saúde - SP");
    expect(figure).toHaveTextContent("Documento original (PDF)");
    expect(figure).toHaveTextContent("Resumo Inteligente Qore");
    expect(figure).toHaveTextContent("Alerta de risco");
  });

  it("cites the page of every summary item", () => {
    const { container } = render(<Hero />);
    const chips = [...container.querySelectorAll("[data-page-chip]")].map((chip) => chip.textContent);
    expect(chips).toEqual(["pág. 12, item 4.2", "pág. 18, item 7.1", "pág. 24, item 9.3", "pág. 8"]);
  });

  it("counts the example compatibility up inside the simulated screen", () => {
    render(<Hero />);
    const badge = within(splitView()).getByText("Compatibilidade", { exact: false });
    expect(badge.querySelector("[data-count-up]")).toHaveTextContent("96%");
  });

  it("fades the simulated screen in so it never becomes the largest paint", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("[data-split-view]")).toHaveClass("animate-hero-enter");
  });

  it("sets the simulated screen over a decorative emerald glow", () => {
    const { container } = render(<Hero />);
    const glow = container.querySelector("[data-hero-glow]");
    expect(glow).toHaveAttribute("aria-hidden", "true");
    expect(glow?.parentElement).toContainElement(splitView());
  });
});
