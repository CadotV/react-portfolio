import React, { createContext } from "react";

// TODO: Separate Providers into own files

export const ThemeContext = createContext(null);
export const LangContext = createContext(null);
export const DebugContext = createContext(null);

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  if (hasPersistedPreference) return persistedColorPreference;

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) return mql.matches ? "dark" : "light";

  return "light";
}

function getInitialLangMode() {
  const persistedLangPreference = window.localStorage.getItem("lang-mode");
  const hasPersistedPreference = typeof persistedLangPreference === "string";
  if (hasPersistedPreference) return persistedLangPreference;

  return "fr";
}

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(getInitialColorMode);
  const [langMode, rawSetLangMode] = React.useState(getInitialLangMode);

  const setColorMode = (value) => {
    if (value === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    rawSetColorMode(value);
    window.localStorage.setItem("color-mode", value);
  };

  const setLangMode = (value) => {
    rawSetLangMode(value);
    window.localStorage.setItem("lang-mode", value);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      <LangContext.Provider value={{ langMode, setLangMode }}>
        <DebugContext.Provider value={true}>{children}</DebugContext.Provider>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
};
