import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextData {
  themeType: ThemeType;
  setThemeType: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setThemeType((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeType, setThemeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}