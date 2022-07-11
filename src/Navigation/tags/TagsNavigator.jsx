import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TagsScreen from "../../screens/tags/TagsScreen";
import TagsList from "../../screens/tags/TagsList"

const BottomTab = createBottomTabNavigator()

export default function TagsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Crear etiquetas" component={TagsScreen} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver etiquetas" component={TagsList} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}