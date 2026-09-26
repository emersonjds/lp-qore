import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ctaBanners } from "@/config/home-content";
import { CtaBanner } from "../cta-banner";

describe("CtaBanner", () => {
  it("sends the visitor to the contact form and tags the location", () => {
    render(
      <CtaBanner
        location="after-features"
        title="Sua próxima proposta pode sair 80% pronta"
        actionLabel="Falar com um especialista"
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sua próxima proposta pode sair 80% pronta");
    const action = screen.getByRole("link", { name: "Falar com um especialista" });
    expect(action).toHaveAttribute("href", "/#contato");
    expect(action).toHaveAttribute("data-cta", "after-features");
  });

  it("invites to start and to subscribe for the CNPJ radar", () => {
    render(
      <>
        <CtaBanner {...ctaBanners.afterFeatures} />
        <CtaBanner {...ctaBanners.afterIntegrations} />
      </>,
    );
    expect(screen.getByRole("link", { name: "Começar agora" })).toHaveAttribute("data-cta", "after-features");
    expect(screen.getByRole("link", { name: "Assine e receba o radar do seu CNPJ" })).toHaveAttribute(
      "data-cta",
      "after-integrations",
    );
  });
});
