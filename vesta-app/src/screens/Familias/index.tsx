import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, ActivityIndicator, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme, fonts } from '../../theme';
import { getStyles } from './styles';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

export function FamiliasScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { themeType } = useThemeContext();
    const styles = getStyles(themeType);
    const colors = theme[themeType];

    const [familias, setFamilias] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [modalMembrosVisible, setModalMembrosVisible] = useState(false);
    const [familiaSelecionada, setFamiliaSelecionada] = useState<any>(null);

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
            
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, borderRadius: 8 }}
                onPress={() => {
                    setFamiliaSelecionada(item);
                    setModalMembrosVisible(true);
                }}
            >
                <Ionicons name="eye-outline" size={20} color={colors.primary} />
                <Text style={{ fontFamily: fonts.bold || 'System', fontSize: 14, color: colors.primary, marginLeft: 8 }}>Ver Dependentes</Text>
            </TouchableOpacity>

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

            {/* Modal de Detalhes dos Membros */}
            <Modal visible={modalMembrosVisible} animationType="slide" transparent={true} onRequestClose={() => setModalMembrosVisible(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '70%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.textPrimary }}>Dependentes</Text>
                            <TouchableOpacity onPress={() => setModalMembrosVisible(false)}>
                                <Ionicons name="close" size={28} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>
                            Responsável: <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>{familiaSelecionada?.nmResponsavel}</Text>
                        </Text>

                        {/* Verifica se a API retornou o array de membros */}
                        {familiaSelecionada?.membros && familiaSelecionada.membros.length > 0 ? (
                            <FlatList
                                data={familiaSelecionada.membros}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item }) => (
                                    <View style={{ padding: 12, backgroundColor: colors.surface, borderRadius: 8, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: colors.secondary }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.textPrimary }}>{item.nmPessoa}</Text>
                                        <Text style={{ fontSize: 14, color: colors.textSecondary }}>Doc: {item.nrDocumento}</Text>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 20 }}>Nenhum dependente cadastrado para esta família.</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}