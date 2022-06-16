import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components/";

import {BASE_URL} from '../../config';

const ImgLogo = require("../../../assets/MLogo.jpg");

//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const IncomesHomeScreen = ({navigation}) => {
 

  const [ingreso, setIngreso] = React.useState({
    incomes_concept: "",
    incomes_date: "",
    incomes_amount: "",
    incomes_description: "",
    income_account: "",
  });
  //const [isLoading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);

  const {userInfo} = useContext(AuthContext);

  const enviarIngreso = async () => {

    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try { 
      
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/incomes/`,
        ingreso,
        { headers: headers }
      );

      setLoading(false);
      alert('Ingreso registrado');
    } catch (error) {
      
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
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
        value={ingreso.incomes_concept}
        setValue={(text) => changeIngreso(text, "incomes_concept")}
      />

      <MyTextInput
        label="Fecha:"
        place=" e.g. 2022-12-31 "
        value={ingreso.incomes_date}
        setValue={(text) => changeIngreso(text, "incomes_date")}
      />

      <MyTextInput
        label="Monto:"
        place=" "
        value={ingreso.incomes_amount}
        setValue={(text) => changeIngreso(text, "incomes_amount")}
      />

      <MyTextInput
        label="Description:"
        place=" "
        value={ingreso.incomes_description}
        setValue={(text) => changeIngreso(text, "incomes_description")}
      />
      

      <MyTextInput
        label="Cuenta:"
        place=" "
        value={ingreso.income_account}
        setValue={(text) => changeIngreso(text, "income_account")}
      />

      <MyBoton text="GUARDAR" onPress={enviarIngreso} />
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



export default IncomesHomeScreen;

