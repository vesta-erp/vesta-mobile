import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';

// Estrutura Swagger
const MOCK_ESTOQUE = [
  {
    idEstoque: 1,
    idAbrigo: 1,
    idRecurso: 101,
    nmRecurso: "Água Mineral 1L",
    tpRecurso: "AGUA",
    dsUnidadeMedida: "Garrafas",
    qtAtual: 45,
    qtMinima: 100,
    abaixoMinimo: true,
    dtAtualizacao: "2026-06-08T05:10:26.370Z"
  },
  {
    idEstoque: 2,
    idAbrigo: 1,
    idRecurso: 102,
    nmRecurso: "Cestas Básicas",
    tpRecurso: "ALIMENTO",
    dsUnidadeMedida: "Unidades",
    qtAtual: 150,
    qtMinima: 50,
    abaixoMinimo: false,
    dtAtualizacao: "2026-06-08T05:10:26.370Z"
  },
  {
    idEstoque: 3,
    idAbrigo: 1,
    idRecurso: 103,
    nmRecurso: "Cobertores",
    tpRecurso: "ROUPA",
    dsUnidadeMedida: "Peças",
    qtAtual: 20,
    qtMinima: 30,
    abaixoMinimo: true,
    dtAtualizacao: "2026-06-08T05:10:26.370Z"
  }
];

export function EstoqueScreen() {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [estoque, setEstoque] = useState(MOCK_ESTOQUE);

  // Ícone dinâmico baseado no tipo do recurso
  const getIconForType = (tipo: string) => {
    switch (tipo) {
      case 'AGUA': return 'water-outline';
      case 'ALIMENTO': return 'restaurant-outline';
      case 'ROUPA': return 'shirt-outline';
      case 'HIGIENE': return 'medkit-outline';
      default: return 'cube-outline';
    }
  };

  // Futuramente, esses botões vão chamar o POST de Movimentação da API
  const handleMovimentacao = (item: any, tipoMovimento: 'ENTRADA' | 'SAIDA') => {
    Alert.prompt(
      `Registrar ${tipoMovimento}`,
      `Quantas unidades de "${item.nmRecurso}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: (quantidade?: string) => {
            console.log(`Payload pra API: { idRecurso: ${item.idRecurso}, tpMovimentacao: '${tipoMovimento}', qtMovimentada: ${quantidade} }`);
            Alert.alert('Sucesso', 'Movimentação registrada localmente para teste!');
          } 
        }
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, item.abaixoMinimo && styles.cardBorderCritical]}>
      
      <View style={styles.cardHeader}>
        <View style={styles.resourceInfo}>
          <View style={styles.iconContainer}>
            <Ionicons name={getIconForType(item.tpRecurso)} size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.resourceName}>{item.nmRecurso}</Text>
            <Text style={styles.resourceType}>{item.tpRecurso}</Text>
          </View>
        </View>
        
        {item.abaixoMinimo && (
          <View style={styles.criticalBadge}>
            <Text style={styles.criticalText}>CRÍTICO</Text>
          </View>
        )}
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Qtd Atual</Text>
          <Text style={[styles.metricValue, item.abaixoMinimo && { color: colors.error }]}>
            {item.qtAtual}
          </Text>
        </View>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Qtd Mínima</Text>
          <Text style={styles.metricValue}>{item.qtMinima}</Text>
        </View>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Unidade</Text>
          <Text style={styles.metricValue}>{item.dsUnidadeMedida}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonOut]} 
          onPress={() => handleMovimentacao(item, 'SAIDA')}
        >
          <Ionicons name="remove-circle-outline" size={18} color={colors.secondary} />
          <Text style={styles.actionTextOut}>Saída</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonIn]} 
          onPress={() => handleMovimentacao(item, 'ENTRADA')}
        >
          <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.actionTextIn}>Entrada</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Estoque</Text>
        <Ionicons name="swap-horizontal" size={28} color="#FFFFFF" />
      </View>

      <View style={styles.content}>
        <FlatList
          data={estoque}
          keyExtractor={(item) => String(item.idEstoque)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}