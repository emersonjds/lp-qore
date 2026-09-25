import { Button } from "@/components/ui/button";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const LABELS: Record<ContactFormStatus, string> = {
  idle: "Quero falar com a equipe",
  submitting: "Enviando…",
  success: "Enviado",
  error: "Quero falar com a equipe",
};

interface ContactSubmitButtonProps {
  status: ContactFormStatus;
}

export const ContactSubmitButton = ({ status }: ContactSubmitButtonProps) => (
  <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
    {LABELS[status]}
  </Button>
);
