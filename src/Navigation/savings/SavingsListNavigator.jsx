import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavingsList from "../../screens/Savings/SavingsList";
import SavingsForm from "../../screens/Savings/SavingsForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavingsDetailScreen from "../../screens/Savings/SavingsDetailScreen";
import SavingsModify from "../../screens/Savings/SavingModify";

const SavingsListStack = createNativeStackNavigator();

export default function SavingsListNavigator() {
  return (
    <SavingsListStack.Navigator>
      <SavingsListStack.Screen
        name="SavingsList"
        component={SavingsList}
        options={{ headerShown: false }}
      />
      <SavingsListStack.Screen
        name="SavingsDetail"
        component={SavingsDetailScreen}
        options={{ headerShown: false }}
         // title: "Detalle del Ahorro: " + route.params.ahorro.concept,
        
      />
      <SavingsListStack.Screen
        name="SavingsModify"
        component={SavingsModify}
        options={{ headerShown: false }}
      />
    </SavingsListStack.Navigator>
  );
}
