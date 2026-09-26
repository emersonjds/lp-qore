import { Check, ClipboardCheck, SearchX } from "lucide-react";
import { auditExample } from "@/config/home-content";
import { staggerStyle } from "@/lib/stagger-style";

const excerptCharacters = [...auditExample.excerpt];

export const AuditCard = () => (
  <figure
    data-reveal
    data-audit-card
    aria-label={auditExample.label}
    className="rounded-xl bg-card p-6 shadow-md ring-1 ring-primary-tint-strong/60"
  >
    <div className="mb-4 flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ClipboardCheck aria-hidden="true" className="size-5" />
      </span>
      <div>
        <p className="font-display text-title-md text-foreground">{auditExample.title}</p>
        <p className="text-caption text-muted-foreground">{auditExample.caption}</p>
      </div>
    </div>
    <ul className="flex flex-col gap-3 text-caption">
      <li className="flex items-start gap-2 rounded-lg bg-surface-low p-3">
        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{auditExample.excerptLabel}</p>
          <p className="text-muted-foreground italic">
            <span className="sr-only">{auditExample.excerpt}</span>
            <span aria-hidden="true">
              {excerptCharacters.map((character, index) => (
                <span key={index} data-typed-char style={staggerStyle(index)}>
                  {character}
                </span>
              ))}
            </span>
          </p>
          <p
            data-source-chip
            style={staggerStyle(excerptCharacters.length)}
            className="mt-1.5 inline-block rounded bg-primary-fixed/50 px-1.5 py-0.5 font-mono text-[11px] text-primary-deep"
          >
            {auditExample.source}
          </p>
        </div>
      </li>
      <li className="flex items-start gap-2 rounded-lg bg-surface-low p-3">
        <SearchX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning-text" />
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{auditExample.missingLabel}</p>
          <p className="text-muted-foreground">{auditExample.missingText}</p>
          <p className="mt-1.5 inline-block rounded bg-warning-tint px-1.5 py-0.5 text-[11px] font-semibold text-warning-text">
            {auditExample.missingAction}
          </p>
        </div>
      </li>
    </ul>
    <figcaption className="mt-4 text-right text-caption text-muted-foreground">Exemplo ilustrativo</figcaption>
  </figure>
);
