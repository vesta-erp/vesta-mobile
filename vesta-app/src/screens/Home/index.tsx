import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { VestaLogo } from '../../components/VestaLogo';
import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

export function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets(); 
  
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  // Estados para guardar os dados da API
  const [isLoading, setIsLoading] = useState(true);
  const [operadorNome, setOperadorNome] = useState('Operador');
  const [dadosAbrigo, setDadosAbrigo] = useState({
    nome: 'Carregando...',
    ocupacaoAtual: 0,
    capacidadeMaxima: 0,
  });
  const [recursosCriticos, setRecursosCriticos] = useState(0);

  // Busca os dados assim que a tela abre
  useEffect(() => {
    buscarDadosDashboard();
  }, []);

  const buscarDadosDashboard = async () => {
    try {
      setIsLoading(true);

      // Fazemos as duas requisições ao mesmo tempo para ser mais rápido
      const [resIndicadores, resEstoqueCritico] = await Promise.all([
        api.get(`/api/indicadores/abrigo/${ABRIGO_ID}`),
        api.get(`/api/abrigos/${ABRIGO_ID}/estoque/criticos`)
      ]);

      setDadosAbrigo({
        nome: resIndicadores.data.nmAbrigo,
        ocupacaoAtual: resIndicadores.data.qtOcupacaoAtual,
        capacidadeMaxima: resIndicadores.data.qtCapacidadeMaxima,
      });

      setRecursosCriticos(resEstoqueCritico.data.length);

    } catch (error) {
      console.log('Erro ao buscar dados da Home:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível carregar os dados do abrigo.');
    } finally {
      setIsLoading(false);
    }
  };

  const taxaOcupacao = dadosAbrigo.capacidadeMaxima > 0 
    ? (dadosAbrigo.ocupacaoAtual / dadosAbrigo.capacidadeMaxima) * 100 
    : 0;
  const isSuperlotado = taxaOcupacao >= 90;

  return (
    <View style={styles.container}>
      
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Bem-vindo,</Text>
          <Text style={styles.userName}>{operadorNome}</Text>
        </View>
        <VestaLogo isDarkTheme={true} variant="reduced" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{dadosAbrigo.nome}</Text>
          <TouchableOpacity onPress={buscarDadosDashboard}>
            <Ionicons name="refresh" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.cardIconContainer}>
                <Ionicons name="people-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Ocupação / Capacidade</Text>
                <Text style={[styles.cardValue, isSuperlotado && styles.cardValueAlert]}>
                  {dadosAbrigo.ocupacaoAtual} <Text style={{ fontSize: 16 }}>/ {dadosAbrigo.capacidadeMaxima}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardIconContainer}>
                <Ionicons name="warning-outline" size={24} color={colors.error} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Alertas de Estoque</Text>
                <Text style={[styles.cardValue, recursosCriticos > 0 && styles.cardValueAlert]}>
                  {recursosCriticos} <Text style={{ fontSize: 16 }}>itens críticos</Text>
                </Text>
              </View>
            </View>
          </>
        )}

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