import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend';
import { MozillaHeadline_400Regular, MozillaHeadline_700Bold } from '@expo-google-fonts/mozilla-headline';
import { Asimovian_400Regular } from '@expo-google-fonts/asimovian';

import { theme } from './src/theme'; 

export default function App() {

  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    MozillaHeadline_400Regular,
    MozillaHeadline_700Bold,
    Asimovian_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.light.background }]}>
        <ActivityIndicator size="large" color={theme.light.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      
      <View style={[styles.container, { backgroundColor: theme.light.background }]}>
        <Text style={[styles.title, { color: theme.light.primary }]}>
          VESTA
        </Text>
        <Text style={[styles.subtitle, { color: theme.light.textPrimary }]}>
          Plataforma de Gestão Operacional
        </Text>
      </View>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'MozillaHeadline_700Bold',
    fontSize: 48,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 16,
  }
});