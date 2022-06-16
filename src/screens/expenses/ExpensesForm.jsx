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
import request from "../../api";

import {BASE_URL} from '../../config';

const ImgLogo = require("../../../assets/MLogo.jpg");

const HomeScreen = ({navigation}) => {
 

  const [gasto, setGasto] = React.useState({
    description: "",
    account_fkey: "",
    amount: "",
    flow_type: "",
    image: null,
    });

  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);

  const {userInfo} = useContext(AuthContext);

  const enviarGasto = async () => {

    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try { 
      
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/movements/`,
        gasto,
        { headers: headers }
      );
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

      <MyTextInput
        label="INGRESOS O EGRESOS:"
        place="e.g. INGRESOS O EGRESOS"
        value={gasto.flow_type}
        setValue={(text) => changeGasto(text, "flow_type")}
      />

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

       <MyTextInput
        label="ID Cuenta Asociada:"
        place=" "
        value={gasto.account_fkey}
        setValue={(text) => changeGasto(text, "account_fkey")}
      />
{/* 
      <MyTextInput
        label="Egreso o Ingreso:"
        place=" "
        value={gasto.flow_type}
        setValue={(text) => changeGasto(text, "flow_type")}
      /> */}


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

