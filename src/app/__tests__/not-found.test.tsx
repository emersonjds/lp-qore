import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "../not-found";

describe("NotFound", () => {
  it("is the skip-link target and uses the type tokens", () => {
    const { container } = render(<NotFound />);
    const main = container.querySelector("main");
    expect(main).toHaveAttribute("id", "conteudo");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-headline-xl-mobile", "md:text-headline-xl");
    expect(screen.getByText("Página não encontrada")).toHaveClass("text-body-lg");
    expect(screen.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/");
  });
});
