import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import HomeNavigation from './HomeNavigation';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <AuthStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />     
        </AuthStack.Navigator>

    );
}

export default AuthNavigation;