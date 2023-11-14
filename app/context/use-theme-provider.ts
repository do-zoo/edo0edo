import { useContext } from "react";
import { ThemeContext } from "~/context/theme.context";

export function useThemeProvider() {
  const { themes, currentTheme } = useContext(ThemeContext);
  return themes[currentTheme][1];
}
