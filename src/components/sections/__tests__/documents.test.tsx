import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Documents } from "../documents";

describe("Documents", () => {
  it("anchors at #documentos and promises alerts before expiry", () => {
    const { container } = render(<Documents />);
    expect(container.querySelector("section#documentos")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Documentos e certidões em dia");
    expect(screen.getByText(/avisa antes de vencer/)).toBeInTheDocument();
  });

  it("lists the six certificates with a status chip each", () => {
    render(<Documents />);
    const list = screen.getByRole("list", { name: "Certidões da empresa" });
    const rows = within(list).getAllByRole("listitem");
    expect(rows.map((row) => row.querySelector("[data-certificate-name]")?.textContent)).toEqual([
      "CND Federal",
      "CRF/FGTS",
      "CNDT",
      "CEIS/CNEP",
      "Certidão estadual",
      "SICAF",
    ]);
    rows.forEach((row) => expect(row.querySelector("[data-certificate-status]")).not.toBeNull());
  });

  it("colours the chips by status from the design system", () => {
    render(<Documents />);
    expect(screen.getAllByText("Válida")[0]).toHaveClass("bg-primary-tint", "text-primary");
    expect(screen.getByText("Vence em 12 dias")).toHaveClass("bg-warning-tint", "text-warning-text");
    expect(screen.getByText("Vencida")).toHaveClass("bg-destructive-tint", "text-destructive-text");
  });

  it("seals the list as an illustrative example", () => {
    render(<Documents />);
    expect(screen.getByText("Exemplo ilustrativo")).toBeInTheDocument();
  });

  it("accepts a real screenshot in place of the list", () => {
    render(<Documents visual={<img src="/screenshots/documents.webp" alt="Tela de documentos" />} />);
    expect(screen.getByRole("img", { name: "Tela de documentos" })).toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "Certidões da empresa" })).not.toBeInTheDocument();
  });
});
