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
      paddingBottom: 60,
      paddingHorizontal: 32,
      paddingTop: 80,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 28,
      color: colors.textPrimary,
    },
    subtitle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      opacity: 0.8,
      marginBottom: 30,
    },
    footer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      flexDirection: 'row',
    },
    footerText: {
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      opacity: 0.8,
    },
    linkText: {
      fontFamily: fonts.bold,
      color: colors.secondary,
      marginLeft: 5,
    },
  });
};