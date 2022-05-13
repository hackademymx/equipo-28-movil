import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tags from "../views/tags";

const BottomTab = createBottomTabNavigator()

export default function TagsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Crear etiquetas" component={Tags} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver etiquetas" component={Tags} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}