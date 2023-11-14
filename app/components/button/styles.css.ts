import { style } from "@vanilla-extract/css";
import { themeVars } from "~/configs/theme";

export const root = style({
  border: "solid 1px",
  background: themeVars.colors.brand["50"],
  color: "#454545",
});
