import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF } from "@/config/navigation";

interface CtaBannerProps {
  location: string;
  title: string;
  source: string;
  actionLabel: string;
}

export const CtaBanner = ({ location, title, source, actionLabel }: CtaBannerProps) => {
  const titleId = `cta-${location}-title`;

  return (
    <section aria-labelledby={titleId} className="py-8 md:py-12">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-xl bg-foreground p-8 text-background md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <h2 id={titleId} className="text-headline-lg-mobile md:text-headline-lg">
              {title}
            </h2>
            <p className="mt-3 text-caption text-background/80">{source}</p>
          </div>
          <Button asChild size="lg" className="h-auto min-h-12 w-full shrink-0 whitespace-normal py-3 text-center md:w-auto">
            <a href={CONTACT_HREF} data-cta={location}>
              {actionLabel}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};
