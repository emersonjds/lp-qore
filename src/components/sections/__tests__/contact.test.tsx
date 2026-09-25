import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "../contact";

describe("Contact", () => {
  it("promises a demo with tenders from the visitor's segment", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Receba uma demonstração com as licitações do seu segmento",
    );
  });
});
