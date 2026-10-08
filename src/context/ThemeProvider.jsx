import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("assetflow_theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("assetflow_theme", theme);
  }, [theme]);

  const animateThemeChange = (nextTheme) => {
    if (nextTheme === theme || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.remove("theme-transitioning");
    // Restart the transition cleanly even when the user toggles again quickly.
    void root.offsetWidth;
    root.classList.add("theme-transitioning");

    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 1450);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      animateThemeChange(nextTheme);
      return nextTheme;
    });
  };

  const setTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      animateThemeChange(newTheme);
      setThemeState(newTheme);
    }
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
