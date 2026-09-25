import type { ReactNode } from "react";
import { FileBadge } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { certificates, documentsContent } from "@/config/documents";
import { cn } from "@/lib/utils";
import type { CertificateStatus } from "@/types";

const STATUS_CHIP_CLASS: Record<CertificateStatus, string> = {
  valid: "bg-primary-tint text-primary",
  expiring: "bg-warning-tint text-warning-text",
  expired: "bg-destructive-tint text-destructive-text",
};

const CertificateList = () => (
  <div className="rounded-lg border border-border bg-card p-4 shadow-lg md:p-6">
    <div className="flex items-center justify-between gap-4 px-2 pb-4">
      <p className="font-display text-title-md text-foreground">{documentsContent.listTitle}</p>
      <Badge variant="outline">Exemplo ilustrativo</Badge>
    </div>
    <ul aria-label={documentsContent.listLabel} className="flex flex-col divide-y divide-border">
      {certificates.map((certificate) => (
        <li key={certificate.name} className="flex items-center gap-3 px-2 py-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-low text-muted-foreground">
            <FileBadge aria-hidden="true" className="size-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span data-certificate-name className="truncate text-label-md font-semibold text-foreground">
              {certificate.name}
            </span>
            <span className="truncate text-caption text-muted-foreground">{certificate.issuer}</span>
          </span>
          <span
            data-certificate-status={certificate.status}
            className={cn(
              "inline-flex h-6 shrink-0 items-center rounded-full px-2 text-label-sm tabular-nums",
              STATUS_CHIP_CLASS[certificate.status],
            )}
          >
            {certificate.statusLabel}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

interface DocumentsProps {
  visual?: ReactNode;
}

export const Documents = ({ visual = <CertificateList /> }: DocumentsProps) => (
  <SectionWrapper id="documentos" aria-labelledby="documents-title" className="bg-surface-low">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-label-sm uppercase text-primary">{documentsContent.eyebrow}</p>
        <h2 id="documents-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {documentsContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{documentsContent.description}</p>
      </div>
      {visual}
    </div>
  </SectionWrapper>
);
