import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "../contact";

describe("Contact", () => {
  it("invites the visitor to a demo with their own tenders", () => {
    render(<Contact />);
    expect(screen.getByText("Diagnóstico sem compromisso")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Descubra quais licitações de São Paulo a sua empresa pode vencer",
    );
    expect(
      screen.getByText(
        "Leva 1 minuto. Um especialista cruza o seu CNPJ com os editais abertos em São Paulo e apresenta as oportunidades do seu segmento.",
      ),
    ).toBeInTheDocument();
  });

  it("lists what the demo brings, without waitlist promises", () => {
    const { container } = render(<Contact />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.textContent).not.toMatch(/vagas/i);
  });
});
