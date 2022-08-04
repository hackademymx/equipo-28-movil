import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MetaList from "../../screens/goals/GoalsList";
import GoalForm from "../../screens/goals/GoalsForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MetaDetailScreen from "../../screens/goals/GoalsDetailScreen";
import ModifyMeta from "../../screens/goals/GoalsModify";

const GoalsListStack = createNativeStackNavigator();

export default function GoalsListNavigator() {
  return (
    <GoalsListStack.Navigator>
      <GoalsListStack.Screen
        name="MetaList"
        component={MetaList}
        options={{ headerShown: false }}
      />
      <GoalsListStack.Screen
        name="MetaDetail"
        component={MetaDetailScreen}
        options={{ headerShown: false }}
      />
      <GoalsListStack.Screen
        name="ModifyMeta"
        component={ModifyMeta}
        options={{ headerShown: false }}
      />
    </GoalsListStack.Navigator>
  );
}
