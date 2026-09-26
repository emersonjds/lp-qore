import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Integrations } from "../integrations";

describe("Integrations", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<Integrations />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("PNCP, BEC/SP e mais seis portais em um só radar");
    expect(
      screen.getByText("Compras.gov.br, BLL, BNC, Licitações-e, Portal de Compras Públicas e Licitar Digital também entram na busca."),
    ).toBeInTheDocument();
  });

  it("anchors at #integracoes with the owner's title", () => {
    const { container } = render(<Integrations />);
    expect(container.querySelector("section#integracoes")).not.toBeNull();
  });

  it("names the tender portals as text", () => {
    render(<Integrations />);
    const portals = screen.getByRole("list", { name: "Portais de licitação" });
    expect(within(portals).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "PNCP",
      "Compras.gov.br (ComprasNet)",
      "BEC/SP",
      "BLL Compras",
      "Bolsa Nacional de Compras (BNC)",
      "Licitações-e (Banco do Brasil)",
      "Portal de Compras Públicas",
      "Licitar Digital",
    ]);
  });

  it("names the certificates and registries consulted", () => {
    render(<Integrations />);
    const registries = screen.getByRole("list", { name: "Certidões e cadastros consultados" });
    expect(within(registries).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "CND Federal (RFB/PGFN)",
      "CRF/FGTS (Caixa)",
      "CNDT (TST)",
      "CEIS/CNEP (CGU)",
      "SICAF",
    ]);
  });

  it("uses no third-party logo", () => {
    const { container } = render(<Integrations />);
    expect(container.querySelector("img, svg image")).toBeNull();
  });
});
