import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IncomesList from '../../screens/incomes/IncomesList';
import IncomesForm from '../../screens/incomes/IncomesForm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IncomesDetailScreen from "../../screens/incomes/IncomesDetailScreen";


const IncomesListStack = createNativeStackNavigator();

export default function IncomesListNavigator(){
    return(
       <IncomesListStack.Navigator>
           <IncomesListStack.Screen name="IncomesList" component={IncomesList} options={{headerShown: false}} />
           <IncomesListStack.Screen 
                name="IncomesDetail" 
                component={IncomesDetailScreen} 
                options={({ route }) => ({ title: 'Detalle de Ingresos: ' + route.params.incomes_name })}/>
       </IncomesListStack.Navigator> 
    )
}