import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Modal,
    TextInput, Alert, Platform, ScrollView, ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PrimaryButton } from '../../components/PrimaryButton';
import { api } from '../../services/api';

const ABRIGO_ID = 1; // Fixo para testes

export function OcorrenciasScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { themeType } = useThemeContext();
    const styles = getStyles(themeType);
    const colors = theme[themeType];

    const [ocorrencias, setOcorrencias] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState('TODAS');

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [severidade, setSeveridade] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');

    useEffect(() => {
        buscarOcorrencias();
    }, []);

    const buscarOcorrencias = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/api/abrigos/${ABRIGO_ID}/ocorrencias`);
            console.log('RESPOSTA REAL DA API:', response.data);
            const dados = response.data._embedded?.ocorrenciaResponseList || response.data || [];

            const ordenados = (Array.isArray(dados) ? dados : []).sort((a: any, b: any) =>
                new Date(b.dtOcorrencia).getTime() - new Date(a.dtOcorrencia).getTime()
            );

            setOcorrencias(ordenados);
        } catch (error) {
            console.log('Erro ao buscar ocorrências:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatData = (isoString: string) => {
        if (!isoString) return '--/--';
        const data = new Date(isoString);
        return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')} ${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`;
    };

    const getSeverityColor = (sev: string) => {
        switch (sev) {
            case 'ALTA': return colors.error;
            case 'MEDIA': return '#FF9800';
            case 'BAIXA': return colors.secondary;
            default: return colors.border;
        }
    };

    const handleNovaOcorrencia = async () => {
        if (!titulo || !descricao) {
            Toast.show({ type: 'info', text1: 'Atenção', text2: 'Preencha o título e a descrição da ocorrência.' });
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post(`/api/abrigos/${ABRIGO_ID}/ocorrencias`, {
                nmTitulo: titulo, dsDescricao: descricao, tpSeveridade: severidade
            });

            Toast.show({ type: 'success', text1: 'Registrado', text2: 'Ocorrência salva e notificada!' });
            setModalVisible(false);
            setTitulo(''); setDescricao(''); setSeveridade('MEDIA');
            buscarOcorrencias();

        } catch (error) {
            console.log('Erro ao criar ocorrência:', error);
            Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao registrar a ocorrência no servidor.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const ocorrenciasFiltradas = ocorrencias.filter(o =>
        filtroStatus === 'TODAS' || o.stStatus === filtroStatus
    );

    const renderItem = ({ item }: any) => (
        <View style={[styles.card, { borderLeftColor: getSeverityColor(item.tpSeveridade) }]}>
            <View style={styles.cardHeader}>
                <Text style={styles.ocorrenciaTitle}>{item.nmTitulo}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.stStatus === 'ABERTA' ? colors.error : '#4CAF50' }]}>
                    <Text style={styles.statusText}>{item.stStatus}</Text>
                </View>
            </View>
            <Text style={styles.ocorrenciaDesc}>{item.dsDescricao}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.infoText}>Severidade: <Text style={{ color: getSeverityColor(item.tpSeveridade), fontWeight: 'bold' }}>{item.tpSeveridade}</Text></Text>
                <Text style={styles.infoText}>{formatData(item.dtOcorrencia)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Ocorrências</Text>
                </View>
                <TouchableOpacity onPress={buscarOcorrencias}>
                    <Ionicons name="refresh" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {['TODAS', 'ABERTA', 'RESOLVIDA'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[styles.filterBtn, filtroStatus === status && styles.filterBtnActive]}
                                onPress={() => setFiltroStatus(status)}
                            >
                                <Text style={[styles.filterText, filtroStatus === status && styles.filterTextActive]}>{status}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={ocorrenciasFiltradas}
                        keyExtractor={(item) => String(item.idOcorrencia)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.textSecondary }}>Nenhuma ocorrência encontrada.</Text>}
                    />
                )}
            </View>

            <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 20 : 40} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
                        <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => setModalVisible(false)} />
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Relatar Ocorrência</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={28} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.inputLabel}>Título</Text>
                            <TextInput style={styles.textInput} placeholder="Ex: Falta de água" placeholderTextColor={colors.textSecondary} value={titulo} onChangeText={setTitulo} />

                            <Text style={styles.inputLabel}>Descrição</Text>
                            <TextInput style={[styles.textInput, styles.textArea]} placeholder="Detalhe o problema..." placeholderTextColor={colors.textSecondary} multiline={true} numberOfLines={4} value={descricao} onChangeText={setDescricao} />

                            <Text style={styles.inputLabel}>Nível de Severidade</Text>
                            <View style={styles.severityContainer}>
                                {['BAIXA', 'MEDIA', 'ALTA'].map((sev) => (
                                    <TouchableOpacity key={sev} style={[styles.severityBtn, severidade === sev && [styles.severityBtnActive, { backgroundColor: getSeverityColor(sev) }]]} onPress={() => setSeveridade(sev as any)}>
                                        <Text style={[styles.severityText, severidade === sev && styles.severityTextActive]}>{sev}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <PrimaryButton title="REGISTRAR OCORRÊNCIA" onPress={handleNovaOcorrencia} isLoading={isSubmitting} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        </View>
    );
}