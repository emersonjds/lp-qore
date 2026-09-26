import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "../contact";

describe("Contact", () => {
  it("invites the visitor to subscribe and see their own tenders", () => {
    render(<Contact />);
    expect(screen.getByText("Assinatura")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Assine a Qore e veja suas licitações");
  });

  it("lists what the subscription brings, without waitlist promises", () => {
    const { container } = render(<Contact />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.textContent).not.toMatch(/vagas/i);
  });
});
