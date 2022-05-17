
import{View, ActivityIndicator} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Principal from "./views/main";
import Registro from "./views/home";
import Inicio from "./views/login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountsNavigator from "./navigation/accounts";
import TagsNavigator from "./navigation/tags";
import ExpensesNavigator from "./navigation/expenses";
import IncomesNavigator from "./navigation/incomes";
import { AuthContext } from "./context/AuthContext";
const Menu = createDrawerNavigator();

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const authContext = React.useMemo(() => ({
    singIn: () => {
      setUserToken();
      setLoading(false);
    },
    singOut: () => {
      setUserToken(null);
      setLoading(false);
    },
    singUp: () => {
      setUserToken();
      setLoading(false);
    },
  }));

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  
  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Menu.Navigator>
          <Menu.Screen name="Principal" component={Principal}/>
          <Menu.Screen name="Inicio" component={Inicio}/>
          <Menu.Screen name="Registro" component={Registro}/>
          <Menu.Screen name="Cuentas" component={AccountsNavigator}/>
          <Menu.Screen name="Etiquetas" component={TagsNavigator}/>
          <Menu.Screen name="Gastos" component={ExpensesNavigator}/>
          <Menu.Screen name="Ingresos" component={IncomesNavigator}/>
        </Menu.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App