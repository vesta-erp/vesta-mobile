import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { VestaLogo } from '../../components/VestaLogo';
import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';

import { useThemeContext } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
            onPress={() => navigation.navigate('Home')}
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