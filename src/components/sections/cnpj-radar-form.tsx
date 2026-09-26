"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accessibleLabels } from "@/config/accessible-labels";
import { cnpjRadarCopy } from "@/config/cnpj-radar";
import { formatCnpj, isValidCnpj } from "@/lib/cnpj";
import {
  RADAR_FORM_NAME,
  encodeRadarLead,
  runRadar,
  validateRadarLead,
  type RadarLeadErrors,
  type RadarLeadValues,
  type RadarResult,
} from "@/lib/cnpj-radar";
import { postNetlifyForm } from "@/lib/contact-form";

type FoundResult = Extract<RadarResult, { status: "found" }>;
type LeadStatus = "idle" | "submitting" | "success" | "error";

const PREVIEW_LIMIT = 3;
const LEAD_FIELDS = ["name", "email", "cnpj", "companyName", "activity", "matchCount", "consent", "bot-field"] as const;
const INITIAL_LEAD: RadarLeadValues = { name: "", email: "", consent: false };
const closingDateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });
const totalFormat = new Intl.NumberFormat("pt-BR");

const formatClosingDate = (closesAt: string): string => {
  const date = new Date(closesAt);
  return Number.isNaN(date.getTime()) ? "" : closingDateFormat.format(date);
};

const NetlifyDetectionForm = () => (
  <form name={RADAR_FORM_NAME} data-netlify="true" netlify-honeypot="bot-field" hidden>
    {LEAD_FIELDS.map((field) => (
      <input key={field} name={field} type="hidden" />
    ))}
  </form>
);

interface LeadGateProps {
  cnpj: string;
  result: FoundResult;
}

const LeadGate = ({ cnpj, result }: LeadGateProps) => {
  const [values, setValues] = useState<RadarLeadValues>(INITIAL_LEAD);
  const [errors, setErrors] = useState<RadarLeadErrors>({});
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRadarLead(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    const isSent = await postNetlifyForm(
      encodeRadarLead({
        name: values.name,
        email: values.email,
        cnpj,
        companyName: result.company.name,
        activity: result.company.activity,
        matchCount: result.matches.length,
      }),
    );
    setStatus(isSent ? "success" : "error");
    setFeedback(isSent ? cnpjRadarCopy.success(values.name) : cnpjRadarCopy.submitError);
  };

  const errorId = (field: keyof RadarLeadValues) => (errors[field] ? `radar-${field}-error` : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-border pt-6">
      <div>
        <h4 className="text-title-md text-foreground">{cnpjRadarCopy.gateTitle}</h4>
        <p className="mt-1 text-body-md text-muted-foreground">{cnpjRadarCopy.gateDescription}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(["name", "email"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label htmlFor={`radar-${field}`} className="text-label-md text-foreground">
              {cnpjRadarCopy.labels[field]}
            </label>
            <Input
              id={`radar-${field}`}
              type={field === "email" ? "email" : "text"}
              autoComplete={field}
              value={values[field]}
              onChange={(event) => {
                const { value } = event.target;
                setValues((current) => ({ ...current, [field]: value }));
              }}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errorId(field)}
            />
            {errors[field] && (
              <p id={errorId(field)} className="text-caption text-destructive-text">
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            id="radar-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setValues((current) => ({ ...current, consent: isChecked }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errorId("consent")}
            className="mt-3 size-5 shrink-0 accent-primary"
          />
          <label htmlFor="radar-consent" className="flex min-h-11 items-center text-label-md text-foreground">
            <span>
              {cnpjRadarCopy.consentLead}{" "}
              <a href="/privacidade" className="font-medium text-primary underline underline-offset-4">
                {cnpjRadarCopy.privacyPolicyLabel}
              </a>
              .
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id={errorId("consent")} className="text-caption text-destructive-text">
            {errors.consent}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        data-cta="radar-lead-submit"
        disabled={status === "submitting" || status === "success"}
        className="h-auto min-h-12 w-full whitespace-normal py-3"
      >
        {status === "submitting" ? cnpjRadarCopy.submit.submitting : cnpjRadarCopy.submit.idle}
      </Button>
      <p role="status" aria-live="polite" className="min-h-6 text-body-md text-foreground">
        {feedback}
      </p>
    </form>
  );
};

const RadarResultPanel = ({ cnpj, result }: LeadGateProps) => (
  <section aria-labelledby="radar-company" className="flex flex-col gap-5 rounded-xl bg-card p-6 shadow-md sm:p-8">
    <div>
      <h3 id="radar-company" className="text-headline-sm text-foreground">
        {result.company.name}
      </h3>
      <p className="mt-1 text-body-md text-muted-foreground">{result.company.activity}</p>
    </div>
    {result.openInState !== null && (
      <p className="text-body-md text-foreground">
        {cnpjRadarCopy.openInState(totalFormat.format(result.openInState))}
      </p>
    )}
    {result.matches.length > 0 ? (
      <div className="flex flex-col gap-3">
        <p className="text-title-md text-primary">{cnpjRadarCopy.matches(result.matches.length)}</p>
        <ul aria-label={accessibleLabels.radarPreview} className="flex flex-col gap-3">
          {result.matches.slice(0, PREVIEW_LIMIT).map((tender) => (
            <li key={`${tender.agency}-${tender.object}-${tender.closesAt}`} className="rounded-lg bg-surface-low p-4">
              <p className="line-clamp-2 text-body-md text-foreground">{tender.object}</p>
              <p className="mt-1 text-caption text-muted-foreground">
                {[tender.agency, tender.city].filter(Boolean).join(" · ")}
                {formatClosingDate(tender.closesAt) && ` · ${cnpjRadarCopy.closesAt} ${formatClosingDate(tender.closesAt)}`}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-caption text-muted-foreground">{cnpjRadarCopy.sampleNote}</p>
      </div>
    ) : (
      <p className="text-body-md text-foreground">{cnpjRadarCopy.noMatch}</p>
    )}
    <LeadGate cnpj={cnpj} result={result} />
  </section>
);

export const CnpjRadarForm = () => {
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<FoundResult | null>(null);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidCnpj(cnpj)) {
      setError(cnpjRadarCopy.invalidCnpj);
      return;
    }
    setError("");
    setResult(null);
    setIsSearching(true);
    const radar = await runRadar(cnpj);
    setIsSearching(false);
    if (radar.status === "error") {
      setError(radar.message);
      return;
    }
    setResult(radar);
  };

  return (
    <div className="flex flex-col gap-6">
      <NetlifyDetectionForm />
      <form noValidate onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="radar-cnpj" className="text-label-md text-foreground">
            {cnpjRadarCopy.cnpjLabel}
          </label>
          <Input
            id="radar-cnpj"
            inputMode="numeric"
            autoComplete="off"
            placeholder={cnpjRadarCopy.cnpjPlaceholder}
            value={cnpj}
            onChange={(event) => setCnpj(formatCnpj(event.target.value))}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "radar-cnpj-error" : undefined}
          />
          <p id="radar-cnpj-error" role="alert" className="min-h-5 text-caption text-destructive-text">
            {error}
          </p>
        </div>
        <Button type="submit" size="lg" data-cta="radar-search" disabled={isSearching} className="sm:mt-7">
          {isSearching ? cnpjRadarCopy.search.searching : cnpjRadarCopy.search.idle}
        </Button>
      </form>
      {result && <RadarResultPanel key={cnpj} cnpj={cnpj} result={result} />}
    </div>
  );
};
