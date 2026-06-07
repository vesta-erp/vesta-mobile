import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { useThemeContext } from '../../contexts/ThemeContext';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function PrimaryButton({ title, isLoading = false, ...rest }: PrimaryButtonProps) {
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);

  return (
    <TouchableOpacity 
      style={[styles.button, rest.disabled && styles.buttonDisabled]} 
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}