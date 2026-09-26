import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "../logo";

describe("Logo", () => {
  it("reads as the Qore wordmark with an emerald dot", () => {
    const { container } = render(<Logo />);
    expect(container.textContent).toBe("Qore.");
    expect(container.querySelector(".text-primary")?.textContent).toBe(".");
  });

  it("hides the mark from assistive technology", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
