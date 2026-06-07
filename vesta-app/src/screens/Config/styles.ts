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
      paddingBottom: 32,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      elevation: 4,
      alignItems: 'center',
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    userName: {
      fontFamily: fonts.bold,
      fontSize: 22,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    userRole: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.secondary, 
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 120, 
    },
    sectionTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
      marginTop: 8,
      textTransform: 'uppercase',
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 1,
    },
    optionIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    optionText: {
      flex: 1,
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.textPrimary,
    },
    logoutButton: {
      marginTop: 24,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.error, 
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    logoutText: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.error,
      marginLeft: 8,
    }
  });
};