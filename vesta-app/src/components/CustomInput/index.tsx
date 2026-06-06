import React, { useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function CustomInput({ iconName, isPassword, ...rest }: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[
      styles.container, 
      isFocused && styles.containerFocused // Aplica estilo de foco
    ]}>
      {iconName && (
        <Ionicons 
          name={iconName} 
          size={20} 
          color={isFocused ? theme.light.secondary : theme.light.textSecondary} 
          style={styles.icon}
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.light.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword && !isPasswordVisible}
        {...rest}
      />

      {isPassword && (
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons 
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
            size={20} 
            color={theme.light.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}