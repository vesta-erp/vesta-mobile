const brandColors = {
  primary: '#44556F',
  secondary: '#6699CC',
  error: '#FF5252',
};

const grays = {
  900: '#3C3C3C',
  700: '#515151',
  500: '#666666',
  300: '#8C8C8C',
  100: '#B5B5B5',
  white: '#FFFFFF',
};

export const fonts = {
  regular: 'Lexend_400Regular',
  bold: 'Lexend_700Bold',
  logo: 'MozillaHeadline',
  logoAlt: 'Asimovian',
};

export const theme = {
  light: {
    ...brandColors,
    background: grays[100],
    surface: grays.white,
    textPrimary: grays[900],
    textSecondary: grays[700],
    border: grays[300],
    tabBar: brandColors.primary,
  },
  dark: {
    ...brandColors,
    background: grays[900],
    surface: grays[700],
    textPrimary: grays.white,
    textSecondary: grays[100],
    border: grays[500],
    tabBar: grays[900],
  }
};

export type ThemeColors = typeof theme.light;