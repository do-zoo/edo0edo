import { createTheme } from "@vanilla-extract/css";
import {
  CARNATION,
  CORAL,
  LAVENDER,
  SHOCKING_PINK,
  SUNSHADE,
} from "~/configs/theme/colors";
import type { ThemeObject } from "~/configs/theme/type";
import { DEFAULT_THEMES } from "~/configs/theme/default-theme";

export const theme = createTheme<ThemeObject>(DEFAULT_THEMES);
