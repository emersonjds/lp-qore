import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSubmitButton } from "../contact-submit-button";

describe("ContactSubmitButton", () => {
  it.each([
    ["idle", "Quero assinar"],
    ["submitting", "Enviando…"],
    ["success", "Enviado"],
    ["error", "Quero assinar"],
  ] as const)("labels the %s state", (status, label) => {
    render(<ContactSubmitButton status={status} />);
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it("blocks double submission while sending", () => {
    render(<ContactSubmitButton status="submitting" />);
    expect(screen.getByRole("button", { name: "Enviando…" })).toBeDisabled();
  });

  it("swaps in a fresh animated label on every status change", () => {
    const { rerender } = render(<ContactSubmitButton status="submitting" />);
    const sending = screen.getByText("Enviando…");
    expect(sending).toHaveAttribute("data-motion-label");
    rerender(<ContactSubmitButton status="success" />);
    expect(screen.getByText("Enviado")).toHaveAttribute("data-motion-label");
    expect(sending).not.toBeInTheDocument();
  });
});
