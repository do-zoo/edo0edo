import * as React from "react";
import { useGlobalClassName } from "~/hooks";
import { ThemeContext } from "./theme.context";

export interface ThemeProviderProps {
  /**
   * Your app.
   */
  children: React.ReactNode;
  /**
   * The current theme value. If there is a need to persist the user choice, it needs to be saved externally.
   */
  currentTheme: string;
  /**
   * Map of available themes.
   */
  themes: Record<string, string>;
  /**
   * Callback triggered when something calls `setTheme` from the hook.
   */
  onThemeChange?: (theme: ThemeProviderProps["currentTheme"]) => void;
}

/**
 * Provides the current active theme name and variables to its subtree.
 */
export const ThemeProvider = ({
  children,
  currentTheme,
  themes,
  onThemeChange,
}: ThemeProviderProps) => {
  const classNameMap = React.useMemo(() => {
    return Object.keys(themes).reduce<Record<string, string>>(
      (prev, current) => {
        return {
          ...prev,
          [current]: themes[current],
        };
      },
      {},
    );
  }, [themes]);
  useGlobalClassName(currentTheme, classNameMap);
  const contextValue = React.useMemo(
    () => ({ currentTheme, themes, onThemeChange }),
    [currentTheme, themes, onThemeChange],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
