import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accounts from "../views/accounts";

const BottomTab = createBottomTabNavigator()

export default function AccountsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Ver cuenta" component={Accounts} options={{headerShown: false}} />
           <BottomTab.Screen name="crear cuenta" component={Accounts} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}