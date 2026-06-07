import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const getStyles = (themeType: 'light' | 'dark') => {
  const colors = theme[themeType];

  return StyleSheet.create({
    button: {
      backgroundColor: colors.secondary,
      borderRadius: 8,
      width: '100%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 24,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: '#FFFFFF',
    },
  });
};