import React, {useContext, useState, useEffect} from 'react';
import { useIsFocused } from "@react-navigation/native";
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components/";
import request from "../../api";
import APIPicker from '../../components/ApiPicker';


import {BASE_URL} from '../../config';

const ImgLogo = require("../../../assets/MLogo.jpg");

const HomeScreen = ({navigation}) => {
 

  const [gasto, setGasto] = React.useState({
    description: "",
    account_fkey: "",
    amount: "",
    flow_type: "EGRESOS",
    image: null,
    });
  
  const [accounts, setAccounts] = useState([]);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getUserAccounts();
      console.log(accounts)
    };
  }, [isFocused]);

  const getUserAccounts = async () => {
    try {
      setLoading(true)
      const response = await request({method: 'get', url: '/accounts/'}); //aqui tengo todas las cuentas y su info, pero yo solo quiero un array con su id y nombre?
      setAccounts(response.data)
      setLoading(false)
    }
    catch (error){
      setLoading(false);
     // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  }

  const enviarGasto = async () => {


    try { 
      
      setLoading(true);
      const response = await request({method: 'post', url: '/movements/', data: gasto});//await axios.post(`${BASE_URL}/movements/`,
      /*  gasto,
        { headers: headers }
      );*/
      //const response = await request({method: 'post', data:gasto, url: '/movements/'})
      
      setLoading(false);
      alert('Nuevo Gasto registrado');
    } catch (error) {
      setLoading(false);
     // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
      // const data = error.response.data;
      // setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      // console.error(error);
      // alert(error);
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
        label="Descripcion del Gasto:"
        place=" "
        value={gasto.description}
        setValue={(text) => changeGasto(text, "description")}
      />

      {/*<MyTextInput
        label="INGRESOS O EGRESOS:"
        place="e.g. INGRESOS O EGRESOS"
        value={gasto.flow_type}
        setValue={(text) => changeGasto(text, "flow_type")}
  />*/}

      <MyTextInput
        label="Importe:"
        place=" "
        value={gasto.amount}
        setValue={(text) => changeGasto(text, "amount")}
      />

      {/* <MyTextInput
        label="Concepto:"
        place=" "
        value={gasto.tag}
        setValue={(text) => changeGasto(text, "tag")}
      /> */}

       {/* <MyTextInput
        label="ID Cuenta Asociada:"
        place=" "
        value={gasto.account_fkey}
        setValue={(text) => changeGasto(text, "account_fkey")}
      /> */}
{/* 
      <MyTextInput
        label="Egreso o Ingreso:"
        place=" "
        value={gasto.flow_type}
        setValue={(text) => changeGasto(text, "flow_type")}
      /> */}
  <Text>Cuenta asociada:</Text>
      <APIPicker url="/accounts/" 
        selectedValue={gasto.account_fkey}
        onValueChange={(text) => changeGasto(text, "account_fkey")}
        placeholder="Tipo de cuenta"
        labelmain="Selecciona una cuenta"
        itemlabel="account_name"
        />


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


export default HomeScreen;

