import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

export function EstoqueScreen() {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [estoque, setEstoque] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    buscarEstoque();
  }, []);

  const buscarEstoque = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/abrigos/${ABRIGO_ID}/estoque`);
      
      const dados = response.data._embedded?.estoqueResponseList || response.data || [];
      setEstoque(Array.isArray(dados) ? dados : []);
      
    } catch (error) {
      console.log('Erro ao buscar estoque:', error);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível carregar o estoque.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForType = (tipo: string) => {
    switch (tipo) {
      case 'AGUA': return 'water-outline';
      case 'ALIMENTO': return 'restaurant-outline';
      case 'ROUPA': return 'shirt-outline';
      case 'HIGIENE': return 'medkit-outline';
      default: return 'cube-outline';
    }
  };

  const handleMovimentacao = (item: any, tipoMovimento: 'ENTRADA' | 'SAIDA') => {
    Alert.prompt(
      `Registrar ${tipoMovimento}`,
      `Quantas unidades de "${item.nmRecurso}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: async (quantidade?: string) => {
            const qtd = Number(quantidade);
            if (!quantidade || isNaN(qtd) || qtd <= 0) {
              Toast.show({ type: 'info', text1: 'Atenção', text2: 'Digite uma quantidade válida maior que zero.' });
              return;
            }

            try {
              await api.post(`/api/abrigos/${ABRIGO_ID}/estoque/movimentacao`, {
                idRecurso: item.idRecurso, tpMovimentacao: tipoMovimento, qtMovimentada: qtd, dsObservacao: "Movimentação via App"
              });

              Toast.show({ type: 'success', text1: 'Movimentação Salva', text2: 'Estoque atualizado com sucesso!' });
              buscarEstoque();

            } catch (error) {
              console.log('Erro ao movimentar estoque:', error);
              Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao registrar a movimentação.' });
            }
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
        <TouchableOpacity onPress={buscarEstoque}>
          <Ionicons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={estoque}
            keyExtractor={(item) => String(item.idEstoque)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 20 }}>
                Nenhum recurso encontrado no estoque.
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}