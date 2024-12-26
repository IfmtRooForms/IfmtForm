import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert, FlatList, Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const Cadastro = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSelectOption = (option, setFieldValue) => {
    setSelectedOption(option.label);
    setSelectedRoomNumber(option.roomNumber);
    setFieldValue('roomNumber', option.roomNumber);
    setModalVisible(false);
  };

  const cadastroValidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
      .required("Confirmação de senha é obrigatória"),
  });

  // Função para lidar com o envio do cadastro
  const handleCadastro = async (values) => {
    setIsLoading(true); 
    

    try {
      const response = await fetch('http://10.1.13.19:4001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          roomNumber: values.roomNumber, 
        }),
      });

      const data = await response.json();
     

      if (response.ok) {
      console.log(data)

        //if(response.user[roomNumber] == 1){ arrumar depois
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Home', {
          user: data.user, // Passa o objeto do usuário para a tela Home
        });
        //}
      } else {
        Alert.alert('Erro', data.message || 'Falha no cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const ConteudoBase = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Image source={require("../../assets/images/logoifmtforms.png")} style={styles.image} />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ConteudoBase />
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '', roomNumber: '' }}
        validationSchema={cadastroValidationSchema}
        onSubmit={handleCadastro}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirme a Senha"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.selectButton} onPress={toggleModal}>
              <Text style={styles.selectText}>
                {selectedOption ? selectedOption : "Selecione a sala"}
              </Text>
            </TouchableOpacity>

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
                        onPress={() => handleSelectOption(item, setFieldValue)}
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos iguais ao código original, com adição dos estilos do modal e botão de seleção
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  selectText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default Cadastro;
