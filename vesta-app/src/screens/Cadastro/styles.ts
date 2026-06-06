import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 60,
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: theme.light.surface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: theme.light.surface,
    opacity: 0.8,
    marginBottom: 30,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  footerText: {
    fontFamily: fonts.regular,
    color: theme.light.surface,
    opacity: 0.8,
  },
  linkText: {
    fontFamily: fonts.bold,
    color: theme.light.secondary,
    marginLeft: 5,
  },
});