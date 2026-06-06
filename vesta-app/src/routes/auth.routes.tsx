import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/Login';
import { CadastroScreen } from '../screens/Cadastro';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Cadastro" component={CadastroScreen} />
    </Navigator>
  );
}