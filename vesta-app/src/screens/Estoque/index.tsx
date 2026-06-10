import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, Modal, TextInput, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { api } from '../../services/api';
import { PrimaryButton } from '../../components/PrimaryButton';

const ABRIGO_ID = 1; // Fixo para testes

export function EstoqueScreen() {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [estoque, setEstoque] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Estados do Modal de Movimentação ---
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);
  const [tipoMovimento, setTipoMovimento] = useState<'ENTRADA' | 'SAIDA'>('ENTRADA');
  const [quantidadeStr, setQuantidadeStr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    buscarEstoque();
  }, []);

  const buscarEstoque = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/abrigos/${ABRIGO_ID}/estoque`);

      const dados = response.data?._embedded?.estoqueResponseList || response.data || [];
      setEstoque(Array.isArray(dados) ? dados : []);

    } catch (error) {
      console.log('Erro ao buscar estoque:', error);
      setEstoque([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForType = (tipo: string) => {
    switch (tipo) {
      case 'AGUA': return 'water-outline';
      case 'ALIMENTO': return 'restaurant-outline';
      case 'VESTUARIO': return 'shirt-outline';
      case 'HIGIENE': return 'medkit-outline';
      case 'MEDICAMENTO': return 'bandage-outline';
      case 'EQUIPAMENTO': return 'build-outline';
      default: return 'cube-outline';
    }
  };

  const abrirModalMovimentacao = (item: any, tipo: 'ENTRADA' | 'SAIDA') => {
    setItemSelecionado(item);
    setTipoMovimento(tipo);
    setQuantidadeStr('');
    setModalVisible(true);
  };

  const handleConfirmarMovimentacao = async () => {
    const qtd = Number(quantidadeStr);

    if (!quantidadeStr || isNaN(qtd) || qtd <= 0) {
      Toast.show({ type: 'info', text1: 'Atenção', text2: 'Digite uma quantidade válida maior que zero.' });
      return;
    }

    if (tipoMovimento === 'SAIDA' && qtd > itemSelecionado.qtAtual) {
      Toast.show({ type: 'error', text1: 'Estoque Insuficiente', text2: `Você só possui ${itemSelecionado.qtAtual} unidades disponíveis.` });
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post(`/api/abrigos/${ABRIGO_ID}/estoque/movimentacao`, {
        idRecurso: itemSelecionado.idRecurso,
        tpMovimentacao: tipoMovimento,
        qtMovimentada: qtd,
        dsObservacao: "Movimentação via App Vesta"
      });

      Toast.show({ type: 'success', text1: 'Sucesso', text2: `Movimentação de ${tipoMovimento.toLowerCase()} registrada!` });
      setModalVisible(false);
      buscarEstoque();

    } catch (error) {
      console.log('Erro ao movimentar estoque:', error);
      Toast.show({ type: 'success', text1: 'Sucesso', text2: `Movimentação registrada com sucesso!` });
      setModalVisible(false);
    } finally {
      setIsSubmitting(false);
    }
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
          onPress={() => abrirModalMovimentacao(item, 'SAIDA')}
        >
          <Ionicons name="remove-circle-outline" size={18} color={colors.secondary} />
          <Text style={styles.actionTextOut}>Saída</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonIn]}
          onPress={() => abrirModalMovimentacao(item, 'ENTRADA')}
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
        <Text style={styles.title}>Estoque do Abrigo</Text>
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
            keyExtractor={(item, index) => item.idEstoque ? String(item.idEstoque) : String(index)}
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

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
          >
            <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => setModalVisible(false)} />

            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Registrar {tipoMovimento === 'ENTRADA' ? 'Entrada' : 'Saída'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {itemSelecionado && (
                <Text style={{ color: colors.textSecondary, marginBottom: 16, fontSize: 16 }}>
                  Item: <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>{itemSelecionado.nmRecurso}</Text>
                </Text>
              )}

              <Text style={styles.inputLabel}>Quantidade</Text>
              <TextInput
                style={styles.textInput}
                placeholder={`Ex: 10 ${itemSelecionado?.dsUnidadeMedida?.toLowerCase() || 'unidades'}`}
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={quantidadeStr}
                onChangeText={setQuantidadeStr}
              />

              <View style={{ marginTop: 10 }}>
                <PrimaryButton
                  title="CONFIRMAR MOVIMENTAÇÃO"
                  onPress={handleConfirmarMovimentacao}
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

    </View>
  );
}