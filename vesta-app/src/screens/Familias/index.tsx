import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';

const MOCK_FAMILIAS = [
    {
        idFamilia: 1, nmResponsavel: "Maria Silva Santos", nrCpfResponsavel: "111.222.333-44",
        nrTelefone: "(11) 98888-7777", idAbrigo: 1, nmAbrigo: "Ginásio Central",
        dtEntrada: "2026-06-05T10:30:00.000Z", presente: true
    },
    {
        idFamilia: 2, nmResponsavel: "João Pedro Oliveira", nrCpfResponsavel: "555.666.777-88",
        nrTelefone: "(11) 95555-4444", idAbrigo: 1, nmAbrigo: "Ginásio Central",
        dtEntrada: "2026-06-07T15:45:00.000Z", presente: true
    }
];

export function FamiliasScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { themeType } = useThemeContext();
    const styles = getStyles(themeType);
    const colors = theme[themeType];

    const [familias, setFamilias] = useState(MOCK_FAMILIAS);
    const [search, setSearch] = useState('');

    const formatData = (isoString: string) => {
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
                    onPress: () => {
                        setFamilias(prev => prev.filter(f => f.idFamilia !== familia.idFamilia));
                        Alert.alert('Sucesso', 'Saída registrada. Vagas atualizadas!');
                    }
                }
            ]
        );
    };

    // <-- LÓGICA DE FILTRO DA PESQUISA
    const familiasFiltradas = familias.filter(f =>
        f.nmResponsavel.toLowerCase().includes(search.toLowerCase()) ||
        f.nrCpfResponsavel.includes(search)
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
                {/* BARRA DE PESQUISA */}
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

                <FlatList
                    data={familiasFiltradas} // <-- Usando a lista filtrada
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
            </View>
        </View>
    );
}