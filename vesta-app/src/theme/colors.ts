const brandColors = {
  primary: '#4B6B8A',
  secondary: '#7298C2',
  error: '#FF5252',
};

export const theme = {
  light: {
    ...brandColors,
    background: '#E5E5E5',
    surface: '#FFFFFF',
    textPrimary: '#333333',
    textInverse: '#FFFFFF',
    textPlaceholder: '#666666',
    inputBackground: '#A0A0A0',
    tabBar: '#3E5C7A',
    border: '#CCCCCC',
  },
  dark: {
    ...brandColors,
    background: '#121921',
    surface: '#1E2A38',
    textPrimary: '#FFFFFF',
    textInverse: '#333333',
    textPlaceholder: '#A0A0A0',
    inputBackground: '#2A3B4D',
    tabBar: '#0D1319',
    border: '#2A3B4D',
  }
};

export type ThemeColors = typeof theme.light;