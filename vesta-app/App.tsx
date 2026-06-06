import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';

import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend';
import { MozillaHeadline_400Regular, MozillaHeadline_700Bold } from '@expo-google-fonts/mozilla-headline';
import { Asimovian_400Regular } from '@expo-google-fonts/asimovian';

import { theme } from './src/theme'; 
import { Routes } from './src/routes';

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
      <Routes />
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});