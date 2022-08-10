import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
//import { MyTextInput, MyBoton } from "../components/";
import { BASE_URL } from "../../config";

//import { useState } from 'react/cjs/react.production.min';

const ImgLogo = require("../../../assets/MLogo.jpg");

//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const AccountDetailScreen = ({ navigation }) => {
  const route = useRoute(); //en vez de navigation.getParams
  const [account, setAccount] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const updateAccount = (text, name) => {
    setAccount({
      ...account,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getAccountDetail();
    }
  }, [isFocused]);


  const getAccountDetail = async () => {
    try {
      let accId = route.params.id;
      console.log("Id de cuenta" + accId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/accounts/${accId}`,
      }); //sin el último slash

      setLoading(false);
      setAccount(response.data);
      //console.log(account);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const modifyAccount = async () => {
    try {
      let accId = route.params.id;

      setLoading(true);
      const response = await request({
        data: account,
        method: "put",
        url: `/accounts/${accId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("AccountList");
      alert("Se actualizó Cuenta");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const deleteAccount = async () => {
    try {
      let accId = route.params.id;
      console.log("Intento eliminar Id de cuenta " + accId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/accounts/${accId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("AccountList");
      alert("Se eliminó Cuenta");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Nombre:"
        place={route.params.account_name}
        value={account.account_name}
        setValue={(text) => updateAccount(text, "account_name")}
      />

      <MyTextInput
        label="Tipo de cuenta:"
        place={account.type_account}
        value={account.type_account}
        setValue={(text) => updateAccount(text, "type_account")}
      />

      <MyTextInput
        label="Número de cuenta:"
        place={account.account_num}
        value={account.account_num}
        setValue={(text) => updateAccount(text, "account_num")}
      />

      <MyTextInput
        label="Saldo actual:"
        place={account.current_balance}
        value={account.current_balance}
        setValue={(text) => updateAccount(text, "current_balance")}
      />

      <MyTextInput
        label="Clabe interbancaria:"
        place={account.account_cbe}
        value={account.account_cbe}
        setValue={(text) => updateAccount(text, "account_cbe")}
      />

      <MyTextInput
        label="Fecha de corte:"
        place={account.cutoff_date}
        value={account.cutoff_date}
        setValue={(text) => updateAccount(text, "cutoff_date")}
      />

      <TouchableOpacity style={styles.boton1} onPress={modifyAccount}>
        <Text style={styles.texto1}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton2} onPress={deleteAccount}>
        <Text style={styles.texto1}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};
//navigation.getParam('id')

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
  boton1: {
    backgroundColor: "#000",
    height: 30,
    width: 162,
    borderWidth: 2,
    padding: 10,
    margin: 0,
    marginVertical: -0,
    borderColor: "#000",
    borderRadius: 10,
    alignSelf: "flex-start",
    position: "fixed",
    bottom: 50,
    right: "5%",
  },
  boton2: {
    backgroundColor: "#000",
    height: 30,
    width: 162,
    borderWidth: 2,
    padding: 10,
    marginVertical: -20,
    borderColor: "#000",
    borderRadius: 10,
    alignSelf: "flex-end",
    position: "fixed",
    bottom: 70,
    right: "52%",
  },
  texto1: {
    fontFamily: "Calibri",
    fontSize: 13,
    color: "#fff",
    alignSelf: "center",
    padding: 0,
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

export default AccountDetailScreen;

//() => console.log("Intento actualizar" + route.params.id)
