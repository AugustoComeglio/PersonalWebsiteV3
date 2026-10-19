import React, { createContext, useState, useEffect, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredOverride() {
  try {
    const val = localStorage.getItem("color-scheme");
    if (val === "dark" || val === "light") return val;
    return null;
  } catch {
    return null;
  }
}

function syncMetaColorScheme(override) {
  if (typeof document === "undefined") return;
  let meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "color-scheme";
    document.head.prepend(meta);
  }
  meta.content = override ?? "light dark";
}

export const ThemeProvider = ({ children }) => {
  const [override, setOverride] = useState(() => getStoredOverride());
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());

  const resolvedTheme = override ?? systemTheme;

  useEffect(() => {
    syncMetaColorScheme(override);
    document.documentElement.dataset.theme = resolvedTheme;
  }, [override, resolvedTheme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (e) => {
      if (e.key === "color-scheme") {
        const next = e.newValue === "dark" || e.newValue === "light" ? e.newValue : null;
        setOverride(next);
        syncMetaColorScheme(next);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    const currentRendered = override ?? getSystemTheme();
    const target = currentRendered === "dark" ? "light" : "dark";
    const currentSystem = getSystemTheme();

    if (target === currentSystem) {
      try {
        localStorage.removeItem("color-scheme");
      } catch {
        // Ignore storage error
      }
      setOverride(null);
      syncMetaColorScheme(null);
    } else {
      try {
        localStorage.setItem("color-scheme", target);
      } catch {
        // Ignore storage error
      }
      setOverride(target);
      syncMetaColorScheme(target);
    }
  }, [override]);

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        override,
        systemTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
