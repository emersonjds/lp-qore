import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Documents } from "../documents";

describe("Documents", () => {
  it("anchors at #documentos and promises alerts before expiry", () => {
    const { container } = render(<Documents />);
    expect(container.querySelector("section#documentos")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Documentos e certidões em dia");
    expect(screen.getByText(/avisa antes de vencer/)).toBeInTheDocument();
  });

  it("shows the real documents screen on a phone without an illustrative seal", () => {
    render(<Documents />);
    expect(screen.getByRole("figure", { name: "Documentos" })).not.toHaveTextContent("Tela ilustrativa");
    expect(screen.getByRole("img", { name: /Tela de documentos/ })).toHaveAttribute(
      "src",
      "/screenshots/documents-mobile-780.webp",
    );
  });

  it("keeps no drawn mock of the certificate list", () => {
    render(<Documents />);
    expect(screen.queryByRole("list", { name: "Certidões da empresa" })).not.toBeInTheDocument();
  });

  it("flips example certificate chips from checking to their status in sequence", () => {
    const { container } = render(<Documents />);
    const checks = screen.getByRole("list", { name: "Exemplo de verificação de certidões" });
    expect(checks.closest("[data-certificates]")).toHaveAttribute("data-reveal");
    const chips = [...checks.querySelectorAll("li")];
    expect(chips.map((chip) => chip.querySelector("[data-status-final]")?.textContent)).toEqual([
      "Válida",
      "Válida",
      "Vence em 12 dias",
    ]);
    expect(chips.map((chip) => chip.style.getPropertyValue("--order"))).toEqual(["0", "1", "2"]);
    chips.forEach((chip) => expect(chip.querySelector("[data-status-pending]")).toHaveAttribute("aria-hidden", "true"));
    expect(container).toHaveTextContent("Exemplo");
  });
});
