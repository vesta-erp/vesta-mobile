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
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButton: {
      marginRight: 16,
      padding: 4,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 28,
      color: colors.textPrimary,
    },
    subtitle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 24,
      marginBottom: 30,
      opacity: 0.8,
    },
    formContainer: {
      marginBottom: 20,
    },
    buttonWrapper: {
      marginTop: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.textSecondary,
      marginRight: 6,
      opacity: 0.8,
    },
    linkText: {
      fontFamily: fonts.bold,
      fontSize: 15,
      color: colors.secondary,
    },
  });
};