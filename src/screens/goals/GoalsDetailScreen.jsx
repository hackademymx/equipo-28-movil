import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View, Image, SafeAreaView} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import { BASE_URL } from "../../config";


const ImgLogo = require("../../../assets/MLogo.jpg");


const GoalsDetailScreen = ({ navigation }) => {
  const route = useRoute(); //en vez de navigation.getParams
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
      getGoalsDetail();
    }
  }, [isFocused]);

 

  const getGoalsDetail = async () => {      
    try {
      let metId = route.params.id;
      console.log("Id de cuenta" + metId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/movements/update/${metId}`,
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

  const viewListMeta = () => {
    navigation.navigate("MetaList", meta);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <View style={styles.caption}>
        <Text style={styles.description}>Concepto de la Meta</Text>
        <Text style={styles.value}> {meta.concept} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Monto</Text>
        <Text style={styles.value}> {meta.amount} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Periodo</Text>
        <Text style={styles.value}> {meta.period} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Cuenta</Text>
        <Text style={styles.value}> {meta.account_fkey?.account_name} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Total</Text>
        <Text style={styles.value}> {meta.total} </Text>
      </View>

      <TouchableOpacity style={styles.boton1} onPress={viewListMeta}>
        <Text style={styles.texto1}>Regresa al listado</Text>
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
});

export default GoalsDetailScreen;
