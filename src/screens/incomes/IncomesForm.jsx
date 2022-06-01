import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components/";

import {BASE_URL} from '../../config';

const ImgLogo = require("../../../assets/MLogo.jpg");

//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const HomeScreen = ({navigation}) => {
 

  const [ingreso, setIngreso] = React.useState({
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
        label="Nombre:"
        place="e.g. Ingreso de nómina"
        value={ingreso.account_name}
        setValue={(text) => changeIngreso(text, "incomes_name")}
      />
      <Text>Tipo de ingreso:</Text>
      
      
      <Picker
        selectedValue={ingreso.type_account}
        onValueChange={(text) => changeIngreso(text, "type_income")}
        placeholder="Tipo de ingreso"
        mode = "dropdown"
      >
        <Picker.Item label="Selecciona el tipo de ingreso" />
        <Picker.Item label="Efectivo" value="EFECTIVO" />
        <Picker.Item label="Crédito" value="CREDITO" />
        <Picker.Item label="Ahorros" value="AHORRO" />
        <Picker.Item label="Nómina" value="NOMINA" />
        <Picker.Item label="Inversiones" value="INVERSION" />
        <Picker.Item label="Wallet" value="WALLET" />
        <Picker.Item label="Vales" value="VALES" />
      </Picker>

      {ingreso.type_account!="EFECTIVO"&&<MyTextInput
        label="Número de ingreso:"
        place=" "
        value={ingreso.account_num}
        setValue={(text) => changeIngreso(text, "account_num")}
      />}

      <MyTextInput
        label="Saldo Actual:"
        place=" "
        value={ingreso.current_balance}
        setValue={(text) => changeIngreso(text, "current_balance")}
      />
      {/*<Text>Fecha de Corte:</Text>*/}

      <MyTextInput
        label="Clabe Interbancaria:"
        place=" "
        value={ingreso.account_cbe}
        setValue={(text) => changeIngreso(text, "account_cbe")}
      />
      

      <MyTextInput
        label="Fecha de corte:"
        place=" e.g. 2022-12-31 "
        value={ingreso.cutoff_date}
        setValue={(text) => changeIngreso(text, "cutoff_date")}
      />

{/*}
      <DatePicker 
        selected={ingreso.cutoff_date} 
        onChange={(text) => changeingreso(text, "cutoff_date")} 
      />
*/}

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



export default HomeScreen;

