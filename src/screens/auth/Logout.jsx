import React from "react";
import { View } from "react-native";
import { MyBoton } from "../../components";
import { AuthContext } from "../../context/AuthContext";


const Logout = ({ navigation }) => {
    const {logout} = React.useContext(AuthContext)
  return (
    <View>
      <MyBoton title="Cerrar sesion" text= "Cerrar sesión" onPress={logout}  />
    </View>
  );
};

export default Logout;
