import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useThemeContext } from '../../contexts/ThemeContext';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PrimaryButton } from '../../components/PrimaryButton';

const MOCK_OCORRENCIAS = [
    {
        idOcorrencia: 1, idAbrigo: 1, nmTitulo: "Vazamento no refeitório", dsDescricao: "Cano estourou próximo à cozinha.",
        tpSeveridade: "ALTA", stStatus: "ABERTA", dtOcorrencia: "2026-06-08T08:30:00.000Z",
    },
    {
        idOcorrencia: 2, idAbrigo: 1, nmTitulo: "Lâmpadas queimadas", dsDescricao: "Três lâmpadas do alojamento B queimaram.",
        tpSeveridade: "BAIXA", stStatus: "RESOLVIDA", dtOcorrencia: "2026-06-07T14:15:00.000Z",
    }
];

export function OcorrenciasScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { themeType } = useThemeContext();
    const styles = getStyles(themeType);
    const colors = theme[themeType];

    const [ocorrencias, setOcorrencias] = useState(MOCK_OCORRENCIAS);
    const [modalVisible, setModalVisible] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState('TODAS');

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [severidade, setSeveridade] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');

    const formatData = (isoString: string) => {
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

    const handleNovaOcorrencia = () => {
        if (!titulo || !descricao) {
            Alert.alert('Erro', 'Preencha o título e a descrição da ocorrência.');
            return;
        }
        const novaOcorrencia = {
            idOcorrencia: Date.now(),
            idAbrigo: 1,
            nmTitulo: titulo,
            dsDescricao: descricao,
            tpSeveridade: severidade,
            stStatus: "ABERTA",
            dtOcorrencia: new Date().toISOString(),
        };

        setOcorrencias([novaOcorrencia, ...ocorrencias]);

        Alert.alert('Sucesso', 'Ocorrência registrada!');
        setModalVisible(false);
        setTitulo('');
        setDescricao('');
        setSeveridade('MEDIA');
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
                <Ionicons name="warning" size={28} color="#FFFFFF" />
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
                                <Text style={[styles.filterText, filtroStatus === status && styles.filterTextActive]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={ocorrenciasFiltradas}
                    keyExtractor={(item) => String(item.idOcorrencia)}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.textSecondary }}>Nenhuma ocorrência encontrada.</Text>}
                />
            </View>

            <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 20 : 40} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

                            <PrimaryButton title="REGISTRAR OCORRÊNCIA" onPress={handleNovaOcorrencia} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        </View>
    );
}