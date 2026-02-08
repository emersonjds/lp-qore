import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeatureShowcase } from "@/components/sections/feature-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta-section";
import { Stats } from "@/components/sections/stats";
import { Footer } from "@/components/sections/footer";
import { TrustBadges } from "@/components/sections/trust-badges";
import {
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getFAQSchema,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema()),
        }}
      />
      <Header />
      <TrustBadges />
      <main>
        <Hero />
        <SocialProof />
        <Stats />
        <FeaturesGrid />
        <HowItWorks />
        <FeatureShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
