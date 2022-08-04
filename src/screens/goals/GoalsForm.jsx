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

const Meta = ({ navigation }) => {
  const goalsDefault = {
    concept: "",
    start_date: "",
    end_date: "",
    amount: "",
    period: "",
    goal_color: "",
    // total: "",
    account_savings: "",
  };
  const [meta, setMeta] = React.useState(goalsDefault);
  const [accounts, setAccounts] = useState([]);
 
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());

  const { userInfo } = useContext(AuthContext);
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
  const enviarMeta = async () => {
    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/goals/`, meta, {
        headers: headers,
      });

      setLoading(false);
      alert("Nueva Meta Registrada");
      setMeta(goalsDefault);
    } catch (error) {
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const changeMeta = (text, name) => {
    setMeta({
      ...meta,
      [name]: text,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    let tempDate = new Date(currentDate);
    //let fDate = tempDate.getFullYear() + '-' (tempDate.getMonth()+1) + '-' tempDate.getDate();
    console.log(tempDate);
    //setShow(false);
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Concepto de la Meta:"
        place=" "
        value={meta.concept}
        setValue={(text) => changeMeta(text, "concept")}
      />

      <MyTextInput
        label="Fecha de Inicio:"
        place=" e.g. 2022-12-31 "
        value={meta.start_date}
        setValue={(text) => changeMeta(text, "start_date")}
      />

      <MyTextInput
        label="Fecha de Vencimiento:"
        place=" e.g. 2022-12-31 "
        value={meta.end_date}
        setValue={(text) => changeMeta(text, "end_date")}
      />

      <MyTextInput
        label="Importe:"
        place=" "
        value={meta.amount}
        setValue={(text) => changeMeta(text, "amount")}
      />

      <Text>Periodo:</Text>

      <Picker
        selectedValue={meta.period}
        onValueChange={(text) => changeMeta(text, "period")}
        placeholder="Periodo de Meta"
        mode="dropdown"
      >
        <Picker.Item label="Selecciona el tipo de periodo" />
        <Picker.Item label="Semanal" value="SEMANAL" />
        <Picker.Item label="Quincenal" value="QUINCENAL" />
        <Picker.Item label="Mensual" value="MENSUAL" />
      </Picker>

      <Text>Cuenta asociada:</Text>
      <Picker
        selectedValue={meta.account_savings}
        onValueChange={(text) => changeMeta(text, "account_savings")}
        placeholder="Tipo de cuenta"
        mode="dropdown"
      >
        <Picker.Item label="Selecciona cuenta de Ahorro" />
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

      {/* <MyTextInput
        label="Total:"
        place=" "
        value={meta.total}
        setValue={(text) => changeMeta(text, "total")}
      /> */}

      <MyBoton text="GUARDAR" onPress={enviarMeta} />
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

export default Meta;
