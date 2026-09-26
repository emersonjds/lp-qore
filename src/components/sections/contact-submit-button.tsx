import { Button } from "@/components/ui/button";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const LABELS: Record<ContactFormStatus, string> = {
  idle: "Solicitar demonstração",
  submitting: "Enviando…",
  success: "Enviado",
  error: "Solicitar demonstração",
};

interface ContactSubmitButtonProps {
  status: ContactFormStatus;
}

export const ContactSubmitButton = ({ status }: ContactSubmitButtonProps) => (
  <Button
    type="submit"
    size="lg"
    data-cta="contact-submit"
    className="h-auto min-h-12 w-full whitespace-normal py-3 text-center"
    disabled={status === "submitting"}
  >
    <span key={status} data-motion-label>
      {LABELS[status]}
    </span>
  </Button>
);
