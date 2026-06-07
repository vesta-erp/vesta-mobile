import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function ConfigScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja desconectar do sistema Vesta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            console.log('Usuário deslogado!');
          } 
        }
      ]
    );
  };

  const OptionItem = ({ icon, title, color = colors.primary, onPress }: any) => (
    <TouchableOpacity style={styles.optionCard} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.optionIconContainer}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.optionText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color={colors.primary} />
        </View>
        <Text style={styles.userName}>Kauã Silva</Text>
        <Text style={styles.userRole}>Operador de Abrigo - ID: 4920</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Preferências</Text>
        <OptionItem icon="person-outline" title="Editar Perfil" />
        <OptionItem icon="notifications-outline" title="Notificações" />
        <OptionItem icon="color-palette-outline" title="Aparência (Tema)" onPress={() => navigation.navigate('Tema')} />

        <Text style={styles.sectionTitle}>Suporte</Text>
        <OptionItem icon="help-buoy-outline" title="Central de Ajuda" />
        <OptionItem icon="document-text-outline" title="Termos de Uso" />
        <OptionItem icon="shield-checkmark-outline" title="Privacidade" />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}