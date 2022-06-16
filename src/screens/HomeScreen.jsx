import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../components/";

import {BASE_URL} from '../config';

const ImgLogo = require("../../assets/MLogo.jpg");

/*
aqui quiero poner la navegacion del usuario loegeado
*/


//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const HomeScreen = ({navigation}) => {
 

  const [cuenta, setCuenta] = React.useState({
    account_name: "",
    type_account: "",
    account_num: "",
    current_balance: "",
    account_cbe: "",
    cutoff_date: "",
  });
  //const [isLoading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);

  const {userInfo, logout} = useContext(AuthContext);

  const enviarCuenta = async () => {

    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try { 
      
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/accounts/`,
        cuenta,
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

  const changeCuenta = (text, name) => {
    setCuenta({
      ...cuenta,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Nombre:"
        place="e.g. cuenta de nómina"
        value={cuenta.account_name}
        setValue={(text) => changeCuenta(text, "account_name")}
      />
      <Text>Tipo de Cuenta:</Text>
      {/*
      <MyTextInput
        label="Tipo de cuenta:"
        place="e.g. ahorro"
        value={cuenta.type_account}
        setValue={(text) => changeCuenta(text, "type_account")}
      />
  */}
      
      <Picker
        selectedValue={cuenta.type_account}
        onValueChange={(text) => changeCuenta(text, "type_account")}
        placeholder="Tipo de cuenta"
        mode = "dropdown"
      >
        <Picker.Item label="Selecciona el tipo de cuenta" />
        <Picker.Item label="Efectivo" value="EFECTIVO" />
        <Picker.Item label="Crédito" value="CREDITO" />
        <Picker.Item label="Ahorros" value="AHORRO" />
        <Picker.Item label="Nómina" value="NOMINA" />
        <Picker.Item label="Inversiones" value="INVERSION" />
        <Picker.Item label="Wallet" value="WALLET" />
        <Picker.Item label="Vales" value="VALES" />
      </Picker>

      <MyTextInput
        label="Número de cuenta:"
        place=" "
        value={cuenta.account_num}
        setValue={(text) => changeCuenta(text, "account_num")}
      />

      <MyTextInput
        label="Clabe Interbancaria:"
        place=" "
        value={cuenta.account_cbe}
        setValue={(text) => changeCuenta(text, "account_cbe")}
      />
      <MyTextInput
        label="Saldo Actual:"
        place=" "
        value={cuenta.current_balance}
        setValue={(text) => changeCuenta(text, "current_balance")}
      />
      {/*<Text>Fecha de Corte:</Text>*/}

      <MyTextInput
        label="Fecha de corte:"
        place=" "
        value={cuenta.cutoff_date}
        setValue={(text) => changeCuenta(text, "cutoff_date")}
      />

{/*}
      <DatePicker 
        selected={cuenta.cutoff_date} 
        onChange={(text) => changeCuenta(text, "cutoff_date")} 
      />
*/}

      <MyBoton text="GUARDAR" onPress={enviarCuenta} />
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

/*<DatePicker 
        selected={cuenta.cutoff_date} 
        onChange={(text) => changeCuenta(text, "cutoff_date")} 
      />*/
  
  /*<DatePicker 
        date = {cuenta.cutoff_date}
        mode="date"
        onDateChange={(text) => changeCuenta(text, "cutoff_date")}
      />*/


  /*
  (
    <View style={styles.container}>
      
      <Text style={styles.welcome}>Welcome {userInfo.tokens.access}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});
*/

export default HomeScreen;
