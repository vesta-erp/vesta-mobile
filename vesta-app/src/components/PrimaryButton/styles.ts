import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.light.secondary,
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
    color: theme.light.surface,
  },
});