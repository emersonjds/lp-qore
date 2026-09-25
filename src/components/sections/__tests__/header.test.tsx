import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "../header";

describe("Header", () => {
  it("links to every section anchor and to the contact form", () => {
    render(<Header />);
    const navigation = screen.getByRole("navigation", { name: "Principal" });
    expect(within(navigation).getByRole("link", { name: "Como funciona" })).toHaveAttribute("href", "/#como-funciona");
    expect(within(navigation).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Como funciona", "/#como-funciona"],
      ["Funcionalidades", "/#funcionalidades"],
      ["Integrações", "/#integracoes"],
      ["IA responsável", "/#ia-responsavel"],
      ["FAQ", "/#faq"],
    ]);
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("href", "/#contato");
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("data-cta", "header");
  });

  it("switches between the desktop nav with CTA and the mobile menu at the same breakpoint", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "Principal" })).toHaveClass("hidden", "lg:block");
    expect(screen.getByRole("link", { name: "Fale com a gente" })).toHaveClass("hidden", "lg:inline-flex");
    expect(screen.getByRole("link", { name: "Fale com a gente" })).not.toHaveClass("md:inline-flex");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveClass("lg:hidden");
  });

  it("opens the mobile menu and closes it after choosing a link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("link", { name: "Como funciona" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("labels the menu close button in Portuguese", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar" })).toHaveClass("size-11");
  });
});
