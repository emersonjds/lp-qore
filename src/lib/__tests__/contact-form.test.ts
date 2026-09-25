import { describe, expect, it, vi } from "vitest";
import {
  CONTACT_SUBMIT_ERROR,
  buildSuccessMessage,
  encodeContactSubmission,
  firstInvalidField,
  submitContact,
  validateContactForm,
  type ContactFormValues,
} from "../contact-form";

const validValues: ContactFormValues = {
  name: "Maria Souza",
  email: "maria@empresa.com.br",
  phone: "(11) 98765-4321",
  role: "Gestor comercial",
  company: "",
  message: "",
  consent: true,
};

describe("validateContactForm", () => {
  it("accepts a complete submission", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });

  it("requires every mandatory field with Portuguese messages", () => {
    const errors = validateContactForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      company: "",
      message: "",
      consent: false,
    });
    expect(errors).toEqual({
      name: "Informe seu nome.",
      email: "Informe seu e-mail.",
      phone: "Informe seu telefone ou WhatsApp.",
      role: "Escolha o seu cargo.",
      consent: "Para enviar, autorize o uso dos seus dados para este contato.",
    });
  });

  it("rejects a malformed e-mail and phone", () => {
    const errors = validateContactForm({ ...validValues, email: "maria@", phone: "(11) 1234" });
    expect(errors.email).toBe("Informe um e-mail válido, como nome@empresa.com.br.");
    expect(errors.phone).toBe("Informe um telefone com DDD, como (11) 98765-4321.");
  });

  it("rejects a role outside the list", () => {
    expect(validateContactForm({ ...validValues, role: "Estagiário" }).role).toBe("Escolha o seu cargo.");
  });
});

describe("firstInvalidField", () => {
  it("follows the visual order of the form", () => {
    expect(firstInvalidField({ consent: "x", phone: "y" })).toBe("phone");
    expect(firstInvalidField({})).toBeUndefined();
  });
});

describe("encodeContactSubmission", () => {
  it("encodes the Netlify form name and every field", () => {
    const body = new URLSearchParams(encodeContactSubmission(validValues));
    expect(body.get("form-name")).toBe("contato");
    expect(body.get("name")).toBe("Maria Souza");
    expect(body.get("phone")).toBe("(11) 98765-4321");
    expect(body.get("consent")).toBe("sim");
    expect(body.get("bot-field")).toBe("");
  });
});

describe("submitContact", () => {
  it("posts urlencoded data to the site root", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({ status: "success" });
    expect(fetcher).toHaveBeenCalledWith("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeContactSubmission(validValues),
    });
  });

  it("reports our fixed error text when the server refuses", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 500 }));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({
      status: "error",
      message: CONTACT_SUBMIT_ERROR,
    });
  });

  it("reports our fixed error text when the network fails", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(submitContact(validValues, fetcher)).resolves.toEqual({
      status: "error",
      message: CONTACT_SUBMIT_ERROR,
    });
  });
});

describe("buildSuccessMessage", () => {
  it("greets by name", () => {
    expect(buildSuccessMessage("  Maria Souza ")).toBe(
      "Recebemos seu contato, Maria Souza. Vamos falar com você pelo e-mail ou WhatsApp informado.",
    );
  });
});
