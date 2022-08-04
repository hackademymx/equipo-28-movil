import React, { useContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components/";
import request from "../../api";

import { BASE_URL } from "../../config";

const ImgLogo = require("../../../assets/MLogo.jpg");

const IncomesHomeScreen = ({ navigation }) => {
  const [ingreso, setIngreso] = React.useState({
    flow_type: "INGRESOS",
    amount: "",
    description: "",
    account_fkey: "",
  });
  //const [isLoading, setLoading] = React.useState(false);
  const [accounts, setAccounts] = useState([]);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);
 

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getUserAccounts();
      console.log(accounts);
    }
  }, [isFocused]);

  const getUserAccounts = async () => {
    try {
      setLoading(true);
      const response = await request({ method: "get", url: "/accounts/" }); //aqui tengo todas las cuentas y su info, pero yo solo quiero un array con su id y nombre?
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  
  const enviarIngreso = async () => {
    try {
      setLoading(true);
      const response = await request({
        method: "post",
        url: "/movements/",
        data: ingreso,
      });

      setLoading(false);
      alert("Nuevo Ingreso registrado");
    } catch (error) {
      setLoading(false);

      console.error(error);
      alert(error);
    }
  };

  const changeIngreso = (text, name) => {
    setIngreso({
      ...ingreso,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Concepto del Ingreso:"
        place=" "
        value={ingreso.flow_type}
        setValue={(text) => changeIngreso(text, "flow_type")}
      />

      {/* <MyTextInput
        label="Fecha:"
        place=" e.g. 2022-12-31 "
        value={ingreso.incomes_date}
        setValue={(text) => changeIngreso(text, "incomes_date")}
      /> */}

      <MyTextInput
        label="Monto:"
        place=" "
        value={ingreso.amount}
        setValue={(text) => changeIngreso(text, "amount")}
      />

      <MyTextInput
        label="Descripción:"
        place=" "
        value={ingreso.description}
        setValue={(text) => changeIngreso(text, "description")}
      />

      <Text>Cuenta asociada:</Text>
      <Picker
        selectedValue={ingreso.account_fkey}
        onValueChange={(text) => changeIngreso(text, "account_fkey")}
        placeholder="Tipo de cuenta"
        mode="dropdown"
      >
        <Picker.Item label="Selecciona una cuenta" />
        {accounts !== [] ? (
          accounts.map((acc, idx) => {
            return (
              <Picker.Item
                label={acc.account_name}
                value={acc.id}
                key={`account-${idx}`}
              />
            );
          })
        ) : (
          <Picker.Item label="Loading..." />
        )}
      </Picker>

      <MyBoton text="GUARDAR" onPress={enviarIngreso} />
    </View>
  );
};

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

export default IncomesHomeScreen;
