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
import { AuthProvider } from "./context/AuthContext";
import TagsNavigator from "./navigation/tags";
import ExpensesNavigator from "./navigation/expenses";
import IncomesNavigator from "./navigation/incomes";
const Menu = createDrawerNavigator();

export default function App() {
  return(
    <AuthProvider>
      <NavigationContainer>
        <Menu.Navigator>
          <Menu.Screen name="Pantalla Principal" component={Main}/>
          <Menu.Screen name="Inicio de Sesión" component={Login}/>
          <Menu.Screen name="Registro" component={Home}/>
          <Menu.Screen name="Cuentas" component={AccountsNavigator}/>
          <Menu.Screen name="Etiquetas" component={TagsNavigator}/>
          <Menu.Screen name="Gastos" component={ExpensesNavigator}/>
          <Menu.Screen name="Ingresos" component={IncomesNavigator}/>
        </Menu.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

