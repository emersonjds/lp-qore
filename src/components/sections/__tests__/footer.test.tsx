import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { LegalIdentity } from "@/types";
import { Footer } from "../footer";

const emptyLegal: LegalIdentity = {
  companyName: "",
  taxId: "",
  city: "",
  state: "",
  contactEmail: "",
  dataProtectionOfficer: "",
};

const completeLegal: LegalIdentity = {
  companyName: "Razão Social de Teste",
  taxId: "CNPJ-DE-TESTE",
  city: "Cidade de Teste",
  state: "SP",
  contactEmail: "contato@example.com",
  dataProtectionOfficer: "Encarregado de Teste",
};

describe("Footer", () => {
  it("shows the copyright for the given year", () => {
    render(<Footer year={2026} />);
    expect(screen.getByText("© 2026 Qore. Todos os direitos reservados.")).toBeInTheDocument();
  });

  it("shows no legal line while the company data is not filled in", () => {
    const { container } = render(<Footer year={2026} legal={emptyLegal} />);
    expect(container.textContent).not.toMatch(/CNPJ/);
  });

  it("shows the company name, CNPJ and city once the legal data is complete", () => {
    render(<Footer year={2026} legal={completeLegal} />);
    expect(screen.getByText("Razão Social de Teste · CNPJ CNPJ-DE-TESTE · Cidade de Teste/SP")).toBeInTheDocument();
  });

  it("links only to real destinations", () => {
    render(<Footer year={2026} />);
    const navigation = screen.getByRole("navigation", { name: "Rodapé" });
    const hrefs = within(navigation).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "/#como-funciona",
      "/#funcionalidades",
      "/#integracoes",
      "/#ia-responsavel",
      "/#faq",
      "/#para-quem-e",
      "/#contato",
      "/privacidade",
    ]);
  });
});
