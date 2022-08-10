import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { createDrawerNavigator, useDrawerStatus, DrawerContentScrollView, DrawerItem  } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTextInput, MyBoton } from "../components/";
import HomeScreen from '../screens/HomeScreen';
import Gu from '../screens/GuScreen';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-fontawesome';
import AccountsNavigator from './accounts/AccountsNavigation';
import TagsNavigator from './tags/TagsNavigator';
import ExpensesNavigator from "./expenses/ExpensesNavigation";
import IncomesNavigator from "./incomes/IncomesNavigation";
import SavingsNavigator from "./Savings/SavingsNavigation";
import GoalsNavigator from "./goals/GoalsNavigation";
import Logout from '../screens/auth/Logout';
import payload from "../screens/balance/BalanceForm"

const ImgLogo = require("../../assets/MLogo.jpg");

/*
aqui quiero poner la navegacion del usuario loegeado
*/

const Home = createDrawerNavigator();
const MainStack = createNativeStackNavigator();
//const Home = createBottomTabNavigator();
//const isDrawerOpen = useDrawerStatus() === 'open';
const HomeNavigation = ({navigation}) => {

    return (
        <Home.Navigator initialRouteName="Home" >
            <Home.Screen name ="Inicio" component={Gu}/>
            <Home.Screen name="Cuentas" component={AccountsNavigator}/>
            <Home.Screen name="Etiquetas" component={TagsNavigator}/>
            <Home.Screen name="Gastos" component={ExpensesNavigator}/>
            <Home.Screen name="Ingresos" component={IncomesNavigator}/>
            <Home.Screen name="Ahorros" component={SavingsNavigator}/>
            <Home.Screen name="Metas" component={GoalsNavigator}/>
            <Home.Screen name="Balance" component={payload}/>
            <Home.Screen name="Cerrar Sesion" component={Logout}/>
           
            
        </Home.Navigator>
    );
 
}

export default HomeNavigation;

//drawerContent={ (props) => <MenuItems {...props}/>}
/*
const MenuItems = ({navigation}) => {
    return (
        <DrawerContentScrollView>
            <Text>
                Mi menu
            </Text>
        </DrawerContentScrollView>
    )
}



const MainPage = ({navigation}) => {
    return (
        <MainStack.Navigator initialRouteName='MainPage'>
            <MainStack.Screen name ="Home" component={Gu} 
                options={({navigation})=> ({
                    headerLeft: () => (
                        <Icon name = {'menu'} onPress = {() => {navigation.openDrawer()}} />
                    )
                })}
                />
        </MainStack.Navigator>
    )
}
*/