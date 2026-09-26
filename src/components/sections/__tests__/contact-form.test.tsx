import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_SUBMIT_ERROR } from "@/lib/contact-form";
import { ContactForm } from "../contact-form";

const fillValidForm = async (user: UserEvent) => {
  await user.type(screen.getByLabelText(/Nome/), "Maria Souza");
  await user.type(screen.getByLabelText(/E-mail corporativo/), "maria@empresa.com.br");
  await user.type(screen.getByLabelText(/Telefone ou WhatsApp/), "11987654321");
  await user.selectOptions(screen.getByLabelText(/Cargo/), "Gestor comercial");
  await user.click(screen.getByRole("checkbox"));
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("is detectable by Netlify Forms in the exported HTML", () => {
    const html = renderToString(<ContactForm />);
    expect(html).toContain('name="contato"');
    expect(html).toContain('data-netlify="true"');
    expect(html).toContain('netlify-honeypot="bot-field"');
    expect(html).toContain('name="form-name" value="contato"');
  });

  it("reassures under the button and tags the submit as the final CTA", () => {
    render(<ContactForm />);
    expect(screen.getByText("Resposta em horário comercial.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quero assinar" })).toHaveAttribute(
      "data-cta",
      "contact-submit",
    );
  });

  it("offers a sales conversation as a secondary path that jumps to the message field", () => {
    render(<ContactForm />);
    expect(screen.getByRole("link", { name: "Prefere falar com vendas? Deixe uma mensagem" })).toHaveAttribute(
      "href",
      "#contact-message",
    );
  });

  it("keeps consent unchecked by default", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/privacidade");
  });

  it("shows every error and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Quero assinar" }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Escolha o seu cargo.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toHaveFocus();
    expect(screen.getByLabelText(/Nome/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Revise os campos destacados.");
  });

  it("masks the phone while typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const phone = screen.getByLabelText(/Telefone ou WhatsApp/);
    await user.type(phone, "11987654321");
    expect(phone).toHaveValue("(11) 98765-4321");
  });

  it("sends the lead and confirms without reloading", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetcher);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Quero assinar" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Recebemos seu contato, Maria Souza. Vamos falar com você pelo e-mail ou WhatsApp informado.",
      ),
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(String(fetcher.mock.calls[0]?.[1]?.body)).toContain("form-name=contato");
  });

  it("shows our fixed error text when sending fails", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch")));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Quero assinar" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(CONTACT_SUBMIT_ERROR));
  });
});
