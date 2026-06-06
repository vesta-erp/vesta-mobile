import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function PrimaryButton({ title, isLoading = false, ...rest }: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, rest.disabled && styles.buttonDisabled]} 
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.light.surface} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}