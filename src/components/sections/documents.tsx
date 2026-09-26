import { CircleCheck, Clock, LoaderCircle } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { documentsContent } from "@/config/documents";
import { mobileScreenshots } from "@/config/screenshots";
import { staggerStyle } from "@/lib/stagger-style";
import { cn } from "@/lib/utils";
import { PanelScreenshot } from "./panel-screenshot";

export const Documents = () => (
  <SectionWrapper id="documentos" aria-labelledby="documents-title" className="bg-surface-low">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-label-sm uppercase text-primary">{documentsContent.eyebrow}</p>
        <h2 id="documents-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {documentsContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{documentsContent.description}</p>
      </div>
      <div data-reveal data-certificates className="relative mx-auto w-full max-w-md">
        <PanelScreenshot device="mobile" sizes="18rem" {...mobileScreenshots.documents} />
        <div className="mt-6 sm:absolute sm:bottom-28 sm:-left-4 sm:mt-0 sm:w-64">
          <p className="mb-2 text-caption text-muted-foreground">Exemplo</p>
          <ul aria-label="Exemplo de verificação de certidões" className="flex flex-col gap-2">
            {documentsContent.certificateChecks.map((check, index) => (
              <li
                key={check.name}
                style={staggerStyle(index)}
                className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2.5 shadow-lg ring-1 ring-border"
              >
                <span className="text-label-md font-semibold text-foreground">{check.name}</span>
                <span className="grid justify-items-end text-caption font-semibold">
                  <span
                    aria-hidden="true"
                    data-status-pending
                    className="col-start-1 row-start-1 inline-flex items-center gap-1 rounded-full bg-surface-low px-2 py-0.5 text-muted-foreground"
                  >
                    <LoaderCircle className="size-3.5 animate-spin" />
                    Verificando…
                  </span>
                  <span
                    data-status-final
                    className={cn(
                      "col-start-1 row-start-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                      check.isExpiring ? "bg-warning-tint text-warning-text" : "bg-primary-tint text-primary",
                    )}
                  >
                    {check.isExpiring ? (
                      <Clock aria-hidden="true" className="size-3.5" />
                    ) : (
                      <CircleCheck aria-hidden="true" className="size-3.5" />
                    )}
                    {check.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </SectionWrapper>
);
