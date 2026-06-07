import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextData {
  themeType: ThemeType;
  setThemeType: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  return (
    <ThemeContext.Provider value={{ themeType, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}