import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ControllerIdentity } from "@/components/privacy/controller-identity";
import { privacyContent } from "@/config/privacy";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: privacyContent.title,
  description: privacyContent.description,
  alternates: { canonical: "/privacidade" },
};

const SECTION_TITLE_CLASS = "mt-10 text-headline-sm";
const { purpose, collectedData, legalBasis, retention, rights, controller } = privacyContent.sections;

const PrivacyPage = () => (
  <main id="conteudo" tabIndex={-1} className="pt-28 pb-16">
    <Container className="max-w-3xl text-body-md text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-headline-xl-mobile md:text-headline-xl">{privacyContent.title}</h1>
      <p className="text-muted-foreground">{privacyContent.lastUpdated}</p>

      <h2 className={SECTION_TITLE_CLASS}>{purpose.title}</h2>
      <p>{purpose.text}</p>

      <h2 className={SECTION_TITLE_CLASS}>{collectedData.title}</h2>
      <ul>
        {collectedData.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{collectedData.processor}</p>
      <p>{collectedData.radar}</p>

      <h2 className={SECTION_TITLE_CLASS}>{legalBasis.title}</h2>
      <p>{legalBasis.text}</p>

      <h2 className={SECTION_TITLE_CLASS}>{retention.title}</h2>
      <p>{retention.text}</p>

      <h2 className={SECTION_TITLE_CLASS}>{rights.title}</h2>
      <p>{rights.lead}</p>
      <ul>
        {rights.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{rights.channel}</p>

      <h2 className={SECTION_TITLE_CLASS}>{controller.title}</h2>
      <ControllerIdentity legal={siteConfig.legal} />
    </Container>
  </main>
);

export default PrivacyPage;
