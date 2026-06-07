const brandColors = {
  primary: '#44556F',
  secondary: '#6699CC',
  error: '#FF5252',
};

const grays = {
  900: '#1A1D21', 
  800: '#262A31', 
  700: '#3A4351', 
  500: '#6B7A90', 
  300: '#C2C8D0', 
  100: '#F0F2F5', 
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
    textSecondary: grays[500],
    border: grays[300],
    tabBar: grays.white,
  },
  dark: {
    ...brandColors,
    background: grays[900],
    surface: grays[800],
    textPrimary: grays.white,
    textSecondary: grays[300],
    border: grays[700],
    tabBar: grays[800],
  }
};

export type ThemeColors = typeof theme.light;