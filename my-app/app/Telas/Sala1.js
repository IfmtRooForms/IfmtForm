import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Sala1 = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { roomNumber, userId } = route.params; // Dados passados pela rota

    const [respostas, setRespostas] = useState([]); // Armazena todas as respostas
    const [perguntaIndex, setPerguntaIndex] = useState(0); // Controle da pergunta atual
    const [respostaAtual, setRespostaAtual] = useState({ expectativa: null, realidade: null });

    const perguntas = [
        { id: 1, pergunta: "O curso Técnico em Secretariado integrado ao nível médio do campus Rondonópolis deveria ter equipamentos modernos para o uso dos alunos?" },
        { id: 2, pergunta: "As suas instalações físicas do ambiente escolar do IFMT campus Rondonópolis deveria ser visualmente atrativo." },
        { id: 3, pergunta: "Os servidores deveriam estar vestidos e asseados de modo apresentável e adequado ao ambiente escolar." },
        { id: 4, pergunta: "As aparências das instalações físicas do IFMT campus Rondonópolis deveria estar conservada." },
        { id: 5, pergunta: "As aparências das instalações físicas do IFMT campus Rondonópolis deveria estar conservada." },
        { id: 6, pergunta: "O curso Técnico em Secretariado integrado ao nível médio do IFMT campus Rondonópolis têm equipamentos modernos para uso dos alunos." },
    ];

    const handleSelectResposta = (campo, valor) => {
        setRespostaAtual((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleProximaPergunta = async () => {
        const perguntaAtual = perguntas[perguntaIndex];

        setRespostas((prev) => [
            ...prev,
            { 
                id: perguntaAtual.id, 
                pergunta: perguntaAtual.pergunta, 
                ...respostaAtual 
            },
        ]);

        if (perguntaIndex < perguntas.length - 1) {
            setPerguntaIndex(perguntaIndex + 1);
            setRespostaAtual({ expectativa: null, realidade: null });
        } else {
            await enviarParaAPI();
        }
    };

    const enviarParaAPI = async () => {
        const payload = { userId, roomNumber, respostas };

        try {
            const response = await fetch('http://10.1.13.19:4001/salvarRespostas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Respostas enviadas com sucesso!');
                navigation.navigate('Finalizar');
            } else {
                Alert.alert('Erro', 'Não foi possível enviar as respostas.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao enviar as respostas.');
            console.error('Erro ao conectar à API:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pergunta {perguntaIndex + 1}</Text>
            <Text style={styles.pergunta}>{perguntas[perguntaIndex].pergunta}</Text>

            <View style={styles.opcoesContainer}>
                {['expectativa', 'realidade'].map((campo) => (
                    <View key={campo} style={styles.coluna}>
                        <Text style={styles.subtitulo}>
                            {campo.charAt(0).toUpperCase() + campo.slice(1)}
                        </Text>
                        {Array.from({ length: 5 }, (_, i) => (
                            <TouchableOpacity
                                key={`${campo}-${i}`}
                                style={[
                                    styles.opcao,
                                    respostaAtual[campo] === i + 1 ? styles.selectedOption : null,
                                ]}
                                onPress={() => handleSelectResposta(campo, i + 1)}
                            >
                                <Text style={styles.opcaoText}>{i + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            <Button
                title={perguntaIndex === perguntas.length - 1 ? "Finalizar" : "Próximo"}
                onPress={handleProximaPergunta}
                disabled={!respostaAtual.expectativa || !respostaAtual.realidade}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pergunta: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    opcoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    coluna: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    opcao: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 5,
        margin: 5,
    },
    opcaoText: {
        fontSize: 18,
        color: '#007BFF',
    },
    selectedOption: {
        backgroundColor: '#007BFF',
        color: 'white',
    },
});

export default Sala1;
