import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function ConfigScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [nomeCompleto, setNomeCompleto] = useState('Carregando...');
  const [emailUsuario, setEmailUsuario] = useState('Carregando...');

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('@Vesta:user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          
          setNomeCompleto(userData.nome || 'Operador Vesta');
          setEmailUsuario(userData.email || 'email@vesta.gov.br');
        }
      } catch (error) {
        console.log('Erro ao ler AsyncStorage na Config:', error);
      }
    };

    carregarUsuario();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja desconectar do sistema Vesta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@Vesta:token');
            await AsyncStorage.removeItem('@Vesta:user');
            
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
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
        <Text style={styles.userName}>{nomeCompleto}</Text>
        <Text style={styles.userRole}>{emailUsuario}</Text>
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
        <OptionItem icon="information-circle-outline" title="Sobre o App" onPress={() => navigation.navigate('Sobre')} />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}