import axios from "axios";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
} from "react-native";
import { MyTextInput, MyBoton } from "../../components/";
import { Picker } from "@react-native-picker/picker";

const ImgLogo = require("../../assets/MLogo.jpg");


export default function Tags({ navigation }) {
  const [etiqueta, setEtiqueta] = React.useState({
    description: "",
    tag_type: "",
    clasification: "",
    color: "",
  });
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();

  const ChangeUserInputs = (propiedad, value) => {
    setUser({
      ...user,
      [propiedad]: value,
    });
  };

  const enviarEtiqueta = async () => {
    const access_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxODc3NDAyLCJpYXQiOjE2NTE4NzcxMDIsImp0aSI6ImI2YzkwMjlkOTBhODQ3MDJiZWQ3OTU5YmI3N2U1NTMxIiwidXNlcl9pZCI6NDh9.sLXmgxmR5Ix_CMTF2w9h7fTmyarvPIVt2ZGINozJ-gU";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://mymoneyhackademy.herokuapp.com/accounts/",
        etiqueta,
        { headers: headers }
      );

      setLoading(false);
    } catch (error) {
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const changeEtiqueta = (text, name) => {
    setEtiqueta({
      ...etiqueta,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Descripción:"
        place=" "
        value={etiqueta.account_name}
        setValue={(text) => changeEtiqueta(text, "description")}
      />
    <Text>Tipo:</Text>
      <Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label="Gasto" value="Gasto" />
        <Picker.Item label="Ingreso" value="Ingreso" />

      </Picker>

      <Text>Clasificación:</Text>
      <Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label="Fijo" value="Fijo" />
        <Picker.Item label="Variable" value="Variable" />

      </Picker>

      <Text>Color:</Text>
      <Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />

      </Picker>
      
      
      <MyBoton text="GUARDAR" onPress={enviarEtiqueta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 40,
    justifyContent: "space-evenly",
    fontSize: 5,
  },
  logoMoney: {
    height: 90,
    width: 90,
    alignSelf: "flex-end",
    margin: 0,
  },
});