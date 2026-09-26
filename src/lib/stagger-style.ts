import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & Record<"--order", number>;

export const staggerStyle = (order: number): StaggerStyle => ({ "--order": order });
