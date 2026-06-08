import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PrimaryButton } from '../../components/PrimaryButton';

const MOCK_SOLICITACOES = [
  {
    idSolicitacao: 1,
    idAbrigo: 1,
    nmAbrigo: "Ginásio Central",
    idRecurso: 101,
    nmRecurso: "Colchões",
    qtSolicitada: 50,
    stStatus: "ABERTA",
    dsJustificativa: "Aumento repentino no número de famílias acolhidas nesta madrugada.",
    dtSolicitacao: "2026-06-08T05:10:26.336Z",
  },
  {
    idSolicitacao: 2,
    idAbrigo: 1,
    nmAbrigo: "Ginásio Central",
    idRecurso: 102,
    nmRecurso: "Kits de Higiene",
    qtSolicitada: 200,
    stStatus: "EM_ATENDIMENTO",
    dsJustificativa: "Estoque crítico, previsão de zerar em 2 dias.",
    dtSolicitacao: "2026-06-06T14:20:00.000Z",
  }
];

export function SolicitacoesScreen() {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [solicitacoes, setSolicitacoes] = useState(MOCK_SOLICITACOES);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [recurso, setRecurso] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [justificativa, setJustificativa] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ABERTA': return colors.error;
      case 'EM_ATENDIMENTO': return colors.secondary;
      case 'CONCLUIDA': return '#4CAF50';
      default: return colors.textSecondary;
    }
  };

  const formatData = (isoString: string) => {
    const data = new Date(isoString);
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const handleNovaSolicitacao = () => {
    if (!recurso || !quantidade || !justificativa) {
      Alert.alert('Erro', 'Preencha todos os campos da solicitação.');
      return;
    }

    console.log(`Payload POST /api/abrigos/{idAbrigo}/solicitacoes: { idRecurso: ${recurso}, qtSolicitada: ${quantidade}, dsJustificativa: '${justificativa}' }`);
    
    Alert.alert('Sucesso', 'Solicitação enviada para a central!');
    setModalVisible(false);
    setRecurso('');
    setQuantidade('');
    setJustificativa('');
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.resourceName}>{item.nmRecurso}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.stStatus) }]}>
          <Text style={styles.statusText}>{item.stStatus.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>Quantidade</Text>
          <Text style={styles.infoValue}>{item.qtSolicitada}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>Data</Text>
          <Text style={styles.infoValue}>{formatData(item.dtSolicitacao)}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.infoLabel}>ID Solic.</Text>
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
        <Ionicons name="git-network" size={28} color="#FFFFFF" />
      </View>

      <View style={styles.content}>
        <FlatList
          data={solicitacoes}
          keyExtractor={(item) => String(item.idSolicitacao)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity 
              style={styles.dismissArea} 
              activeOpacity={1} 
              onPress={() => setModalVisible(false)} 
            />
            
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nova Solicitação</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Recurso Necessário (ID ou Nome)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: Água Mineral, Colchões..."
                placeholderTextColor={colors.textSecondary}
                value={recurso}
                onChangeText={setRecurso}
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
                placeholder="Por que este recurso é necessário agora?"
                placeholderTextColor={colors.textSecondary}
                multiline={true}
                numberOfLines={4}
                value={justificativa}
                onChangeText={setJustificativa}
              />

              <PrimaryButton 
                title="ENVIAR SOLICITAÇÃO" 
                onPress={handleNovaSolicitacao} 
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
}