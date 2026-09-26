import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cnpjRadarContent } from "@/config/cnpj-radar";
import { CnpjRadar } from "../cnpj-radar";

describe("CnpjRadar", () => {
  it("offers the free CNPJ radar as an anchored section", () => {
    const { container } = render(<CnpjRadar />);
    expect(container.querySelector("section#radar")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: cnpjRadarContent.title })).toBeInTheDocument();
    expect(screen.getByLabelText(/CNPJ da empresa/)).toBeInTheDocument();
  });
});
