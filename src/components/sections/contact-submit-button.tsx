import { Button } from "@/components/ui/button";
import { contactFormCopy } from "@/config/contact-form";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

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
      {contactFormCopy.submit[status]}
    </span>
  </Button>
);
