import { createTheme } from "@vanilla-extract/css";
import { DEFAULT_THEMES } from "~/configs/theme/default-theme";
import { themeVars } from "~/configs/theme/contract.css";

export const theme = createTheme(themeVars, DEFAULT_THEMES);
