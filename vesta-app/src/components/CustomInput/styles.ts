import { StyleSheet } from 'react-native';
import { theme, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light.surface, // Fundo branco para contrastar com o fundo azul
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    height: 55,
    overflow: 'hidden',
  },
  containerFocused: {
    borderColor: theme.light.secondary, // Borda azul clara ao clicar
    shadowColor: theme.light.secondary,
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
    color: theme.light.textPrimary,
    height: 55,
    paddingVertical: 0,
  },
});