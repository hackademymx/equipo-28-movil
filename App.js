import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext'; // comentario prueba para merge
import 'react-native-gesture-handler'

//import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <p>
        Deploy con Netlify
      </p>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
