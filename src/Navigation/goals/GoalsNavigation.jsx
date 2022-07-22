import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GoalsList from "../../screens/goals/GoalsList";
import GoalsForm from "../../screens/goals/GoalsForm";
import GoalsListNavigator from "./GoalsListNavigator";


const BottomTab = createBottomTabNavigator()

export default function GoalsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Meta" component={GoalsForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Metas" component={GoalsListNavigator} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}