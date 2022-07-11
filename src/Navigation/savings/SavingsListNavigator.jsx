import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavingsList from "../../screens/Savings/SavingsList"
import SavingsForm from '../../screens/Savings/savingsForm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavingsDetailScreen from "../../screens/Savings/SavingsDetailScreen";


const SavingsListStack = createNativeStackNavigator();

export default function SavingsListNavigator(){
    return(
       <SavingsListStack.Navigator>
           <SavingsListStack.Screen name="SavingsList" component={SavingsList} options={{headerShown: false}} />
           <SavingsListStack.Screen 
                name="SavingsDetail" 
                component={SavingsDetailScreen} 
                options={({ route }) => ({ title: 'Detalle de cuenta: ' + route.params.metas_name })}/>
       </SavingsListStack.Navigator> 
    )
}