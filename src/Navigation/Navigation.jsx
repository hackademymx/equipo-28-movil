import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa almacenamiento asincrono de la aplicacion
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
//import LoginScreen from '../screens/LoginScreen';
//import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import HomeNavigation from './HomeNavigation';
import AuthNavigation from './AuthNavigation';

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

 const[userLogged, setUserLogged] =useState(false);
  // useEffect(()=>{
  //   const isLogged = async () => {
  //     let userInfo = await AsyncStorage.getItem('userInfo');
  //     userInfo = JSON.parse(userInfo);
  //     if (userInfo) {
  //       setUserLogged(true)
  //     } 
  //   }
  // isLogged() 
  // }, [userInfo])


  return (
    <NavigationContainer>
        {userInfo.tokens? (<HomeNavigation/>) : (<AuthNavigation/>)}
    </NavigationContainer>
  );
};

export default Navigation;


/*import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen name="Splash Screen"
          component={SplashScreen}
          options={{headerShown:false}} 
          />
        ):
   
        userInfo.tokens ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

*/
