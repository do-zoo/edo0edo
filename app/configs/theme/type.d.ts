import type { ThemeColor } from "~/configs/theme/colors/type";

export type ThemeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ThemeNumberSize = ThemeSize | number | string;

export interface BaseThemeObject {
  colors: Record<string, ThemeColor>;
  spacing?: Record<ThemeSize | string, string | number>;
  font: Record<string, string>;
  // fontSize: Record<ThemeSize | string, string | number>;
}

export type Tokens = {
  [key: string]: string | Tokens;
};

export type ThemeObject = BaseThemeObject & Tokens;
