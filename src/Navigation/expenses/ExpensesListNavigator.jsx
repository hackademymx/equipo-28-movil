import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpensesList from "../../screens/expenses/ExpensesList";
import ExpensesForm from "../../screens/expenses/ExpensesForm";
import ExpensesModifyScreen from "../../screens/expenses/ExpensesModifyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensesDetailScreen from "../../screens/expenses/ExpensesDetailScreen";

const ExpensesListStack = createNativeStackNavigator();

export default function AccountListNavigator() {
  return (
    <ExpensesListStack.Navigator>
      <ExpensesListStack.Screen
        name="ExpensesList"
        component={ExpensesList}
        options={{ headerShown: false }}
      />
      <ExpensesListStack.Screen
        name="ExpensesDetail"
        component={ExpensesDetailScreen}
        options={{ headerShown: false }}
      />
      <ExpensesListStack.Screen
        name="ExpensesModify"
        component={ExpensesModifyScreen}
        options={{ headerShown: false }}
      />
    </ExpensesListStack.Navigator>
  );
}
