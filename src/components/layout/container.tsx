import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Container = ({ className, children, ...props }: ComponentProps<"div">) => (
  <div className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-8", className)} {...props}>
    {children}
  </div>
);
