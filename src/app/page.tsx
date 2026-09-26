import { Audience } from "@/components/sections/audience";
import { CnpjRadar } from "@/components/sections/cnpj-radar";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { MobileCtaBar } from "@/components/sections/mobile-cta-bar";
import { PlatformTour } from "@/components/sections/platform-tour";
import { faqItems } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { buildStructuredData, serializeJsonLd } from "@/lib/structured-data";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(
          buildStructuredData({
            siteName: siteConfig.name,
            siteUrl: siteConfig.url,
            description: siteConfig.description,
            faqItems,
          }),
        ),
      }}
    />
    <Hero />
    <CnpjRadar />
    <HowItWorks />
    <PlatformTour />
    <Audience />
    <Faq />
    <Contact />
    <MobileCtaBar />
  </main>
);

export default HomePage;
