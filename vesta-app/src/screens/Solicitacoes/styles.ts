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
      justifyContent: 'space-between',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      elevation: 4,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 24,
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    listContent: {
      paddingBottom: 100,
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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    resourceName: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.textPrimary,
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginLeft: 8,
    },
    statusText: {
      fontFamily: fonts.bold,
      fontSize: 10,
      color: '#FFFFFF',
      textTransform: 'uppercase',
    },
    cardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    infoGroup: {
      flex: 1,
    },
    infoLabel: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    infoValue: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.textPrimary,
    },
    justificativaBox: {
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 8,
    },
    justificativaText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: colors.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    dismissArea: {
      flex: 1,
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    modalTitle: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.textPrimary,
    },
    inputLabel: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textPrimary,
      marginBottom: 16,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    }
  });
};