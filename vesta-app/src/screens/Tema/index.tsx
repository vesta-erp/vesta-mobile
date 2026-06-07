import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';

export function TemaScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  
  const { themeType, setThemeType } = useThemeContext(); 
  
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const ThemeOption = ({ title, icon, type }: any) => {
    const isActive = themeType === type;

    return (
      <TouchableOpacity 
        style={[styles.optionCard, isActive && styles.optionCardActive]} 
        onPress={() => setThemeType(type)}
        activeOpacity={0.8}
      >
        <View style={styles.optionLeft}>
          <View style={styles.optionIcon}>
            <Ionicons name={icon} size={20} color={isActive ? colors.secondary : colors.textSecondary} />
          </View>
          <Text style={styles.optionText}>{title}</Text>
        </View>
        
        {isActive && (
          <Ionicons name="checkmark-circle" size={24} color={colors.secondary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          {/* Corrigido para branco puro por estar sobre o fundo azul primary */}
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Aparência</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Escolha como o Vesta deve ser exibido no seu dispositivo.
        </Text>

        <ThemeOption title="Tema Claro" icon="sunny" type="light" />
        <ThemeOption title="Tema Escuro" icon="moon" type="dark" />
      </View>

    </View>
  );
}