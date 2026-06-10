import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { VestaLogo } from '../../components/VestaLogo';

const LAST_COMMIT_HASH = '9c00e0d84bdf69e37f7a5e4e3af4bb018332e0df'; 
const APP_VERSION = '1.0.0';

export function SobreScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { themeType } = useThemeContext();
  const styles = getStyles(themeType);
  const colors = theme[themeType];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <View style={[styles.header, { paddingTop: insets.top + 20, backgroundColor: colors.primary }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Sobre o App</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <VestaLogo isDarkTheme={themeType === 'dark'} variant="reduced" />
          <Text style={[styles.appName, { color: colors.textPrimary }]}>Vesta App</Text>
          <Text style={[styles.appDescription, { color: colors.textSecondary }]}>
            Sistema tático de gestão operacional para abrigos. Solução desenvolvida para a Global Solution 2026.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          
          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Versão</Text>
            <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{APP_VERSION}</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomColor: 'transparent', paddingBottom: 0 }]}>
            <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Commit de Referência</Text>
          </View>
          
          <View style={[styles.hashContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.hashText, { color: colors.primary }]}>#{LAST_COMMIT_HASH}</Text>
          </View>

        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Desenvolvido com React Native e Expo
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary, marginTop: 4 }]}>
            FIAP © 2026
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}