import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expenses from "../views/expenses";

const BottomTab = createBottomTabNavigator()

export default function ExpensesNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Gasto" component={Expenses} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Gastos" component={Expenses} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}