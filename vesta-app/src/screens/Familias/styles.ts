import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const getStyles = (themeType: 'light' | 'dark') => {
  const colors = theme[themeType];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      elevation: 4,
    },
    backButton: {
      marginRight: 16,
      padding: 4,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 22,
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    listContent: {
      paddingBottom: 40,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderLeftWidth: 4,
      borderLeftColor: colors.secondary,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    responsavelName: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.textPrimary,
      flex: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    infoText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    checkoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.error,
      borderRadius: 8,
      paddingVertical: 10,
    },
    checkoutText: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.error,
      marginLeft: 8,
    }
  });
};