import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountList from '../../screens/accounts/AccountList';
import AccountForm from '../../screens/accounts/AccountForm';
import AccountListNavigator from "./AccountListNavigator";


const BottomTab = createBottomTabNavigator()

export default function AccountsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Cuenta" component={AccountForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Cuentas" component={AccountListNavigator} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}