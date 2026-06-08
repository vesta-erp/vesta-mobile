import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

interface Membro {
  nmPessoa: string;
  dtNascimento: string;
  tpDocumento: string;
  nrDocumento: string;
}

export function AcolhimentoScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [nmResponsavel, setNmResponsavel] = useState('');
  const [nrCpfResponsavel, setNrCpfResponsavel] = useState('');
  const [nrTelefone, setNrTelefone] = useState('');
  const [membros, setMembros] = useState<Membro[]>([]);

  const [novoMembroNome, setNovoMembroNome] = useState('');
  const [novoMembroNasc, setNovoMembroNasc] = useState('');
  const [novoMembroTpDoc, setNovoMembroTpDoc] = useState('RG');
  const [novoMembroNrDoc, setNovoMembroNrDoc] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCpfChange = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setNrCpfResponsavel(value);
  };

  const handleTelefoneChange = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setNrTelefone(value);
  };

  const handleDataNascChange = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    setNovoMembroNasc(value);
  };

  const handleDocChange = (text: string) => {
    let value = text.replace(/\D/g, '');

    if (novoMembroTpDoc === 'CPF') {
      if (value.length > 11) value = value.substring(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      if (value.length > 9) value = value.substring(0, 9);
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    setNovoMembroNrDoc(value);
  };

  const handleAddMembro = () => {
    if (!novoMembroNome || !novoMembroNasc || !novoMembroNrDoc) {
      Toast.show({ type: 'info', text1: 'Atenção', text2: 'Preencha todos os dados do membro antes de adicionar.' });
      return;
    }
    if (novoMembroNasc.length < 10) {
      Toast.show({ type: 'info', text1: 'Data Inválida', text2: 'Digite uma data de nascimento válida.' });
      return;
    }

    const partesData = novoMembroNasc.split('/');
    const dataApi = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

    const novo: Membro = {
      nmPessoa: novoMembroNome,
      dtNascimento: dataApi,
      tpDocumento: novoMembroTpDoc,
      nrDocumento: novoMembroNrDoc
    };

    setMembros([...membros, novo]);
    setNovoMembroNome('');
    setNovoMembroNasc('');
    setNovoMembroNrDoc('');
  };

  const handleRemoveMembro = (index: number) => {
    const novaLista = [...membros];
    novaLista.splice(index, 1);
    setMembros(novaLista);
  };

  const handleSubmit = async () => {
    if (!nmResponsavel || nrCpfResponsavel.length < 14 || nrTelefone.length < 14) {
      Toast.show({ type: 'info', text1: 'Dados Incompletos', text2: 'Preencha os dados do responsável corretamente.' });
      return;
    }

    const payload = {
      nmResponsavel,
      nrCpfResponsavel: nrCpfResponsavel.replace(/\D/g, ''),
      nrTelefone: nrTelefone.replace(/\D/g, ''),
      membros
    };

    try {
      setIsSubmitting(true);

      await api.post(`/api/abrigos/${ABRIGO_ID}/familias/acolhimento`, payload);

      Toast.show({
        type: 'success',
        text1: 'Acolhimento Concluído!',
        text2: 'A família foi registrada com sucesso no abrigo.',
        position: 'top',
        visibilityTime: 4000,
      });

      navigation.goBack();

    } catch (error) {
      console.log('Erro no acolhimento:', error);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao registrar a família no servidor.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Acolher Família</Text>
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={40}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Dados do Responsável</Text>
          <View style={styles.cardForm}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <CustomInput
              iconName="person-outline"
              placeholder="Ex: João da Silva"
              value={nmResponsavel}
              onChangeText={setNmResponsavel}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>CPF</Text>
            <CustomInput
              iconName="card-outline"
              placeholder="000.000.000-00"
              value={nrCpfResponsavel}
              onChangeText={handleCpfChange}
              keyboardType="numeric"
              maxLength={14}
            />

            <Text style={styles.inputLabel}>Telefone Contato</Text>
            <CustomInput
              iconName="call-outline"
              placeholder="(00) 00000-0000"
              value={nrTelefone}
              onChangeText={handleTelefoneChange}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>

          <Text style={styles.sectionTitle}>Membros da Família</Text>

          {membros.length > 0 && (
            <View style={styles.memberList}>
              {membros.map((m, index) => (
                <View key={index} style={styles.memberCard}>
                  <View>
                    <Text style={styles.memberName}>{m.nmPessoa}</Text>
                    <Text style={styles.memberDoc}>{m.tpDocumento}: {m.nrDocumento}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveMembro(index)} style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={styles.cardForm}>
            <Text style={styles.inputLabel}>Adicionar Dependente</Text>
            <CustomInput
              placeholder="Nome do membro"
              value={novoMembroNome}
              onChangeText={setNovoMembroNome}
              autoCapitalize="words"
            />

            <View style={[styles.row, { marginBottom: 10 }]}>
              <TouchableOpacity
                style={{ flex: 1, padding: 8, borderWidth: 1, borderColor: novoMembroTpDoc === 'RG' ? colors.primary : colors.border, borderRadius: 8, marginRight: 4, alignItems: 'center', backgroundColor: novoMembroTpDoc === 'RG' ? colors.primary + '20' : 'transparent' }}
                onPress={() => { setNovoMembroTpDoc('RG'); setNovoMembroNrDoc(''); }}
              >
                <Text style={{ color: novoMembroTpDoc === 'RG' ? colors.primary : colors.textSecondary, fontWeight: 'bold' }}>RG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, padding: 8, borderWidth: 1, borderColor: novoMembroTpDoc === 'CPF' ? colors.primary : colors.border, borderRadius: 8, marginLeft: 4, alignItems: 'center', backgroundColor: novoMembroTpDoc === 'CPF' ? colors.primary + '20' : 'transparent' }}
                onPress={() => { setNovoMembroTpDoc('CPF'); setNovoMembroNrDoc(''); }}
              >
                <Text style={{ color: novoMembroTpDoc === 'CPF' ? colors.primary : colors.textSecondary, fontWeight: 'bold' }}>CPF</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <CustomInput
                  placeholder={novoMembroTpDoc === 'RG' ? "00.000.000-0" : "000.000.000-00"}
                  value={novoMembroNrDoc}
                  onChangeText={handleDocChange}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.colLast}>
                <CustomInput
                  placeholder="Nascimento"
                  value={novoMembroNasc}
                  onChangeText={handleDataNascChange}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMembro}>
              <Ionicons name="add" size={20} color={colors.secondary} />
              <Text style={styles.addMemberText}>Incluir Membro</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="CONCLUIR ACOLHIMENTO"
            onPress={handleSubmit}
            isLoading={isSubmitting}
          />
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}