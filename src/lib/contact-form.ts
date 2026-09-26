import { companySizes, contactRoles, monthlyTenderRanges } from "@/config/contact-form";
import { isValidBrazilianPhone } from "./phone";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  role: string;
  companySize: string;
  monthlyTenders: string;
  company: string;
  message: string;
  consent: boolean;
}

type ContactFieldName = "name" | "email" | "phone" | "role" | "companySize" | "monthlyTenders" | "consent";

export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

const FIELD_ORDER: readonly ContactFieldName[] = [
  "name",
  "email",
  "phone",
  "role",
  "companySize",
  "monthlyTenders",
  "consent",
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_FORM_NAME = "contato";
export const CONTACT_SUBMIT_ERROR =
  "Não conseguimos enviar seu contato agora. Verifique a conexão e tente de novo em alguns minutos.";

const isOneOf = (options: readonly string[], value: string): boolean => options.includes(value);

export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  const email = values.email.trim();

  if (values.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!email) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";
  if (!values.phone.trim()) errors.phone = "Informe seu telefone ou WhatsApp.";
  else if (!isValidBrazilianPhone(values.phone)) errors.phone = "Informe um telefone com DDD, como (11) 98765-4321.";
  if (!isOneOf(contactRoles, values.role)) errors.role = "Escolha o seu cargo.";
  if (!isOneOf(companySizes, values.companySize)) errors.companySize = "Escolha o porte da empresa.";
  if (!isOneOf(monthlyTenderRanges, values.monthlyTenders))
    errors.monthlyTenders = "Escolha quantas licitações a empresa disputa por mês.";
  if (!values.consent) errors.consent = "Para enviar, autorize o uso dos seus dados para este contato.";

  return errors;
};

export const firstInvalidField = (errors: ContactFormErrors): ContactFieldName | undefined =>
  FIELD_ORDER.find((field) => errors[field] !== undefined);

export const encodeContactSubmission = (values: ContactFormValues): string =>
  new URLSearchParams({
    "form-name": CONTACT_FORM_NAME,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone,
    role: values.role,
    companySize: values.companySize,
    monthlyTenders: values.monthlyTenders,
    company: values.company.trim(),
    message: values.message.trim(),
    consent: values.consent ? "sim" : "nao",
    "bot-field": "",
  }).toString();

type SubmitContactResult = { status: "success" } | { status: "error"; message: string };

export const submitContact = async (
  values: ContactFormValues,
  fetcher: typeof fetch = fetch,
): Promise<SubmitContactResult> => {
  try {
    const response = await fetcher("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeContactSubmission(values),
    });
    return response.ok ? { status: "success" } : { status: "error", message: CONTACT_SUBMIT_ERROR };
  } catch {
    return { status: "error", message: CONTACT_SUBMIT_ERROR };
  }
};

export const buildSuccessMessage = (name: string): string =>
  `Recebemos seu contato, ${name.trim()}. Vamos falar com você pelo e-mail ou WhatsApp informado.`;
