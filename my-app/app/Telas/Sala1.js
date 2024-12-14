import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sala1 = () => {
    const navigation = useNavigation();
    const [respostaExpectativa, setRespostaExpectativa] = useState(null);
    const [respostaRealidade, setRespostaRealidade] = useState(null);
    const [perguntaIndex, setPerguntaIndex] = useState(0);

    const perguntas = [
        {
            pergunta: "Quão satisfeito você está com os produtos/serviços que recebeu da escola?",
        },
        {
            pergunta: "Como você avaliaria a qualidade do atendimento?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        {
            pergunta: "Como você avalia a estrutura física da escola?",
        },
        // Adicione mais perguntas aqui
    ];

    const handleSelectRespostaExpectativa = (opcao) => {
        setRespostaExpectativa(opcao);
    };

    const handleSelectRespostaRealidade = (opcao) => {
        setRespostaRealidade(opcao);
    };

    const handleProximaPergunta = () => {
        if (respostaExpectativa !== null && respostaRealidade !== null) {
            console.log('Expectativa:', respostaExpectativa);
            console.log('Realidade:', respostaRealidade);
            if (perguntaIndex < perguntas.length - 1) {
                setPerguntaIndex(perguntaIndex + 1); // Avança para a próxima pergunta
                setRespostaExpectativa(null); // Reseta a resposta para a expectativa
                setRespostaRealidade(null); // Reseta a resposta para a realidade
            } else {
                // Se for a última pergunta, navega para a próxima tela ou finaliza
                navigation.navigate('Finalizar'); // Navega para a tela de finalização ou outra tela
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pergunta {perguntaIndex + 1}</Text>
            <Text style={styles.pergunta}>{perguntas[perguntaIndex].pergunta}</Text>

            <View style={styles.opcoesContainer}>
                <View style={styles.coluna}>
                    <Text style={styles.subtitulo}>Expectativa</Text>
                    {Array.from({ length: 5 }, (_, i) => (
                        <TouchableOpacity
                            key={`expectativa-${i}`}
                            style={[
                                styles.opcao,
                                respostaExpectativa === i + 1 ? styles.selectedOption : null
                            ]}
                            onPress={() => handleSelectRespostaExpectativa(i + 1)}
                        >
                            <Text style={styles.opcaoText}>{i + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.coluna}>
                    <Text style={styles.subtitulo}>Realidade</Text>
                    {Array.from({ length: 5 }, (_, i) => (
                        <TouchableOpacity
                            key={`realidade-${i}`}
                            style={[
                                styles.opcao,
                                respostaRealidade === i + 1 ? styles.selectedOption : null
                            ]}
                            onPress={() => handleSelectRespostaRealidade(i + 1)}
                        >
                            <Text style={styles.opcaoText}>{i + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <Button
                title="Próximo"
                onPress={handleProximaPergunta}
                disabled={respostaExpectativa === null || respostaRealidade === null} // Desativa o botão caso não tenha sido selecionada uma opção
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
