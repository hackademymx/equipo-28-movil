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
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import { BASE_URL } from "../../config";
import { ActivityIndicator } from "react-native";

const ImgLogo = require("../../../assets/MLogo.jpg");

const ExpensesDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const [gasto, setGasto] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const updateGasto = (text, name) => {
    setGasto({
      ...gasto,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getExpensesDetail();
    }
  }, [isFocused]);

  const getExpensesDetail = async () => {
    try {
      let expId = route.params.id;
      console.log("Id de cuenta" + expId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/movements/update/${expId}`,
      });

      setLoading(false);
      setGasto(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error);
    }
  };

  const modifyExpenses = () => {
    navigation.navigate("ExpensesModify", gasto);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <View style={styles.caption}>
        <Text style={styles.description}>Descripción del Gasto</Text>
        <Text style={styles.value}> {gasto.description} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Importe</Text>
        <Text style={styles.value}> {gasto.amount} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Cuenta Asociada</Text>
        <Text style={styles.value}> {gasto.account_fkey?.account_name} </Text>
      </View>

      <TouchableOpacity style={styles.boton1} onPress={modifyExpenses}>
        <Text style={styles.texto1}>¿Deseas modificar este Gasto? </Text>
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

export default ExpensesDetailScreen;
