import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const getStyles = (themeType: 'light' | 'dark') => {
  const colors = theme[themeType];

  return StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: 'transparent',
      paddingHorizontal: 16,
      height: 55,
      overflow: 'hidden',
    },
    containerFocused: {
      borderColor: colors.secondary,
      shadowColor: colors.secondary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    icon: {
      marginRight: 12,
    },
    eyeIcon: {
      padding: 8,
    },
    input: {
      flex: 1,
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textPrimary,
      height: 55,
      paddingVertical: 0,
    },
  });
};