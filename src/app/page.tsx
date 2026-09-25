import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PlatformTour } from "@/components/sections/platform-tour";
import { Problem } from "@/components/sections/problem";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <Hero />
    <Problem />
    <HowItWorks />
    <PlatformTour />
  </main>
);

export default HomePage;
