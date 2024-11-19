import React from 'react';
import { View, Text, Image, ActivityIndicator  } from 'react-native';
import styles from '../assets/styles.js';

export default class App extends React.Component{

    BackgroundImage = () => {
        return(
            <Image source={require("../assets/images/background_image.png")}
            style={styles.background_image}/>
        );
    }
    Back = () => {
        return(
            <Image source={require("../assets/images/back.png")}
            style={styles.back}/>
        );
    }
    
    constructor(props){
        super(props);
        this.back = true;
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {        
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 2000);  
    }

    render(){

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

        return(
            
            <View>
                <this.BackgroundImage/>
                <this.Back/>                
        </View>
        );
    }

}