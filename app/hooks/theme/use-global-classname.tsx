import * as React from "react";

export const useGlobalClassName = (
  currentTheme: string,
  classNameMap: Record<string, string>,
) => {
  React.useEffect(() => {
    const currentClassName = classNameMap[currentTheme];

    if (!document.documentElement.classList.contains(currentClassName)) {
      const allThemeClasses = Object.values(classNameMap);
      document.documentElement.classList.remove(...allThemeClasses);
      document.documentElement.classList.add(currentClassName);
    }
  }, [currentTheme, classNameMap]);
};
