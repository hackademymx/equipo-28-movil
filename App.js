import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler'

//import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

registerRootComponent(App);
export default App;
//registerRootComponent(App);
