import React from "react";
import { theme } from "~/configs/theme/theme.css";

interface ThemeContext {
  currentTheme: string;
  themes: Record<string, string>;
  onThemeChange?: (theme: string) => void;
}

export const ThemeContext = React.createContext<ThemeContext>({
  currentTheme: "default",
  themes: { default: theme },
});
