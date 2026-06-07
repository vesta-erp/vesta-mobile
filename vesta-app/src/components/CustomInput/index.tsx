import React, { useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { useThemeContext } from '../../contexts/ThemeContext';

interface CustomInputProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function CustomInput({ iconName, isPassword, ...rest }: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  return (
    <View style={[
      styles.container, 
      isFocused && styles.containerFocused
    ]}>
      {iconName && (
        <Ionicons 
          name={iconName} 
          size={20} 
          color={isFocused ? colors.secondary : colors.textSecondary} 
          style={styles.icon}
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
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
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}