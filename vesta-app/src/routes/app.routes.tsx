import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../theme';
import { useThemeContext } from '../contexts/ThemeContext'; 

import { LoginScreen } from '../screens/Login';
import { HomeScreen } from '../screens/Home';
import { ConfigScreen } from '../screens/Config';
import { TemaScreen } from '../screens/Tema';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  const insets = useSafeAreaInsets(); 
  
  const { themeType } = useThemeContext();
  const colors = theme[themeType];
  
  const styles = getStyles(themeType);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: 40 + insets.bottom, 
          paddingBottom: insets.bottom, 
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconWrapper : styles.inactiveIconWrapper}>
              <Ionicons name={focused ? "home" : "home-outline"} color={focused ? '#FFFFFF' : colors.textSecondary} size={26} />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Solicitacoes" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconWrapper : styles.inactiveIconWrapper}>
              <Ionicons name={focused ? "git-network" : "git-network-outline"} color={focused ? '#FFFFFF' : colors.textSecondary} size={26} />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Estoque" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconWrapper : styles.inactiveIconWrapper}>
              <Ionicons name={focused ? "swap-horizontal" : "swap-horizontal-outline"} color={focused ? '#FFFFFF' : colors.textSecondary} size={28} />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Config" 
        component={ConfigScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconWrapper : styles.inactiveIconWrapper}>
              <Ionicons name={focused ? "person" : "person-outline"} color={focused ? '#FFFFFF' : colors.textSecondary} size={26} />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabRoutes} />
      <Stack.Screen name="Tema" component={TemaScreen} />
    </Stack.Navigator>
  );
}

const getStyles = (themeType: 'light' | 'dark') => {
  const colors = theme[themeType];

  return StyleSheet.create({
    inactiveIconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    activeIconWrapper: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary, 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -30, 
      borderWidth: 6,
      borderColor: colors.background, 
      elevation: 5,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    }
  });
};