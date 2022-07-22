import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import { BASE_URL } from "../../config";



const ImgLogo = require("../../../assets/MLogo.jpg");


const MetaDetailScreen = ({ navigation }) => {
  const route = useRoute(); //en vez de navigation.getParams
  const [meta, setMeta] = useState({});
  //const [account, setAccount] = useState([]);
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const updateMeta = (text, name) => {
    setMeta({
      ...meta,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getMetaDetail();
    }
  }, [isFocused]);

  const getMetaDetail = async () => {
    try {
      let metId = route.params.id;
      console.log("Id de cuenta" + metId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/goals/${metId}`,
      }); //sin el último slash

      setLoading(false);
      setMeta(response.data);
      //console.log(account);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const modifyMeta = async () => {
    try {
      let metId = route.params.id;

      setLoading(true);
      const response = await request({
        data: meta,
        method: "put",
        url: `/goals/${metId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("MetaList");
      alert("Se actualizó Cuenta");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const deleteMeta= async () => {
    try {
      let metId = route.params.id;
      console.log("Intento eliminar Id de ahorro " + metId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/goals/${metId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("MetaList");
      alert("Se eliminó Meta");

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
        label="Concepto de Meta:"
        place={route.params.meta.concept}
        value={meta.concept}
        setValue={(text) => changeMeta(text, "concept")}
      />

      <MyTextInput
        label="Fecha de Inicio:"
        place={meta.start_date}
        value={meta.start_date}
        setValue={(text) => changeMeta(text, "start_date")}
      />

      <MyTextInput
        label="Fecha de Vencimiento:"
        place={meta.end_date}
        value={meta.end_date}
        setValue={(text) => changeMeta(text, "end_date")}
      />

      <MyTextInput
        label="Importe:"
        place={meta.amount}
        value={meta.amount}
        setValue={(text) => changeMeta(text, "amount")}
      />
      <MyTextInput
        label="Periodo:"
        place={meta.period}
        value={meta.period}
        setValue={(text) => changeMeta(text, "period")}
      />

      <MyTextInput
        label="Número de cuenta:"
        place={account.account_num}
        value={account.account_num}
        setValue={(text) => changeCuenta(text, "account_num")}
      />

      <MyTextInput
        label="Saldo Actual:"
        place={account.current_balance}
        value={account.current_balance}
        setValue={(text) => changeCuenta(text, "current_balance")}
      />

      <TouchableOpacity style={styles.boton1} onPress={modifyMeta}>
        <Text style={styles.texto1}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton2} onPress={deleteMeta}>
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



export default MetaDetailScreen;

