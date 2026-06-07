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
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    greetingContainer: {
      flex: 1,
    },
    greetingText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#FFFFFF',
      opacity: 0.8,
    },
    userName: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    sectionTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.textPrimary,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
    },
    cardValue: {
      fontFamily: fonts.bold,
      fontSize: 24,
      color: colors.textPrimary,
    },
    cardValueAlert: {
      color: colors.error,
    },
    quickActionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    actionButton: {
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    actionButtonText: {
      fontFamily: fonts.bold,
      color: '#FFFFFF',
      fontSize: 14,
      marginTop: 4,
    }
  });
};