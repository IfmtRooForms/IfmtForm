import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

  const options = [
    { label: "Terceiro ano A - Sala 1", roomNumber: 1 },
    { label: "Terceiro ano B - Sala 2", roomNumber: 2 },
    { label: "Terceiro ano C - Sala 3", roomNumber: 3 },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.label);
    setSelectedRoomNumber(option.roomNumber);
    setModalVisible(false); // Fecha o modal após selecionar a opção
  };

  const handleNavigateToRoom = () => {
    if (selectedRoomNumber) {
      // Navega para a tela Sala1 e passa o número da sala
      navigation.navigate('Sala1', { roomNumber: selectedRoomNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à IfmtForm!</Text>

      {/* Campo para mostrar a seleção */}
      <TouchableOpacity style={styles.selectButton} onPress={toggleModal}>
        <Text style={styles.selectText}>
          {selectedOption ? selectedOption : "Selecione a sala e ano"}
        </Text>
      </TouchableOpacity>

      {/* Modal com as opções */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.roomNumber.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão para navegar para a sala */}
      {selectedRoomNumber && (
        <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToRoom}>
          <Text style={styles.navigateButtonText}>Ir para Sala {selectedRoomNumber}</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 200,
  },
  selectButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  selectText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ccc',
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
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
