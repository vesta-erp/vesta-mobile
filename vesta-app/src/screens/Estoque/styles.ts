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
    },
    cardBorderCritical: {
      borderLeftWidth: 4,
      borderLeftColor: colors.error,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    resourceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    resourceName: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.textPrimary,
    },
    resourceType: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.textSecondary,
      textTransform: 'uppercase',
    },
    criticalBadge: {
      backgroundColor: colors.error + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    criticalText: {
      fontFamily: fonts.bold,
      fontSize: 10,
      color: colors.error,
      textTransform: 'uppercase',
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    metricColumn: {
      alignItems: 'center',
    },
    metricLabel: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    metricValue: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.textPrimary,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    actionButtonIn: {
      backgroundColor: colors.secondary,
    },
    actionButtonOut: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    actionTextIn: {
      fontFamily: fonts.bold,
      color: '#FFFFFF',
      fontSize: 14,
      marginLeft: 4,
    },
    actionTextOut: {
      fontFamily: fonts.bold,
      color: colors.secondary,
      fontSize: 14,
      marginLeft: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    dismissArea: {
      flex: 1,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.textPrimary,
    },
    inputLabel: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 16,
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textPrimary,
      marginBottom: 24,
    },
  });
};