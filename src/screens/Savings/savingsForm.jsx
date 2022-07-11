import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import { MyTextInput, MyBoton } from "../../components/";
import request from "../../api"
import {BASE_URL} from '../../config';

const ImgLogo = require("../../../assets/MLogo.jpg");


const Savings = ({navigation}) => {
 
  const cuentaDefault = {
    concept: "",
    start_date: "",
    end_date: "",
    amount: "",
    period: "",
    goal_color: "",
    total:"",
    account_savings:"",
  };
  const [ahorro, setAhorro] = React.useState(ahorroDefault);
  //const [isLoading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date())

  const {userInfo} = useContext(AuthContext);

  const enviarAhorro = async () => {

    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try { 
      
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/goals/`,
        ahorro,
        { headers: headers }
      );

      setLoading(false);
      alert('Meta Registrada');
      setAhorro(ahorroDefault);
    } catch (error) {
      
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
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

  const showMode = (currentMode) => {
     setShow(true);
     setMode(currentMode);
  }

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
        label="Concepto de Meta:"
        place=" "
        value={ahorro.concept}
        setValue={(text) => changeAhorro(text, "concept")}
      />

     <MyTextInput
        label="Fecha de Inicio:"
        place=" e.g. 2022-12-31 "
        value={ahorro.start_date}
        setValue={(text) => changeAhorro(text, "start_date")}
      />

<MyTextInput
        label="Fecha de Vencimiento:"
        place=" e.g. 2022-12-31 "
        value={ahorro.end_date}
        setValue={(text) => changeAhorro(text, "end_date")}
      />

<MyTextInput
        label="Importe:"
        place=" "
        value={ahorro.amount}
        setValue={(text) => changeAhorro(text, "amount")}
      />

      <Text>Periodo:</Text>
      
      <Picker
        selectedValue={ahorro.period}
        onValueChange={(text) => changeAhorro(text, "period")}
        placeholder="Periodo de Ahorro"
        mode = "dropdown"
      >
        <Picker.Item label="Selecciona el tipo de periodo" />
        <Picker.Item label="Semanal" value="SEMANAL" />
        <Picker.Item label="Quincenal" value="QUINCENAL" />
        <Picker.Item label="Mensual" value="MENSUAL" />

      </Picker>

      {/*cuenta.type_account!="EFECTIVO"&&*/}
      <MyTextInput
        label="Número de cuenta:"
        place=" "
        value={ahorro.account_saving}
        setValue={(text) => changeCuenta(text, "account_saving")}
      />

      <MyTextInput
        label="Saldo Actual:"
        place=" "
        value={cuenta.total}
        setValue={(text) => changeCuenta(text, "total")}
      />
     

      <MyBoton text="GUARDAR" onPress={enviarAhorro} />
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



export default Savings;