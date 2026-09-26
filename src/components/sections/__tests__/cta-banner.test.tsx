import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ctaBanners } from "@/config/home-content";
import { CtaBanner } from "../cta-banner";

describe("CtaBanner", () => {
  it("sends the visitor to the contact form and tags the location", () => {
    render(
      <CtaBanner
        location="after-features"
        title="Sua próxima proposta pode sair cerca de 80% pronta"
        actionLabel="Falar com um especialista"
        source="Fonte: PNCP"
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sua próxima proposta pode sair cerca de 80% pronta");
    const action = screen.getByRole("link", { name: "Falar com um especialista" });
    expect(action).toHaveAttribute("href", "/#contato");
    expect(action).toHaveAttribute("data-cta", "after-features");
  });

  it("leads with sourced market gains and sends to the CNPJ tenders first, then to a demo", () => {
    render(
      <>
        <CtaBanner {...ctaBanners.afterFeatures} />
        <CtaBanner {...ctaBanners.afterIntegrations} />
      </>,
    );
    const [first, second] = screen.getAllByRole("region");
    expect(within(first).getByRole("heading", { level: 2 })).toHaveTextContent(
      "O Estado de São Paulo compra R$ 33 bilhões por ano. Veja quanto disso combina com o seu CNPJ.",
    );
    expect(first).toHaveTextContent("Fonte: Portal de Compras do Governo de SP");
    expect(within(first).getByRole("link", { name: "Ver as licitações do meu CNPJ" })).toHaveAttribute("data-cta", "after-features");
    expect(within(second).getByRole("heading", { level: 2 })).toHaveTextContent(
      "Pequenos negócios venderam R$ 42,4 bilhões ao governo em 2022. A Qore coloca a sua empresa nessa conta.",
    );
    expect(second).toHaveTextContent("Fonte: Agência Sebrae de Notícias, 2023");
    expect(within(second).getByRole("link", { name: "Agendar demonstração" })).toHaveAttribute("data-cta", "after-integrations");
  });
});
