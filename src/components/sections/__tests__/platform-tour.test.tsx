import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlatformTour } from "../platform-tour";

describe("PlatformTour", () => {
  it("positions the section with the approved heading and lead", () => {
    const { container } = render(<PlatformTour />);
    expect(container.querySelector("section#plataforma")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Uma tela para cada etapa da licitação");
    expect(
      screen.getByText(
        "Painel do gestor, radar, resumo com IA, precificação e calendário, todos com os mesmos dados da empresa.",
      ),
    ).toBeInTheDocument();
  });
});
