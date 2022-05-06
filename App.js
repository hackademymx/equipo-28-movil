import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./views/main";
import Home from "./views/home";
import Login from "./views/login";
import Accounts from "./views/accounts";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountsNavigator from "./navigation/accounts";


const Menu = createDrawerNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen name="Main" component={Main}/>
        <Menu.Screen name="Login" component={Login}/>
        <Menu.Screen name="Home" component={Home}/>
        <Menu.Screen name="Accounts" component={AccountsNavigator}/>
      </Menu.Navigator>
    </NavigationContainer>
  )
}

