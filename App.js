import 'react-native-gesture-handler';
import RNAnimated from "react-native-animated-component";
import { Animated} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./views/main";
import Home from "./views/home";
import Login from "./views/login"
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons";
//import {IconButton} from 'react-native-vector-icons/dist/lib/icon-button';


const Stack= createNativeStackNavigator();

// const MainStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const MainStackScreen=({navigation}) => (
//     <MainStack.Navigator style={styles.container}>
//       <MainStack.Screen name="Main" component={MainScreen} options={{title: "Overview", 
//       headerLeft:() => (
//       <Icon.Button name="ios-menu" onPress={() =>navigation.openDrawer()}></Icon.Button>
//       )
//       }} />
//     </MainStack.Navigator>
// );

// const HomeStackScreen=({navigation}) => (
//   <HomeStack.Navigator>
//     <HomeStack.Screen name="Main" component={Main} />
//     <HomeStack.Screen name="Home" component={HomeScreen} />
//     <HomeStack.Screen name="Login" component={Login} />
//   </HomeStack.Navigator>
//);
const App = () => {
  return (
    <NavigationContainer>
    {/* //   <Drawer.Navigator initialRouteName='Main'>
    //   <Drawer.Screen name="Main" component={MainStackScreen} />
    //   <Drawer.Screen name="Home" component={HomeStackScreen} />
    //   <Drawer.Screen name="Login" component={Login} />
    // </Drawer.Navigator> */}
       <Stack.Navigator>
        <Stack.Screen
          component={Main}
          name="Main"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={Home} name="Home"  options={{ title: 'Volver al Inicio' }}/>
        <Stack.Screen component={Login} name="Login" />
      </Stack.Navigator> 
    </NavigationContainer>
  ); 
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     flexDirection: "column",
//     fontSize: 5,
//   },
// });

export default App