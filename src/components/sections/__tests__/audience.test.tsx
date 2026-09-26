import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Audience } from "../audience";

describe("Audience", () => {
  it("anchors the section at #para-quem-e with the approved heading and lead", () => {
    const { container } = render(<Audience />);
    expect(container.querySelector("section#para-quem-e")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Para cada lado da licitação em São Paulo");
    expect(
      screen.getByText(
        "Fornecedoras, equipes de licitação, consultorias e órgãos públicos usam a mesma base de editais, preços e prazos.",
      ),
    ).toBeInTheDocument();
  });

  it("describes the four audiences in the decided order", () => {
    render(<Audience />);
    const cards = within(screen.getByRole("list", { name: "Para quem é a Qore" })).getAllByRole("listitem");
    expect(
      cards.map((card) => [
        within(card).getByRole("heading", { level: 3 }).textContent,
        card.querySelector("p")?.textContent,
      ]),
    ).toEqual([
      [
        "Empresas fornecedoras",
        "Da PME à grande empresa: radar pelo CNPJ, proposta cerca de 80% pronta e certidões sempre em dia.",
      ],
      [
        "Consultores e assessorias de licitação",
        "Vários CNPJs em uma só conta, com uma proposta por cliente e a marca de cada um.",
      ],
      [
        "Equipes de licitação",
        "Analista e gestor com visões próprias, aprovação de propostas e prazos da equipe em um painel.",
      ],
      [
        "Prefeituras e órgãos públicos",
        "Pesquisa de preços a partir de licitações semelhantes e visão dos fornecedores ativos na região, para editais mais bem estimados.",
      ],
    ]);
    expect(screen.queryByText(/Modo Consultor/)).not.toBeInTheDocument();
  });

  it("invites the visitor to talk to a specialist about their case", () => {
    render(<Audience />);
    const action = screen.getByRole("link", { name: "Falar com um especialista sobre o meu caso" });
    expect(action).toHaveAttribute("href", "/#contato");
    expect(action).toHaveAttribute("data-cta", "audience");
  });
});
