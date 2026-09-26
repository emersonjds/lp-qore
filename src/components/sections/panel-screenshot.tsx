import { cn } from "@/lib/utils";

type Device = "desktop" | "mobile";

const VARIANTS: Record<Device, { suffix: string; widths: readonly [number, number]; width: number; height: number }> = {
  desktop: { suffix: "", widths: [640, 1280], width: 1280, height: 800 },
  mobile: { suffix: "-mobile", widths: [390, 780], width: 390, height: 844 },
};

interface ScreenshotPictureProps {
  image: string;
  alt: string;
  sizes: string;
  device?: Device;
  loading?: "eager" | "lazy";
  className?: string;
}

export const ScreenshotPicture = ({
  image,
  alt,
  sizes,
  device = "desktop",
  loading = "lazy",
  className,
}: ScreenshotPictureProps) => {
  const { suffix, widths, width, height } = VARIANTS[device];
  const sourceSet = (extension: string) =>
    widths.map((candidate) => `/screenshots/${image}${suffix}-${candidate}.${extension} ${candidate}w`).join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={sourceSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet("webp")} sizes={sizes} />
      <img
        src={`/screenshots/${image}${suffix}-${widths[1]}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={cn("block h-auto w-full", className)}
      />
    </picture>
  );
};

interface PanelScreenshotProps extends ScreenshotPictureProps {
  title: string;
}

export const PanelScreenshot = ({ title, device = "desktop", className, ...pictureProps }: PanelScreenshotProps) => {
  if (device === "mobile") {
    return (
      <figure aria-label={title} className={cn("mx-auto w-full max-w-72", className)}>
        <div className="overflow-hidden rounded-[2rem] border-8 border-slate-900 bg-slate-900 shadow-lg">
          <ScreenshotPicture device="mobile" {...pictureProps} />
        </div>
        <figcaption className="mt-3 text-center text-caption text-muted-foreground">{title}</figcaption>
      </figure>
    );
  }

  return (
    <figure aria-label={title} className={cn("overflow-hidden rounded-lg border border-border bg-card shadow-lg", className)}>
      <figcaption className="flex items-center gap-3 border-b border-border bg-surface-low px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-card px-2 py-0.5 text-caption text-muted-foreground">
          {title}
        </span>
      </figcaption>
      <ScreenshotPicture {...pictureProps} />
    </figure>
  );
};
