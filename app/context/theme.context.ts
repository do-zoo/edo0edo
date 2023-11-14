import React from "react";
import type { ThemeObject } from "~/configs/theme/type";
import type { CSSVarFunction, MapLeafNodes } from "@vanilla-extract/private";
import { theme } from "~/configs/theme";

interface ThemeContext {
  currentTheme: string;
  themes: Record<
    string,
    [className: string, vars: MapLeafNodes<ThemeObject, CSSVarFunction>]
  >;
  onThemeChange?: (theme: string) => void;
}

export const ThemeContext = React.createContext<ThemeContext>({
  currentTheme: "default",
  themes: { default: theme },
});
