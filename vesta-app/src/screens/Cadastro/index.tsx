import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

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
  
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = () => {
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
    
    // Simulação do tempo de resposta da API
    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Cadastro Solicitado 🎉',
        text2: 'Aguarde a aprovação do Administrador Central.',
        position: 'top'
      });
      navigation.goBack(); // Volta para a tela de Login
    }, 1500);
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
            <Text style={[styles.title, { color: colors.textPrimary }]}>Nova Conta</Text>
          </View>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Preencha seus dados operacionais para solicitar acesso à plataforma Vesta.
          </Text>

          <View style={styles.formContainer}>
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
              placeholder="E-mail operacional" 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <CustomInput 
              iconName="lock-closed-outline"
              placeholder="Crie uma senha" 
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
                title="SOLICITAR CADASTRO" 
                onPress={handleRegister} 
                isLoading={isLoading}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.linkText, { color: colors.primary }]}>Faça Login</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}