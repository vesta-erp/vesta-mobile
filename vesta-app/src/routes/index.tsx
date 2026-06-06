import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { theme } from '../theme';

export function Routes() {
  // Simulando um usuário não logado. 
  // Futuramente isso virá de um Contexto (AuthContext)
  const user = null; 

  return (
    <View style={styles.container}>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.background,
  }
});