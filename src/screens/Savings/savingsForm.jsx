import React, { useContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { MyTextInput, MyBoton } from "../../components/";
import request from "../../api";
import { BASE_URL } from "../../config";

const ImgLogo = require("../../../assets/MLogo.jpg");

const Savings = ({ navigation }) => {
  const [ahorro, setAhorro] = React.useState({
    concept: "",
    date_movement: "",
    amount: "",
    description: "",
    account_fkey: "",
    flow_type: "AHORROS",
  });
  const [accounts, setAccounts] = useState([]);
  // const [ahorro, setAhorro] = React.useState(savingsDefault);
  // //const [isLoading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);
  // const [show, setShow] = useState(false);
  // const [mode, setMode] = useState("date");
  // const [date, setDate] = useState(new Date());

  // const { userInfo } = useContext(AuthContext);

  // const enviarAhorro = async () => {
  //   const access_token = userInfo.tokens.access;
  //   const headers = {
  //     Authorization: `Bearer ${access_token}`,
  //   };

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`${BASE_URL}/movements/`, ahorro, {
  //       headers: headers,
  //     });

  //     setLoading(false);
  //     alert("Nuevo Ahorro Registrado");
  //     setAhorro(savingsDefault);
  //   } catch (error) {
  //     const data = error.response.data;
  //     setLoading(false);
  //     setError(data.msg ? data.msg : data.error);
  //     console.error(error);
  //     alert(error);
  //   }
  // };

  // const changeAhorro = (text, name) => {
  //   setAhorro({
  //     ...ahorro,
  //     [name]: text,
  //   });
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const onChangeDate = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   let tempDate = new Date(currentDate);
  //   //let fDate = tempDate.getFullYear() + '-' (tempDate.getMonth()+1) + '-' tempDate.getDate();
  //   console.log(tempDate);
  //   //setShow(false);
  // };

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

  const enviarAhorro = async () => {
    try {
      setLoading(true);
      const response = await request({
        method: "post",
        url: "/movements/",
        data: ahorro,
      });

      setLoading(false);
      alert("Nuevo Ahorro registrado");
    } catch (error) {
      setLoading(false);

      console.error(error);
      alert(error);
    }
  };

  const changeAhorro = (text, name) => {
    setAhorro({
      ...ahorro,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text>Tipo de Ahorro:</Text>
      {/* <Picker
        selectedValue={ahorro.period}
        onValueChange={(text) => changeAhorro(text, "period")}
        placeholder="Periodo de Ahorro"
        mode="dropdown"
      >
        <Picker.Item label="Selecciona el tipo de ahorro" />
        <Picker.Item label="Vacaciones" value="VACACIONES" />
        <Picker.Item label="Pago de Deudas" value="PAGO DE DEUDAS" />
        <Picker.Item label="Enganche" value="ENGANCHE" />
        <Picker.Item label="Colegiatura" value="COLEGIATURA" />
      </Picker> */}

      {/* <MyTextInput
        label="Fecha de Inicio:"
        place=" e.g. 2022-12-31 "
        value={ahorro.date_movement}
        setValue={(text) => changeAhorro(text, "date_movement")}
      /> */}

      <MyTextInput
        label="Importe:"
        place=" "
        value={ahorro.amount}
        setValue={(text) => changeAhorro(text, "amount")}
      />

      <MyTextInput
        label="Concepto de Ahorro:"
        place=" "
        value={ahorro.description}
        setValue={(text) => changeAhorro(text, "description")}
      />
      <Text>Cuenta asociada:</Text>
      <Picker
        selectedValue={ahorro.account_fkey}
        onValueChange={(text) => changeAhorro(text, "account_fkey")}
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

      <MyBoton text="GUARDAR" onPress={enviarAhorro} />
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

export default Savings;
