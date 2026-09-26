import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "../contact";

describe("Contact", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Veja as licitações abertas para o seu CNPJ");
    expect(
      screen.getByText("Conte o porte da empresa e quantas licitações disputa por mês. A equipe da Qore retorna com uma demonstração no seu cenário."),
    ).toBeInTheDocument();
  });

  it("invites the visitor to a demo with their own tenders", () => {
    render(<Contact />);
    expect(screen.getByText("Diagnóstico sem compromisso")).toBeInTheDocument();
  });

  it("lists what the demo brings, without waitlist promises", () => {
    const { container } = render(<Contact />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.textContent).not.toMatch(/vagas/i);
  });
});
