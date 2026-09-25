export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logoSrc?: string;
  authorizedAt: string;
}

export const testimonials: readonly Testimonial[] = [];
