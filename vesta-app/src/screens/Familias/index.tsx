import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { api } from '../../services/api';

const ABRIGO_ID = 1;

export function FamiliasScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { themeType } = useThemeContext();
    const styles = getStyles(themeType);
    const colors = theme[themeType];

    const [familias, setFamilias] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        buscarFamilias();
    }, []);

    const buscarFamilias = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/api/abrigos/${ABRIGO_ID}/familias`);

            const dados = response.data._embedded?.familiaResponseList || response.data || [];

            const familiasPresentes = (Array.isArray(dados) ? dados : []).filter(f => f.presente);

            setFamilias(familiasPresentes);
        } catch (error) {
            console.log('Erro ao buscar famílias:', error);
            Alert.alert('Erro', 'Não foi possível carregar as famílias acolhidas.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatData = (isoString: string) => {
        if (!isoString) return '--/--';
        const data = new Date(isoString);
        return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')} às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleSaida = (familia: any) => {
        Alert.alert(
            'Registrar Saída',
            `Confirmar a saída definitiva da família de ${familia.nmResponsavel}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar Saída', style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.post(`/api/abrigos/${ABRIGO_ID}/familias/${familia.idFamilia}/saida`);

                            setFamilias(prev => prev.filter(f => f.idFamilia !== familia.idFamilia));
                            Alert.alert('Sucesso', 'Saída registrada. Vagas atualizadas!');
                        } catch (error) {
                            console.log('Erro ao registrar saída:', error);
                            Alert.alert('Erro', 'Falha ao comunicar a saída ao servidor.');
                        }
                    }
                }
            ]
        );
    };

    const familiasFiltradas = familias.filter(f =>
        f.nmResponsavel?.toLowerCase().includes(search.toLowerCase()) ||
        f.nrCpfResponsavel?.includes(search)
    );

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="people" size={20} color={colors.primary} />
                </View>
                <Text style={styles.responsavelName}>{item.nmResponsavel}</Text>
            </View>
            <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.infoText}>{item.nrTelefone}</Text>
            </View>
            <View style={styles.infoRow}>
                <Ionicons name="log-in-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.infoText}>Entrada: {formatData(item.dtEntrada)}</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.7} onPress={() => handleSaida(item)}>
                <Ionicons name="log-out-outline" size={20} color={colors.error} />
                <Text style={styles.checkoutText}>Registrar Saída</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Famílias Acolhidas</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por nome ou CPF..."
                        placeholderTextColor={colors.textSecondary}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={familiasFiltradas}
                        keyExtractor={(item) => String(item.idFamilia)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 20 }}>
                                Nenhuma família encontrada.
                            </Text>
                        }
                    />
                )}
            </View>
        </View>
    );
}