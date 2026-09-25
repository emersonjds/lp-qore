import { isLegalIdentityComplete } from "@/lib/legal";
import type { LegalIdentity } from "@/types";

interface ControllerIdentityProps {
  legal: LegalIdentity;
}

export const ControllerIdentity = ({ legal }: ControllerIdentityProps) => {
  if (!isLegalIdentityComplete(legal)) {
    return (
      <p>
        Os dados do controlador (razão social, CNPJ e canal do encarregado) serão publicados aqui antes da abertura do
        piloto.
      </p>
    );
  }

  return (
    <dl className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-x-6">
      <dt className="font-medium">Razão social</dt>
      <dd>{legal.companyName}</dd>
      <dt className="font-medium">CNPJ</dt>
      <dd className="tabular-nums">{legal.taxId}</dd>
      <dt className="font-medium">Encarregado de dados</dt>
      <dd>{legal.dataProtectionOfficer}</dd>
      <dt className="font-medium">Contato</dt>
      <dd>
        <a href={`mailto:${legal.contactEmail}`} className="text-primary underline underline-offset-4">
          {legal.contactEmail}
        </a>
      </dd>
    </dl>
  );
};
