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
import { BASE_URL } from "../../config";

const ImgLogo = require("../../../assets/MLogo.jpg");

const ModifyMetaScreen = ({ navigation }) => {
  const route = useRoute();
  const [meta, setMeta] = useState({});
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
      setMeta({
        ...route.params,
        account_fkey: route.params.account_fkey.id,
      });
    }
  }, [isFocused]);
  console.log(meta);

  const ModifyMeta = async () => {
    try {
      let metId = route.params.id;
      console.log(metId);
      setLoading(true);
      const response = await request({
        data: meta,
        method: "put",
        url: `/movements/update/${metId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("GoalsList");
      alert("Se actualizó Meta");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const deleteMeta = async () => {
    try {
      let metId = route.params.id;
      console.log("Intento eliminar Id de cuenta " + savId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/movements/update/${metId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("GoalsList");
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
        label=" Concepto:"
        place={meta.concept}
        value={meta.concept}
        setValue={(text) => updateMeta(text, "concept")}
      />

      <MyTextInput
        label="Monto:"
        place={meta.amount}
        value={meta.amount}
        setValue={(text) => updateMeta(text, "amount")}
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

export default ModifyMetaScreen;