import { useEffect, useState } from "react";
import {
  applyTheme,
  getSavedTheme,
  toggleTheme as switchTheme,
} from "../utils/theme";

export function useTheme() {
  const [theme, setTheme] = useState(getSavedTheme);
  useEffect(() => applyTheme(theme), [theme]);
  return {
    theme,
    toggleTheme: () => setTheme((current) => switchTheme(current)),
    setTheme,
  };
}
