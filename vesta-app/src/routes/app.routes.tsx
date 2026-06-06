import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

import { LoginScreen } from '../screens/Login';
// import { HomeScreen } from '../screens/Home';
// import { SolicitacoesScreen } from '../screens/Solicitacoes';
// import { EstoqueScreen } from '../screens/Estoque';
// import { ConfigScreen } from '../screens/Config';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão
        tabBarShowLabel: false, // Esconde o texto abaixo do ícone (como no seu Figma)
        tabBarStyle: {
          backgroundColor: theme.light.tabBar,
          borderTopWidth: 0, // Remove a linha feia no topo da barra
          elevation: 0, // Remove a sombra no Android
          height: 60,
        },
        tabBarActiveTintColor: theme.light.surface, // Cor do ícone ativo (Branco)
        tabBarInactiveTintColor: theme.light.border, // Cor do ícone inativo (Cinza)
      }}
    >
      <Screen 
        name="Home" 
        component={LoginScreen} // HomeScreen depois
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Screen 
        name="Solicitacoes" 
        component={LoginScreen} // SolicitacoesScreen depois
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} />
          )
        }}
      />
      <Screen 
        name="Estoque" 
        component={LoginScreen} // EstoqueScreen depois
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          )
        }}
      />
      <Screen 
        name="Config" 
        component={LoginScreen} // ConfigScreen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          )
        }}
      />
    </Navigator>
  );
}