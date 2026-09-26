import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Without this, tailwind-merge reads the theme type sizes (text-body-md…) as colours and drops text-primary-foreground.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "headline-xl",
        "headline-xl-mobile",
        "headline-lg",
        "headline-lg-mobile",
        "headline-md",
        "headline-sm",
        "title-md",
        "body-lg",
        "body-md",
        "label-md",
        "label-sm",
        "caption",
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
