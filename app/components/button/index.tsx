import * as styles from "./styles.css";
import React from "react";
import { useThemeProvider } from "~/context"; // Note that `.ts` is omitted here

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={styles.root}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
