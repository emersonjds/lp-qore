import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../footer";

describe("Footer", () => {
  it("shows the copyright for the given year", () => {
    render(<Footer year={2026} />);
    expect(screen.getByText("© 2026 Qore")).toBeInTheDocument();
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
      "/#contato",
      "/privacidade",
    ]);
  });
});
