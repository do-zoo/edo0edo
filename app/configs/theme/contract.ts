import { createThemeContract } from "@vanilla-extract/css";
import { DEFAULT_THEMES } from "~/configs/theme/default-theme";

export const themeVars = createThemeContract(DEFAULT_THEMES);
