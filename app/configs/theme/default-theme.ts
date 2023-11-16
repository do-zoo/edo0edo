import type { ThemeColor } from "~/configs/theme/colors";
import {
  CARNATION,
  CORAL,
  LAVENDER,
  SHOCKING_PINK,
  SUNSHADE,
} from "~/configs/theme/colors";

export const DEFAULT_THEMES = {
  colors: {
    brand: SHOCKING_PINK,
  },
  gradient: {
    v1: `linear-gradient(90deg, ${LAVENDER["500"]} 11.52%, ${CARNATION["400"]} 41.08%, ${SUNSHADE["300"]} 71.79%, ${CORAL["400"]} 100%)`,
  },
  font: {
    body: "arial",
  },
};

export const THEME_CONTRACT = {
  colors: {
    brand: Object.keys(SHOCKING_PINK).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: "",
      }),
      {} as ThemeColor,
    ),
  },
  gradient: {
    v1: "",
  },
  font: {
    body: "",
  },
};
