import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accounts from "../views/accounts";

const BottomTab = createBottomTabNavigator()

export default function AccountsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Cuenta" component={Accounts} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Cuentas" component={Accounts} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}