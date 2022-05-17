import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accountlist from "../views/accounts/accountlist";
import Accountform from "../views/accounts/accountform";

const BottomTab = createBottomTabNavigator()

export default function AccountsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Cuenta" component={Accountform} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Cuentas" component={Accountlist} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}