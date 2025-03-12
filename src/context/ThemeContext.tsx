
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type FontSize = "small" | "medium" | "large";
type AccentColor = "blue" | "green" | "purple" | "orange" | "pink";

interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
  setAccentColor: (color: AccentColor) => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  fontSize: "medium",
  accentColor: "blue",
  toggleTheme: () => {},
  setFontSize: () => {},
  setAccentColor: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme;
    // Check for system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return storedTheme || (prefersDark ? "dark" : "light");
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const storedFontSize = localStorage.getItem("fontSize") as FontSize;
    return storedFontSize || "medium";
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const storedAccentColor = localStorage.getItem("accentColor") as AccentColor;
    return storedAccentColor || "blue";
  });

  useEffect(() => {
    // Update the localStorage and document class when theme changes
    localStorage.setItem("theme", theme);
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Save font size preference to localStorage
    localStorage.setItem("fontSize", fontSize);
    
    // Apply font size to root element
    const root = window.document.documentElement;
    root.classList.remove("text-small", "text-medium", "text-large");
    root.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    // Save accent color preference to localStorage
    localStorage.setItem("accentColor", accentColor);
    
    // Apply accent color to root element
    const root = window.document.documentElement;
    root.classList.remove("accent-blue", "accent-green", "accent-purple", "accent-orange", "accent-pink");
    root.classList.add(`accent-${accentColor}`);
    
    // Set corresponding CSS variables
    let primaryColor = "";
    switch (accentColor) {
      case "blue":
        primaryColor = "221 70% 60%"; // Default blue
        break;
      case "green":
        primaryColor = "142 70% 45%";
        break;
      case "purple":
        primaryColor = "270 70% 60%";
        break;
      case "orange":
        primaryColor = "32 95% 60%";
        break;
      case "pink":
        primaryColor = "330 85% 60%";
        break;
    }
    
    root.style.setProperty("--primary", primaryColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleSetFontSize = (size: FontSize) => {
    setFontSize(size);
  };

  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        fontSize, 
        accentColor, 
        toggleTheme, 
        setFontSize: handleSetFontSize, 
        setAccentColor: handleSetAccentColor 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
