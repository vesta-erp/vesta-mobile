import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';
import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function CadastroScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [perfilLogado, setPerfilLogado] = useState('OPERADOR');
  const [perfilNovoUsuario, setPerfilNovoUsuario] = useState('OPERADOR');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const userStr = await AsyncStorage.getItem('@Vesta:user');
        if (userStr) {
          const userObj = JSON.parse(userStr);
          const perfil = userObj.perfil || 'OPERADOR';
          setPerfilLogado(perfil.toUpperCase());
        }
      } catch (error) {
        console.log('Erro ao ler perfil do AsyncStorage:', error);
      }
    };
    carregarPerfil();
  }, []);

  const handleDocumentoChange = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setDocumento(value);
  };

  const handleTelefoneChange = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(value);
  };

  const validateEmail = (emailText: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailText);
  };

  const handleRegister = async () => {
    if (perfilLogado === 'OPERADOR') {
      Toast.show({ type: 'error', text1: 'Acesso Negado', text2: 'Operadores não podem cadastrar usuários.' });
      return;
    }

    if (!nome.trim() || !documento.trim() || !email.trim() || !telefone.trim() || !password || !confirmPassword) {
      Toast.show({ type: 'info', text1: 'Atenção', text2: 'Por favor, preencha todos os campos.' });
      return;
    }
    if (nome.trim().length < 3) {
      Toast.show({ type: 'info', text1: 'Nome Inválido', text2: 'Por favor, insira um nome válido.' });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'E-mail Inválido', text2: 'O e-mail informado não possui um formato válido.' });
      return;
    }
    if (documento.length < 14) {
      Toast.show({ type: 'info', text1: 'CPF Incompleto', text2: 'O CPF informado está incompleto.' });
      return;
    }
    if (telefone.length < 14) {
      Toast.show({ type: 'info', text1: 'Telefone Incompleto', text2: 'O telefone informado está incompleto.' });
      return;
    }
    if (password.length < 6) {
      Toast.show({ type: 'info', text1: 'Senha Curta', text2: 'A senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Senhas Divergentes', text2: 'As senhas digitadas não conferem.' });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        nmUsuario: nome.trim(),
        nrCpf: documento.replace(/\D/g, ''),
        nrTelefone: telefone,
        dsEmail: email.trim().toLowerCase(),
        dsSenha: password,
        nmPerfil: perfilNovoUsuario,
        idAbrigo: 1 // Fixo para testes
      };

      await api.post('/api/admin/usuarios', payload);

      Toast.show({
        type: 'success',
        text1: 'Usuário cadastrado!',
        text2: `A conta de ${perfilNovoUsuario} foi criada com sucesso!`,
        position: 'top'
      });

      navigation.goBack();

    } catch (error: any) {
      console.log('Erro ao cadastrar usuário:', error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        Toast.show({
          type: 'error',
          text1: 'Acesso Negado (403)',
          text2: 'Seu usuário não tem permissão para cadastrar.',
          position: 'top'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Falha no Cadastro',
          text2: 'Não foi possível criar a conta. Verifique os dados.',
          position: 'top'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
          enableOnAndroid={true}
          extraScrollHeight={60}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Novo Usuário</Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Preencha os dados abaixo para cadastrar um novo membro da equipe.
          </Text>

          <View style={styles.formContainer}>
            
            {perfilLogado === 'ADMIN' && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: colors.textSecondary, marginBottom: 8, marginLeft: 4 }}>Perfil de Acesso</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center',
                      backgroundColor: perfilNovoUsuario === 'GESTOR' ? colors.primary : 'transparent',
                      borderWidth: 1, borderColor: colors.primary
                    }}
                    onPress={() => setPerfilNovoUsuario('GESTOR')}
                  >
                    <Text style={{ color: perfilNovoUsuario === 'GESTOR' ? '#FFF' : colors.primary, fontWeight: 'bold' }}>GESTOR</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center',
                      backgroundColor: perfilNovoUsuario === 'OPERADOR' ? colors.primary : 'transparent',
                      borderWidth: 1, borderColor: colors.primary
                    }}
                    onPress={() => setPerfilNovoUsuario('OPERADOR')}
                  >
                    <Text style={{ color: perfilNovoUsuario === 'OPERADOR' ? '#FFF' : colors.primary, fontWeight: 'bold' }}>OPERADOR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {perfilLogado === 'GESTOR' && (
               <View style={{ marginBottom: 16 }}>
                 <Text style={{ color: colors.textSecondary, marginBottom: 4, marginLeft: 4 }}>Perfil de Acesso</Text>
                 <View style={{ backgroundColor: colors.surface, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}>
                   <Text style={{ color: colors.textPrimary, fontWeight: 'bold' }}>OPERADOR</Text>
                 </View>
               </View>
            )}

            <CustomInput
              iconName="person-outline"
              placeholder="Nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <CustomInput
              iconName="card-outline"
              placeholder="CPF"
              value={documento}
              onChangeText={handleDocumentoChange}
              keyboardType="numeric"
              maxLength={14}
            />

            <CustomInput
              iconName="call-outline"
              placeholder="Telefone (com DDD)"
              value={telefone}
              onChangeText={handleTelefoneChange}
              keyboardType="phone-pad"
              maxLength={15}
            />

            <CustomInput
              iconName="mail-outline"
              placeholder="E-mail de acesso"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              iconName="lock-closed-outline"
              placeholder="Crie uma senha temporária"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <CustomInput
              iconName="checkmark-circle-outline"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
            />

            <View style={styles.buttonWrapper}>
              <PrimaryButton
                title="CADASTRAR USUÁRIO"
                onPress={handleRegister}
                isLoading={isLoading}
              />
            </View>
          </View>

        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}