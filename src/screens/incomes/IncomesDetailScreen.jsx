import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
 } from "react-native";
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

const IncomesDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const [incomes, setIncomes] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const updateIncomes = (text, name) => {
    setIncomes({
      ...incomes,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getIncomesDetail();
    }
  }, [isFocused]);

  const getIncomesDetail = async () => {
    try {
      let incId = route.params.id;
      console.log("Id de cuenta" + incId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/movements/detail/${incId}`,
      }); 

      setLoading(false);
      setIncomes(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error);
    }
  };

  const modifyIncome = () => {
    navigation.navigate("IncomesModify", incomes);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <View style={styles.caption}>
        <Text style={styles.description}>Concepto del Ingreso</Text>
        <Text style={styles.value}> {incomes.flow_type} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Monto</Text>
        <Text style={styles.value}> {incomes.amount} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Descripción</Text>
        <Text style={styles.value}> {incomes.description} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Cuenta</Text>
        <Text style={styles.value}> {incomes.account_fkey?.account_name} </Text>
      </View>

      <TouchableOpacity style={styles.boton1} onPress={modifyIncome}>
        <Text style={styles.texto1}>¿Deseas modificar este Ingreso? </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    borderWidth: 1,
    padding: 10,
    borderColor: "#000",
    borderRadius: 10,
    alignSelf: "center",
  },
  texto1: {
    fontFamily: "Calibri",
    fontSize: 13,
    color: "#fff",
    alignSelf: "center",
    padding: 0,
  },
  caption: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingHorizontal: 5,
  },
  description: {
    fontWeight: "700",
    color: "#B5A8A6",
  },
  value: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default IncomesDetailScreen;
