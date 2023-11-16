import * as styles from "./styles.css";
import React from "react";

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
