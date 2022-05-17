import React from "react";
import { View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Accountlist = () => {
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      console.log("hola mundo");
    }
  }, [isFocused]);
  return (
    <View>
      <Text> Hola Mundo soy lista de cuentas</Text>
    </View>
  );
};

export default Accountlist;
