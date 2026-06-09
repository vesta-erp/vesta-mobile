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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { VestaLogo } from '../../components/VestaLogo';
import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { api } from '../../services/api';
import { theme } from '../../theme';

import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const { themeType, toggleTheme } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await api.post('/api/auth/login', {
        email: email.trim(),
        senha: password.trim()
      });

      await AsyncStorage.setItem('@Vesta:token', response.data.token);

      await AsyncStorage.setItem('@Vesta:user', JSON.stringify({
        email: email.trim(),
        perfil: response.data.perfil || 'GESTOR'
      }));

      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

    } catch (error: any) {
      setIsLoading(false);
      console.log('Erro no login:', error.response?.data || error.message);

      Alert.alert(
        'Falha no Acesso',
        'E-mail ou senha incorretos. Verifique seus dados e tente novamente.'
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <TouchableOpacity
          style={[styles.themeButton, { top: insets.top + 10 }]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={themeType === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          enableOnAndroid={true}
          extraScrollHeight={60}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.logoContainer}>
            <VestaLogo isDarkTheme={themeType === 'dark'} variant="full" />
          </View>

          <Text style={styles.welcomeText}>Bem-vindo à Vesta</Text>
          <Text style={styles.title}>Acesse a plataforma</Text>

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
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="ENTRAR"
            onPress={handleLogin}
            isLoading={isLoading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não possui acesso?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkText}>Solicitar cadastro</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}