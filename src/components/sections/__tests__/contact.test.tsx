import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "../contact";

describe("Contact", () => {
  it("invites the visitor to a demo with their own tenders", () => {
    render(<Contact />);
    expect(screen.getByText("Demonstração")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Veja a Qore com as licitações da sua empresa",
    );
    expect(
      screen.getByText(
        "Conte um pouco sobre a sua empresa e um especialista mostra as licitações abertas em São Paulo para o seu segmento.",
      ),
    ).toBeInTheDocument();
  });

  it("lists what the demo brings, without waitlist promises", () => {
    const { container } = render(<Contact />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.textContent).not.toMatch(/vagas/i);
  });
});
