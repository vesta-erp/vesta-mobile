import { StyleSheet } from 'react-native';

export const getStyles = (themeType: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButton: {
      marginRight: 16,
      padding: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 30,
    },
    formContainer: {
      marginBottom: 20,
    },
    buttonWrapper: {
      marginTop: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 15,
      marginRight: 6,
    },
    linkText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
};