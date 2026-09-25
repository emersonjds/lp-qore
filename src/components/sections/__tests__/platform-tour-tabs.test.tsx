import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { platformTabs } from "@/config/home-content";
import { PlatformTourTabs } from "../platform-tour-tabs";

describe("PlatformTourTabs", () => {
  it("shows the first screen and hides the others after hydration", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Painel do gestor" })).not.toHaveClass("invisible");
    expect(screen.getByRole("tabpanel", { name: "Radar", hidden: true })).toHaveClass("invisible");
  });

  it("switches screens on click", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    await user.click(screen.getByRole("tab", { name: "Precificação" }));
    expect(screen.getByRole("tab", { name: "Precificação" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Precificação" })).not.toHaveClass("invisible");
  });

  it("moves between tabs with the arrow, Home and End keys", async () => {
    const user = userEvent.setup();
    render(<PlatformTourTabs tabs={platformTabs} />);
    screen.getByRole("tab", { name: "Painel do gestor" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Radar" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Calendário" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}{Home}");
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
  });

  it("seals every screen as illustrative and reserves its size", () => {
    render(<PlatformTourTabs tabs={platformTabs} />);
    expect(screen.getAllByText("Tela ilustrativa", { exact: true })).toHaveLength(5);
    const image = screen.getByAltText(platformTabs[0]?.alt ?? "");
    expect(image).toHaveAttribute("width", "1280");
    expect(image).toHaveAttribute("height", "800");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders every screen visibly before JavaScript runs", () => {
    const html = renderToString(<PlatformTourTabs tabs={platformTabs} />);
    expect(html).not.toContain("invisible");
    expect(html.match(/<figure/g)).toHaveLength(5);
  });
});
