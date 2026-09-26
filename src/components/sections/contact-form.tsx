"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  CONTACT_FORM_NAME,
  buildSuccessMessage,
  contactRoles,
  firstInvalidField,
  submitContact,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-form";
import { formatBrazilianPhone } from "@/lib/phone";
import { ContactSubmitButton, type ContactFormStatus } from "./contact-submit-button";

type TextField = "name" | "email" | "phone" | "role" | "company" | "message";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  message: "",
  consent: false,
};

const CONTROL_CLASS =
  "w-full rounded-md border border-input bg-card px-3.5 text-base text-foreground shadow-sm outline-none focus-visible:border-primary aria-invalid:border-destructive";

interface FieldShellProps {
  id: string;
  label: string;
  isRequired: boolean;
  error?: string;
  children: ReactNode;
}

const FieldShell = ({ id, label, isRequired, error, children }: FieldShellProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-label-md text-foreground">
      {label}
      {isRequired ? (
        <span aria-hidden="true" className="text-destructive-text">
          {" "}
          *
        </span>
      ) : (
        <span className="text-muted-foreground"> (opcional)</span>
      )}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-caption text-destructive-text">
        {error}
      </p>
    )}
  </div>
);

export const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [isEnhanced, setIsEnhanced] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setIsEnhanced(true), []);

  const setTextField = (field: TextField, value: string) =>
    setValues((current) => {
      const next = { ...current };
      next[field] = field === "phone" ? formatBrazilianPhone(value) : value;
      return next;
    });

  const describedBy = (field: keyof ContactFormErrors, id: string) => (errors[field] ? `${id}-error` : undefined);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    const invalidField = firstInvalidField(validationErrors);
    if (invalidField) {
      setStatus("idle");
      setFeedback("Revise os campos destacados.");
      formRef.current?.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("Enviando seu contato…");
    const result = await submitContact(values);
    if (result.status === "error") {
      setStatus("error");
      setFeedback(result.message);
      return;
    }

    setStatus("success");
    setFeedback(buildSuccessMessage(values.name));
    setValues(INITIAL_VALUES);
  };

  return (
    <form
      ref={formRef}
      name={CONTACT_FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate={isEnhanced}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
      <p className="hidden">
        <label>
          Não preencha este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <FieldShell id="contact-name" label="Nome" isRequired error={errors.name}>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => setTextField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name", "contact-name")}
        />
      </FieldShell>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="contact-email" label="E-mail corporativo" isRequired error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => setTextField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", "contact-email")}
          />
        </FieldShell>
        <FieldShell id="contact-phone" label="Telefone ou WhatsApp" isRequired error={errors.phone}>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 98765-4321"
            required
            value={values.phone}
            onChange={(event) => setTextField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", "contact-phone")}
          />
        </FieldShell>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="contact-role" label="Cargo" isRequired error={errors.role}>
          <select
            id="contact-role"
            name="role"
            required
            value={values.role}
            onChange={(event) => setTextField("role", event.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={describedBy("role", "contact-role")}
            className={`${CONTROL_CLASS} h-11`}
          >
            <option value="" disabled>
              Selecione
            </option>
            {contactRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldShell id="contact-company" label="Empresa ou CNPJ" isRequired={false}>
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => setTextField("company", event.target.value)}
          />
        </FieldShell>
      </div>

      <FieldShell id="contact-message" label="Mensagem" isRequired={false}>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => setTextField("message", event.target.value)}
          className={`${CONTROL_CLASS} min-h-28 py-2.5`}
        />
      </FieldShell>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setValues((current) => ({ ...current, consent: isChecked }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent", "contact-consent")}
            className="mt-3 size-5 shrink-0 accent-primary"
          />
          <label htmlFor="contact-consent" className="flex min-h-11 items-center text-label-md text-foreground">
            <span>
              Autorizo o Qore a usar meus dados para responder este contato, conforme a{" "}
              <a href="/privacidade" className="font-medium text-primary underline underline-offset-4">
                Política de Privacidade
              </a>
              .
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id="contact-consent-error" className="text-caption text-destructive-text">
            {errors.consent}
          </p>
        )}
      </div>

      <ContactSubmitButton status={status} />
      <p className="-mt-2 text-center text-caption text-muted-foreground">
        Um especialista entra em contato em horário comercial.
      </p>
      <p role="status" aria-live="polite" className="min-h-6 text-body-md text-foreground">
        {feedback}
      </p>
    </form>
  );
};
