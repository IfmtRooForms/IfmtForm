import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native'; // Para navegação

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // Gerenciar o estado de carregamento

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const handleLogin = (values) => {
    setIsLoading(true); // Iniciar carregamento ao tentar logar
    // Simulação de login (substitua com lógica de autenticação real)
    setTimeout(() => {
      setIsLoading(false); // Parar o carregamento após "login"
      navigation.navigate('Home'); // Exemplo de navegação após login
    }, 2000); // Simula um delay de 2 segundos para o carregamento
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
    return null; // Retorna null caso não esteja carregando
  };

  return (
    <View style={styles.container}>
      <ConteudoBase /> {/* Exibe o carregamento, se necessário */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Botão para navegar para a tela de cadastro */}
            <TouchableOpacity 
              style={styles.link} 
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
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
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default Login;
