import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user; // Garante que o parâmetro foi passado
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(user?.roomNumber);

  const handleNavigateToRoom = () => {
    if (selectedRoomNumber) {
      navigation.navigate('Sala1', {
        roomNumber: selectedRoomNumber,
        userId: user.id, // Passa também o ID do usuário
      });
    } else {
      Alert.alert("Erro", "Nenhuma sala selecionada!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à IfmtForm, {user?.email}!</Text>
      <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToRoom}>
        <Text style={styles.navigateButtonText}>Ir para Sala {selectedRoomNumber}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navigateButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
