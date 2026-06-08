import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { VestaLogo } from '../../components/VestaLogo';
import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const dashboardData = {
    operador: 'Usuario',
    abrigo: 'Ginásio Central',
    ocupacaoAtual: 105,
    capacidadeMaxima: 120,
    recursosCriticos: 2,
  };

  const taxaOcupacao = (dashboardData.ocupacaoAtual / dashboardData.capacidadeMaxima) * 100;
  const isSuperlotado = taxaOcupacao >= 90;

  return (
    <View style={styles.container}>

      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Bem-vindo,</Text>
          <Text style={styles.userName}>{dashboardData.operador}</Text>
        </View>
        <VestaLogo isDarkTheme={true} variant="reduced" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>

        <Text style={styles.sectionTitle}>{dashboardData.abrigo}</Text>

        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Ionicons name="people-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ocupação / Capacidade</Text>
            <Text style={[styles.cardValue, isSuperlotado && styles.cardValueAlert]}>
              {dashboardData.ocupacaoAtual} <Text style={{ fontSize: 16 }}>/ {dashboardData.capacidadeMaxima}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Ionicons name="warning-outline" size={24} color={colors.error} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Alertas de Estoque</Text>
            <Text style={[styles.cardValue, dashboardData.recursosCriticos > 0 && styles.cardValueAlert]}>
              {dashboardData.recursosCriticos} <Text style={{ fontSize: 16 }}>itens críticos</Text>
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Ações Operacionais</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Acolhimento')}
          >
            <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Acolher</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Familias')}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Saídas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Ocorrencias')}
          >
            <Ionicons name="warning-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Relatar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}