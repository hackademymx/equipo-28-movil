import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpensesList from "../../screens/expenses/ExpensesList"
import ExpensesForm from "../../screens/expenses/ExpensesForm"
import ExpensesListNavigator from "./ExpensesListNavigator";


const BottomTab = createBottomTabNavigator()

export default function ExpensesNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Gasto" component={ExpensesForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Gastos" component={ExpensesListNavigator} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}