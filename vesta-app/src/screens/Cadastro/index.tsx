import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function CadastroScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

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
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (nome.trim().length < 3) {
      Alert.alert('Erro', 'Por favor, insira um nome válido.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'O e-mail informado não possui um formato válido.');
      return;
    }
    if (documento.length < 14) {
      Alert.alert('Erro', 'O CPF informado está incompleto.');
      return;
    }
    if (telefone.length < 14) {
      Alert.alert('Erro', 'O telefone informado está incompleto.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas digitadas não conferem.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Cadastro Solicitado', 
        'Aguarde a aprovação do Administrador Central.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
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
            <Text style={styles.title}>Nova Conta</Text>
          </View>
          <Text style={styles.subtitle}>
            Preencha seus dados operacionais para solicitar acesso à plataforma Vesta.
          </Text>

          <View>
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

            <PrimaryButton 
              title="SOLICITAR CADASTRO" 
              onPress={handleRegister} 
              isLoading={isLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Faça Login</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}