import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Features } from "../features";

describe("Features", () => {
  it("anchors the section at #funcionalidades with the owner's title", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("section#funcionalidades")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Tudo o que sua equipe precisa para disputar licitações",
    );
  });

  it("lists the twelve features in the decided order", () => {
    render(<Features />);
    const list = screen.getByRole("list", { name: "Funcionalidades da Qore" });
    expect(within(list).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Cadastro pelo CNPJ",
      "Radar de oportunidades",
      "Busca por termos correlatos",
      "Resumo do edital com IA",
      "Proposta cerca de 80% pronta",
      "Sua marca na proposta",
      "Alerta de preço inexequível",
      "Certidões sob controle",
      "Calendário de prazos",
      "Catálogo de produtos",
      "Análise de concorrentes",
      "Equipe e painel do gestor",
    ]);
  });

  it("explains the related-terms search with the owner's example", () => {
    render(<Features />);
    expect(screen.getByText(/Procure “computador” e encontre também “notebook”/)).toBeInTheDocument();
  });

  it("lays the grid out as one column on mobile, two at md and three at lg", () => {
    render(<Features />);
    expect(screen.getByRole("list", { name: "Funcionalidades da Qore" })).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    );
  });
});
