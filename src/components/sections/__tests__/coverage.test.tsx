import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Coverage } from "../coverage";

describe("Coverage", () => {
  it("says coverage starts in São Paulo only", () => {
    render(<Coverage />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Começamos por São Paulo");
  });

  it("invites companies from other states to leave a contact", () => {
    render(<Coverage />);
    expect(screen.getByRole("link", { name: "Deixe seu contato" })).toHaveAttribute("href", "/#contato");
  });

  it("draws an accessible map of the state", () => {
    render(<Coverage />);
    expect(screen.getByRole("img", { name: /Mapa estilizado do estado de São Paulo/ })).toBeInTheDocument();
  });

  it("claims no monitoring numbers", () => {
    const { container } = render(<Coverage />);
    expect(container.textContent).not.toMatch(/municípios paulistas monitorados/);
  });
});
