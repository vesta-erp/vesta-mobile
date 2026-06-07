import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const getStyles = (themeType: 'light' | 'dark') => {
  const colors = theme[themeType];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 32,
      justifyContent: 'center',
      paddingVertical: 40,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    welcomeText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textSecondary,
      opacity: 0.8,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 28,
      color: colors.textPrimary,
      marginBottom: 32,
    },
    forgotPasswordText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      opacity: 0.8,
      textAlign: 'right',
      marginTop: -4,
      marginBottom: 24,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
    },
    footerText: {
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      opacity: 0.8,
    },
    linkText: {
      fontFamily: fonts.bold,
      color: colors.secondary,
      marginLeft: 4,
    },
  });
};