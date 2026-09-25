import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export const SectionWrapper = ({ className, children, ...props }: ComponentProps<"section">) => (
  <section className={cn("py-16 md:py-24 2xl:py-28", className)} {...props}>
    <Container>{children}</Container>
  </section>
);
