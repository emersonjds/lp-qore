import { SectionWrapper } from "@/components/layout/section-wrapper";
import { documentsContent } from "@/config/documents";
import { mobileScreenshots } from "@/config/screenshots";
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
      <PanelScreenshot device="mobile" sizes="18rem" {...mobileScreenshots.documents} />
    </div>
  </SectionWrapper>
);
