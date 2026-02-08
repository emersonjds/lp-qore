import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionWrapperProps extends React.ComponentProps<"section"> {
  children: React.ReactNode;
}

export function SectionWrapper({
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
