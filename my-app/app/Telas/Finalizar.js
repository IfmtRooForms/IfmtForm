import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Finalizar = () => {
  const navigation = useNavigation();

  const handleSair = () => {
    navigation.navigate('Login'); // Altere 'Login' para o nome exato da sua tela de login no stack navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obrigado por responder!</Text>
      <Text style={styles.message}>Seu questionário foi enviado com sucesso.</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSair}>
        <Text style={styles.buttonText}>Sair para Login</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Finalizar;
