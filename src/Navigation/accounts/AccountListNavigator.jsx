import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountList from "../../screens/accounts/AccountList";
import AccountForm from "../../screens/accounts/AccountForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountDetailScreen from "../../screens/accounts/AccountDetailScreen";

const AccountListStack = createNativeStackNavigator();

export default function AccountListNavigator() {
  return (
    <AccountListStack.Navigator>
      <AccountListStack.Screen
        name="AccountList"
        component={AccountList}
        options={{ headerShown: false }}
      />
      <AccountListStack.Screen
        name="AccountDetail"
        component={AccountDetailScreen}
        options={{ headerShown: false }}
      />
    </AccountListStack.Navigator>
  );
}
