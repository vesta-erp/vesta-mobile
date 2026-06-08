import { StyleSheet } from 'react-native';

export const getStyles = (themeType: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    appName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    appDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
      lineHeight: 24,
    },
    card: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: '600',
    },
    infoValue: {
      fontSize: 16,
    },
    hashContainer: {
      marginTop: 10,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    hashText: {
      fontFamily: 'monospace',
      fontSize: 14,
      fontWeight: 'bold',
    },
    footer: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 30,
    },
    footerText: {
      fontSize: 14,
    }
  });
};