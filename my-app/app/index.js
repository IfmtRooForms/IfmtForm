import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Telas/Login';
import Cadastro from './Telas/Cadastro';
import Home from './Telas/Home';
import Sala1 from './Telas/Sala1';
import Finalizar from './Telas/Finalizar';
import TelaAdm from './Telas/TelaAdm';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sala1" component={Sala1} />
          <Stack.Screen name="Finalizar" component={Finalizar} />
          <Stack.Screen name="TelaAdm" component={TelaAdm} />
        </Stack.Navigator>
    );
  }
}
