import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { testimonials } from "@/config/testimonials";
import { Testimonials } from "../testimonials";

describe("Testimonials", () => {
  it("ships with no entries until the owner provides authorized ones", () => {
    expect(testimonials).toEqual([]);
  });

  it("renders nothing while the list is empty", () => {
    const { container } = render(<Testimonials />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one card per authorized quote", () => {
    render(
      <Testimonials
        items={[
          {
            quote: "Texto de teste.",
            name: "Pessoa de Teste",
            role: "Cargo de teste",
            company: "Empresa de Teste",
            authorizedAt: "2026-10-01",
          },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Texto de teste.")).toBeInTheDocument();
    expect(screen.getByText("Pessoa de Teste")).toBeInTheDocument();
    expect(screen.getByText("Cargo de teste, Empresa de Teste")).toBeInTheDocument();
  });

  it("shows the company logo when one is authorized", () => {
    render(
      <Testimonials
        items={[
          {
            quote: "Outro texto.",
            name: "Outra Pessoa",
            role: "Cargo",
            company: "Outra Empresa",
            logoSrc: "/logos/outra.svg",
            authorizedAt: "2026-10-01",
          },
        ]}
      />,
    );
    expect(screen.getByRole("img", { name: "Outra Empresa" })).toHaveAttribute("src", "/logos/outra.svg");
  });
});
