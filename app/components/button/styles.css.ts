import { style } from "@vanilla-extract/css";
import { themeVars } from "~/configs/theme/contract.css";

export const root = style({
  border: "solid 1px",
  background: themeVars.colors.brand?.["50"],
  color: "#454545",
});
