import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Input } from "../input";

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

  it.each(["default", "sm", "lg", "icon"] as const)("keeps white text and its type size on primary at size %s", (size) => {
    render(<Button size={size}>Primário</Button>);
    const button = screen.getByRole("button", { name: "Primário" });
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    expect(button.className).toMatch(/text-(label-md|body-md)/);
  });

  it("keeps white text when an instance adds type and alignment classes", () => {
    render(
      <Button size="lg" className="text-center">
        Enviar
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveClass("text-primary-foreground", "text-body-md", "text-center");
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
