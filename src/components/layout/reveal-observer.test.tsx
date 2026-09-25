import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { RevealObserver } from "./reveal-observer";

describe("RevealObserver", () => {
  it("enables reveal styling only after JavaScript runs", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    expect(document.documentElement).toHaveClass("reveal-enabled");
  });

  it("reveals an element when it enters the viewport", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    const card = screen.getByText("Cartão");
    IntersectionObserverMock.trigger(card, true);
    expect(card).toHaveAttribute("data-revealed");
  });

  it("leaves an element hidden-ready while it is below the fold", () => {
    render(
      <>
        <p data-reveal>Cartão</p>
        <RevealObserver />
      </>,
    );
    const card = screen.getByText("Cartão");
    IntersectionObserverMock.trigger(card, false);
    expect(card).not.toHaveAttribute("data-revealed");
  });
});
