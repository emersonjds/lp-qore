import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../hero";

const splitView = () => screen.getByRole("figure", { name: /Edital original ao lado do resumo/ });

describe("Hero", () => {
  it("states the positioning as the only level-one heading, never animated", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Licitações de São Paulo, do radar à proposta pronta.");
    expect(heading.className).not.toMatch(/animate/);
  });

  it("explains what the Qore does for the supplier", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        "A Qore encontra os editais que combinam com o seu CNPJ, resume cada um citando a página, entrega a proposta cerca de 80% pronta e avisa antes de uma certidão vencer.",
      ),
    ).toBeInTheDocument();
  });

  it("invites to a demo and to see the platform", () => {
    render(<Hero />);
    const primary = screen.getByRole("link", { name: "Agendar demonstração" });
    expect(primary).toHaveAttribute("href", "/#contato");
    expect(primary).toHaveAttribute("data-cta", "hero-primary");
    const secondary = screen.getByRole("link", { name: "Ver a plataforma" });
    expect(secondary).toHaveAttribute("href", "/#plataforma");
    expect(secondary).toHaveAttribute("data-cta", "hero-secondary");
  });

  it("speaks to who sells to the government in São Paulo and backs it with honest trust points", () => {
    render(<Hero />);
    expect(screen.getByText("Para quem vende ao governo em São Paulo")).toBeInTheDocument();
    expect(screen.queryByText("Citação direta de artigos e páginas")).not.toBeInTheDocument();
    expect(screen.getByText("Alinhado à Lei 14.133/2021")).toBeInTheDocument();
  });

  it("rotates the four outcomes as a list every reader gets in full", () => {
    render(<Hero />);
    const list = screen.getByRole("list", { name: "O que a Qore entrega" });
    const lines = within(list).getAllByRole("listitem");
    expect(lines.map((line) => line.textContent)).toEqual([
      "Editais que combinam com o seu CNPJ",
      "Resumo do edital com a página citada",
      "Proposta cerca de 80% pronta, com sua marca",
      "Certidões com aviso antes de vencer",
    ]);
    expect(lines.map((line) => line.style.getPropertyValue("--order"))).toEqual(["0", "1", "2", "3"]);
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
