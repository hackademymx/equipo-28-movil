import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Incomes from "../views/incomes";

const BottomTab = createBottomTabNavigator()

export default function IncomesNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Ingreso" component={Incomes} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Ingresos" component={Incomes} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}