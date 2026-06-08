import React from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { theme } from '../theme';

export function Routes() {
  return (
    <>
      <AppRoutes />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.background,
  }
});