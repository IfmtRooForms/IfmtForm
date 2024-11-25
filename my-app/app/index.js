import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/styles.js';

export default class App extends React.Component {

    constructor(props) {
        console.disableYellowBox = true;
        super(props);
        this.state = {
            isLoading: true,
        };
        this.mostraBotaoVoltar = true; // Controle da exibição do botão de voltar
    }

    componentDidMount() {        
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 2000);  
    }

    // Função para exibir a imagem de fundo
    BackgroundImage = () => {
        return (
            <Image 
                source={require("../assets/images/background_image.png")}
                style={styles.background_image}
            />
        );
    }

    // Função para exibir o botão de voltar
    Back = () => {
        return (
            <Image 
                source={require("../assets/images/back.png")}
                style={styles.back}
            />
        );
    }

    // Função que renderiza o conteúdo base
    ConteudoBase = () => {
        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <Image source={require("../assets/images/logoifmtforms.png")}/>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Carregando...</Text>
                </View>
            );
        }

        // Renderiza o conteúdo quando não está carregando
        return (
            <View>
                {this.BackgroundImage()}
                {this.mostraBotaoVoltar ? (
                    <TouchableOpacity onPress={() => console.log("Pressionado")}>
                        {this.Back()}
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={{ marginTop: 20, flex: 1 }}>
                {
                    this.ConteudoBase()
                }
            </ScrollView>
        );
    }
}
