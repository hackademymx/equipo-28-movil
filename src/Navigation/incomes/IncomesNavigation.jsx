import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IncomesList from "../../screens/incomes/IncomesList";
import IncomesForm from "../../screens/incomes/IncomesForm";
import IncomesListNavigator from "./IncomesListNavigator";

const BottomTab = createBottomTabNavigator();

export default function IncomesNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Agregar Ingreso"
        component={IncomesForm}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Ver Ingresos"
        component={IncomesListNavigator}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}
