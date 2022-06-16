import React from "react";
import { View } from "react-native";
import { Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";


const Logout = ({ navigation }) => {
    const {logout} = React.useContext(AuthContext)
  return (
    <View>
      <Button title="Cerrar sesion" onPress={logout}/>
    </View>
  );
};

export default Logout;
