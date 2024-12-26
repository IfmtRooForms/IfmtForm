import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const TelaAdm  = () => {
    // Dados fictícios de Expectativa e Realidade para cada área
    const dados = {
        tangibilidade: { expectativa: 8.5, realidade: 7.8 },
        confiabilidade: { expectativa: 9.0, realidade: 8.5 },
        responsividade: { expectativa: 8.0, realidade: 7.2 },
        garantia: { expectativa: 9.2, realidade: 8.8 },
        empatia: { expectativa: 8.7, realidade: 7.9 },
    };

    // Função para calcular a média de satisfação
    const calcularSatisfacao = (area) => {
        const { expectativa, realidade } = dados[area];
        return ((realidade / expectativa) * 100).toFixed(2); // Percentual de satisfação
    };

    // Resultados das áreas
    const resultados = Object.keys(dados).map((area) => ({
        area: area.charAt(0).toUpperCase() + area.slice(1), // Capitaliza o nome da área
        satisfacao: calcularSatisfacao(area),
        expectativa: dados[area].expectativa,
        realidade: dados[area].realidade,
    }));

    // Média geral
    const mediaGeral = (
        resultados.reduce((acc, curr) => acc + parseFloat(curr.satisfacao), 0) /
        resultados.length
    ).toFixed(2);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Satisfação dos Alunos - IFMT</Text>

            <Text style={styles.paragraph}>
                A crescente concorrência e a necessidade de mudanças para atender ao novo
                perfil dos discentes vem exigindo que as instituições de Ensino reformulem
                suas estratégias e criem um diferencial competitivo. A partir de 1985, as
                Instituições de Ensino passaram a estudar e considerar a percepção discente
                sobre a satisfação do processo de ensino e da aprendizagem.
            </Text>

            <Text style={styles.paragraph}>
                O objetivo deste projeto é obter e analisar quais são os fatores de maior
                relevância para a satisfação dos alunos no processo de ensino e aprendizagem
                do IFMT campus Rondonópolis.
            </Text>

            <Text style={styles.paragraph}>
                O questionário está organizado em cinco áreas específicas, sendo:
                Tangibilidade, Confiabilidade, Responsividade, Garantia e Empatia. A seguir,
                são apresentadas as médias das respostas para cada área.
            </Text>

            <View style={styles.resultBox}>
                {resultados.map((resultado, index) => (
                    <View key={index} style={styles.resultItem}>
                        <Text style={styles.label}>{resultado.area}:</Text>
                        <Text style={styles.value}>Expectativa: {resultado.expectativa}</Text>
                        <Text style={styles.value}>Realidade: {resultado.realidade}</Text>
                        <Text style={styles.value}>
                            Satisfação: {resultado.satisfacao}%
                        </Text>
                    </View>
                ))}
                <View style={styles.separator} />
                <Text style={styles.label}>Média Geral:</Text>
                <Text style={styles.value}>{mediaGeral}%</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
        lineHeight: 24,
    },
    resultBox: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    resultItem: {
        marginBottom: 15,
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#555',
    },
    value: {
        fontSize: 18,
        color: '#222',
        marginBottom: 5,
    },
});

export default TelaAdm;
