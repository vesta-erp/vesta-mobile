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
      flexGrow: 1,
      padding: 24,
      paddingBottom: 60,
    },
    sectionTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.textPrimary,
      marginBottom: 16,
      marginTop: 8,
    },
    cardForm: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    memberList: {
      marginBottom: 16,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.secondary,
    },
    memberName: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.textPrimary,
    },
    memberDoc: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.textSecondary,
    },
    removeButton: {
      padding: 8,
    },
    addMemberButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 8,
      paddingVertical: 12,
      marginTop: 8,
    },
    addMemberText: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.secondary,
      marginLeft: 8,
    },
    inputLabel: {
      fontFamily: fonts.bold,
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 6,
      textTransform: 'uppercase',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    col: {
      flex: 1,
      marginRight: 8,
    },
    colLast: {
      flex: 1,
    }
  });
};