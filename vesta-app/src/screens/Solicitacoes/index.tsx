import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal,
  TextInput, Alert, Platform, ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PrimaryButton } from '../../components/PrimaryButton';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

export function SolicitacoesScreen() {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [recursoId, setRecursoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [justificativa, setJustificativa] = useState('');

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  const buscarSolicitacoes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/abrigos/${ABRIGO_ID}/solicitacoes`);
      const dados = response.data._embedded?.solicitacaoResponseList || response.data || [];

      const ordenados = (Array.isArray(dados) ? dados : []).sort((a: any, b: any) =>
        new Date(b.dtSolicitacao).getTime() - new Date(a.dtSolicitacao).getTime()
      );

      setSolicitacoes(ordenados);
    } catch (error) {
      console.log('Erro ao buscar solicitações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ABERTA': return colors.error;
      case 'EM_ATENDIMENTO': return colors.secondary;
      case 'CONCLUIDA': return '#4CAF50';
      default: return colors.textSecondary;
    }
  };

  const formatData = (isoString: string) => {
    if (!isoString) return '--/--';
    const data = new Date(isoString);
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const handleNovaSolicitacao = async () => {
    if (!recursoId || !quantidade || !justificativa) {
      Toast.show({ type: 'info', text1: 'Atenção', text2: 'Preencha todos os campos da solicitação.' });
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post(`/api/abrigos/${ABRIGO_ID}/solicitacoes`, {
        idRecurso: Number(recursoId), qtSolicitada: Number(quantidade), dsJustificativa: justificativa
      });

      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Solicitação enviada para a central!' });
      setModalVisible(false);
      setRecursoId(''); setQuantidade(''); setJustificativa('');
      buscarSolicitacoes();

    } catch (error) {
      console.log('Erro ao criar solicitação:', error);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao enviar a solicitação.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.resourceName}>{item.nmRecurso}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.stStatus) }]}>
          <Text style={styles.statusText}>{item.stStatus?.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>Qtd</Text>
          <Text style={styles.infoValue}>{item.qtSolicitada}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>Data</Text>
          <Text style={styles.infoValue}>{formatData(item.dtSolicitacao)}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>#{item.idSolicitacao}</Text>
        </View>
      </View>

      <View style={styles.justificativaBox}>
        <Text style={styles.justificativaText}>"{item.dsJustificativa}"</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Solicitações</Text>
        <TouchableOpacity onPress={buscarSolicitacoes}>
          <Ionicons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={solicitacoes}
            keyExtractor={(item) => String(item.idSolicitacao)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.textSecondary }}>Nenhuma solicitação encontrada.</Text>}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 20 : 40} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => setModalVisible(false)} />

            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nova Solicitação</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>ID do Recurso</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: 1, 2, 3..."
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={recursoId}
                onChangeText={setRecursoId}
              />

              <Text style={styles.inputLabel}>Quantidade</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: 50"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
              />

              <Text style={styles.inputLabel}>Justificativa</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Por que este recurso é necessário?"
                placeholderTextColor={colors.textSecondary}
                multiline={true}
                numberOfLines={4}
                value={justificativa}
                onChangeText={setJustificativa}
              />

              <PrimaryButton title="ENVIAR SOLICITAÇÃO" onPress={handleNovaSolicitacao} isLoading={isSubmitting} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
}