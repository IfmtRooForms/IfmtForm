import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.0.0.236:4001/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) 
            });
           
            const data = await response.json();
            console.log(data)

            if (response.ok) {
                // Você pode comparar os dados do usuário aqui
                // Se o login for bem-sucedido, navegue para a página inicial
                Alert.alert('Sucesso', 'Login realizado!');
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', data.message || 'Login falhou.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.link}>Não tem uma conta? Registre-se</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
    button: { height: 50, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18 },
    link: { marginTop: 10, textAlign: 'center', color: '#007BFF' },
});

export default Login;
