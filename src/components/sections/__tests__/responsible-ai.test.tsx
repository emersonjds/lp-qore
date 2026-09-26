import { render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ResponsibleAi } from "../responsible-ai";

const EXCERPT = "“Exige-se índice de liquidez corrente superior a 1,25.”";

const auditCard = () => screen.getByRole("figure", { name: "Auditoria em Tempo Real" });

describe("ResponsibleAi", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<ResponsibleAi />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("IA que mostra a fonte e deixa a decisão com você");
    expect(
      screen.getByText("Cada ponto cita a página do edital, o que o edital não informa aparece como lacuna e o envio ao portal é sempre da sua empresa."),
    ).toBeInTheDocument();
  });

  it("presents the AI as institutional governance, citing the source instead of promising no hallucinations", () => {
    const { container } = render(<ResponsibleAi />);
    expect(screen.getByText("Governança e transparência")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/alucina|100%/i);
  });

  it("lists the four commitments as cards", () => {
    render(<ResponsibleAi />);
    const commitments = screen.getByRole("list", { name: "Compromissos da IA" });
    expect(within(commitments).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Cita a fonte de cada afirmação",
      "Diz quando o edital não informa",
      "Sugere, você decide",
      "Você envia a proposta, não a IA",
    ]);
  });

  it("audits an extracted clause with the file and page it came from, as an illustrative example", () => {
    render(<ResponsibleAi />);
    const card = auditCard();
    expect(within(card).getByText("Trecho extraído:")).toBeInTheDocument();
    expect(within(card).getByText(EXCERPT)).toBeInTheDocument();
    expect(within(card).getByText("Edital_SP_Item_8.4.pdf • pág. 31")).toBeInTheDocument();
    expect(within(card).getByText("Não encontrado no edital")).toBeInTheDocument();
  });

  it("types the clause one character at a time and pops the source chip only after the last one", () => {
    render(<ResponsibleAi />);
    const card = auditCard();
    expect(card).toHaveAttribute("data-reveal");
    const characters = [...card.querySelectorAll<HTMLElement>("[data-typed-char]")];
    expect(characters.map((character) => character.textContent).join("")).toBe(EXCERPT);
    expect(characters[0]?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(characters.map((character) => character.style.getPropertyValue("--order"))).toEqual(
      characters.map((_, index) => String(index)),
    );
    const chip = card.querySelector<HTMLElement>("[data-source-chip]");
    expect(chip?.style.getPropertyValue("--order")).toBe(String(EXCERPT.length));
  });

  it("renders the whole clause before JavaScript runs", () => {
    const html = renderToString(<ResponsibleAi />);
    expect(html).toContain("Edital_SP_Item_8.4.pdf");
    expect(html).not.toContain("opacity:0");
  });
});
