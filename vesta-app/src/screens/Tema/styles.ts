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
      fontSize: 20,
      color: '#FFFFFF', // Corrigido para branco puro por estar sobre o fundo azul primary
    },
    content: {
      padding: 24,
    },
    description: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 24,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 1,
    },
    optionCardActive: {
      borderColor: colors.secondary,
      borderWidth: 2,
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    optionText: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.textPrimary,
    },
  });
};