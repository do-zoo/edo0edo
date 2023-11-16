import { createThemeContract } from "@vanilla-extract/css";
import { THEME_CONTRACT } from "~/configs/theme/default-theme";

export const themeVars = createThemeContract(THEME_CONTRACT);
