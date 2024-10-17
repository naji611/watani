import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light"); // Default to light

  // Function to toggle between themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,

    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
