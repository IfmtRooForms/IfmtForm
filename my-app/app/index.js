import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Telas/Login';
import Cadastro from './Telas/Cadastro';
import Home from './Telas/Home';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
  }
}
