import { StyleSheet, Image } from "react-native";

export default StyleSheet.create({
    
    background_image:{
        flex: 1,
        position: "absolute",
        bottom: -850, // Posiciona no canto inferior
        right: 0,  // Posiciona no canto direito
        width: 300, // Largura da imagem
        height: 200, // Altura da imagem
    },
    back:{
        flex: 1,
        position: "absolute",
        bottom: -100, // Posiciona no canto inferior
        right: 300,  // Posiciona no canto direito
        width: 80, // Largura da imagem
        height: 80, // Altura da imagem
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',  // Cor de fundo enquanto carrega
    },
    
});