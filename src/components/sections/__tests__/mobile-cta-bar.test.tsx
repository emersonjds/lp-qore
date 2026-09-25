import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { MobileCtaBar } from "../mobile-cta-bar";

const renderWithSections = () =>
  render(
    <>
      <section id="inicio" />
      <section id="contato" />
      <MobileCtaBar />
    </>,
  );

const trigger = (id: string, isIntersecting: boolean) => {
  const target = document.getElementById(id);
  if (!target) throw new Error(`missing #${id}`);
  act(() => IntersectionObserverMock.trigger(target, isIntersecting));
};

const bar = () => screen.getByRole("complementary", { name: "Fale com a gente", hidden: true });

describe("MobileCtaBar", () => {
  it("starts hidden and out of the tab order", () => {
    const html = renderToString(<MobileCtaBar />);
    expect(html).toContain("translate-y-full");
    expect(html).toContain("inert");
  });

  it("appears once the hero leaves the viewport", () => {
    renderWithSections();
    trigger("inicio", false);
    trigger("contato", false);
    expect(bar()).toHaveAttribute("data-visible", "true");
    expect(bar()).not.toHaveAttribute("inert");
    const link = screen.getByRole("link", { name: "Fale com a gente" });
    expect(link).toHaveAttribute("href", "/#contato");
    expect(link).toHaveAttribute("data-cta", "mobile-sticky");
  });

  it("hides again while the contact section is visible", () => {
    renderWithSections();
    trigger("inicio", false);
    trigger("contato", true);
    expect(bar()).toHaveAttribute("data-visible", "false");
  });

  it("stays hidden while the hero is on screen", () => {
    renderWithSections();
    trigger("inicio", true);
    expect(bar()).toHaveAttribute("data-visible", "false");
  });
});
