import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Input } from "./input";

describe("Button", () => {
  it("is at least 44px tall by default", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveClass("h-11");
  });

  it("keeps small buttons at 44px", () => {
    render(<Button size="sm">Menor</Button>);
    expect(screen.getByRole("button", { name: "Menor" })).toHaveClass("h-11");
  });

  it("has a 44px square icon size", () => {
    render(<Button size="icon" aria-label="Abrir menu" />);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveClass("size-11");
  });
});

describe("Input", () => {
  it("is 44px tall with a 16px font on every breakpoint", () => {
    render(<Input aria-label="Nome" />);
    const input = screen.getByRole("textbox", { name: "Nome" });
    expect(input).toHaveClass("h-11", "text-base");
    expect(input.className).not.toContain("md:text-sm");
  });
});
