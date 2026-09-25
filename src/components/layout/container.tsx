import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1440px] 2xl:px-12 3xl:max-w-[1680px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
