import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { About } from "./about";

describe("About", () => {
  it("states the mission without names or photos", () => {
    const { container } = render(<About />);
    expect(screen.getByText(/tornar a licitação pública acessível/)).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).not.toMatch(/Placeholder|Co-fundador|Cofundador/);
  });
});
