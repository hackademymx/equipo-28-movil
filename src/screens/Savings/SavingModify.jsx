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

const SavingsModifyScreen = ({ navigation }) => {
  const route = useRoute();
  const [ahorro, setAhorro] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const updateSavings = (text, name) => {
    setAhorro({
      ...ahorro,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      setAhorro({
        ...route.params,
        account_fkey: route.params.account_fkey.id,
      });
    }
  }, [isFocused]);
  console.log(ahorro);

  const SavingsModify = async () => {
    try {
      let savId = route.params.id;
      console.log(savId);
      setLoading(true);
      const response = await request({
        data: ahorro,
        method: "put",
        url: `/movements/update/${savId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("SavingsList");
      alert("Se actualizó Ahorro");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const deleteAhorro = async () => {
    try {
      let savId = route.params.id;
      console.log("Intento eliminar Id de cuenta " + savId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/movements/update/${savId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("SavingsList");
      alert("Se eliminó Ahorro");

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
        label=" Importe:"
        place={ahorro.amount}
        value={ahorro.amount}
        setValue={(text) => updateSavings(text, "amount")}
      />

      <MyTextInput
        label="Descripcion:"
        place={ahorro.description}
        value={ahorro.description}
        setValue={(text) => updateSavings(text, "description")}
      />

      <TouchableOpacity style={styles.boton1} onPress={SavingsModify}>
        <Text style={styles.texto1}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton2} onPress={deleteAhorro}>
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

export default SavingsModifyScreen;
