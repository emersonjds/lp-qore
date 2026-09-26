import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Audience } from "../audience";

describe("Audience", () => {
  it("anchors the section at #para-quem-e with the owner's title", () => {
    const { container } = render(<Audience />);
    expect(container.querySelector("section#para-quem-e")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("A Qore se encaixa na sua operação");
  });

  it("describes the four audiences in the decided order", () => {
    render(<Audience />);
    const list = screen.getByRole("list", { name: "Para quem é a Qore" });
    expect(within(list).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Empresas fornecedoras",
      "Consultores e assessorias de licitação",
      "Equipes de licitação",
      "Prefeituras e órgãos públicos",
    ]);
    expect(within(list).getByText(/Vários CNPJs em uma só conta \(Modo Consultor\)/)).toBeInTheDocument();
  });

  it("invites the visitor to talk about their case", () => {
    render(<Audience />);
    const action = screen.getByRole("link", { name: "Fale com a gente sobre o seu caso" });
    expect(action).toHaveAttribute("href", "/#contato");
    expect(action).toHaveAttribute("data-cta", "audience");
  });
});
