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


const SavingsDetailScreen = ({ navigation }) => {
  const route = useRoute(); //en vez de navigation.getParams
  const [ahorro, setAhorro] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);


  const { userInfo } = useContext(AuthContext);

  const updateAhorro = (text, name) => {
    setAhorro({
      ...ahorro,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getSavingsDetail();
    }
  }, [isFocused]);

 

  const getSavingsDetail = async () => {      
    try {
      let savId = route.params.id;
      console.log("Id de cuenta" + savId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/movements/detail/${savId}`,
      }); //sin el último slash

      setLoading(false);
      setAhorro(response.data);
      //console.log(account);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const modifySavings = () => {
    navigation.navigate("SavingsModify", ahorro);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <View style={styles.caption}>
        <Text style={styles.description}>Concepto del Ingreso</Text>
        <Text style={styles.value}> {ahorro.flow_type} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Monto</Text>
        <Text style={styles.value}> {ahorro.amount} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Descripción</Text>
        <Text style={styles.value}> {ahorro.description} </Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.description}>Cuenta</Text>
        <Text style={styles.value}> {ahorro.account_fkey?.account_name} </Text>
      </View>

      <TouchableOpacity style={styles.boton1} onPress={modifySavings}>
        <Text style={styles.texto1}>¿Deseas modificar este Ahorro? </Text>
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

export default SavingsDetailScreen;

//() => console.log("Intento actualizar" + route.params.id)
