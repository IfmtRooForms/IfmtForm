import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Finalizar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obrigado por responder!</Text>
      <Text style={styles.message}>Seu questionário foi enviado com sucesso.</Text>
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
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Finalizar;
