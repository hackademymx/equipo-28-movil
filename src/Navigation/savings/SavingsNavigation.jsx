import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavingstList from '../../screens/Savings/SavingsList';
import SavingsForm from '../../screens/Savings/savingsForm';
import SavingsListNavigator from "./SavingsListNavigator";


const BottomTab = createBottomTabNavigator()

export default function SavingsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Cuenta" component={SavingsForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Cuentas" component={SavingsForm} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}