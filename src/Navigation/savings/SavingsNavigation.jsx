import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavingsList from "../../screens/Savings/SavingsList";
import SavingsForm from "../../screens/Savings/SavingsForm";
import SavingsListNavigator from "./SavingsListNavigator";


const BottomTab = createBottomTabNavigator()

export default function SavingsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Ahorro" component={SavingsForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Ahorros" component={SavingsListNavigator} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}