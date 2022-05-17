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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ImgLogo = require("../../assets/MLogo.jpg");

//"https://mymoneyhackademy.herokuapp.com/login/"
export default function Expenses({ navigation }) {
  const [gasto, setGasto] = React.useState({
    description: "",
    payment_date: "",
    concept: "",
    account_name: "",
    account_cbe: "",
    ticket_img: "",
  });
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());

  const ChangeUserInputs = (propiedad, value) => {
    setUser({
      ...user,
      [propiedad]: value,
    });
  };

  const enviarGasto = async () => {
    const access_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxODc3NDAyLCJpYXQiOjE2NTE4NzcxMDIsImp0aSI6ImI2YzkwMjlkOTBhODQ3MDJiZWQ3OTU5YmI3N2U1NTMxIiwidXNlcl9pZCI6NDh9.sLXmgxmR5Ix_CMTF2w9h7fTmyarvPIVt2ZGINozJ-gU";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://mymoneyhackademy.herokuapp.com/Expenses/",
        gasto,
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

  const changeGasto = (text, name) => {
    setGasto({
      ...gasto,
      [name]: text,
    });
  };
 
  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Nombre de Gasto:"
        place=" "
        value={gasto.description}
        setValue={(text) => changeGasto(text, "description")}
      />
      <Text>Fecha del Gasto:</Text>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      
      <MyTextInput
        label="Importe del Gasto:"
        place=" "
        value={gasto.current_balance}
        setValue={(text) => changeGasto(text, "current_balance")}
      />
      <Text>Concepto del Gasto:</Text>
      <Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
      </Picker>
      
      <Text>Cuenta Asociada:</Text>
      <Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />
      </Picker>

      <MyBoton text="GUARDAR" onPress={enviarGasto} />
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