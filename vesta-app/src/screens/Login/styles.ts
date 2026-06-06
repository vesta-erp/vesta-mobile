import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: theme.light.surface,
    opacity: 0.8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: theme.light.surface,
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: theme.light.surface,
    opacity: 0.8,
    textAlign: 'right',
    marginTop: -4,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontFamily: fonts.regular,
    color: theme.light.surface,
    opacity: 0.8,
  },
  linkText: {
    fontFamily: fonts.bold,
    color: theme.light.secondary,
    marginLeft: 4,
  },
});