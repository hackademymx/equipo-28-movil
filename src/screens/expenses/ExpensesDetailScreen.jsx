import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import {BASE_URL} from '../../config';
import { ActivityIndicator } from 'react-native';



const ImgLogo = require("../../../assets/MLogo.jpg");


const ExpensesDetailScreen = ({navigation}) => {
  const route = useRoute();
  const [expenses, setExpenses] = useState({});

  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);


  const {userInfo} = useContext(AuthContext);

  const updateExpenses = (text, name) => {
    setExpenses({
      ...expenses,
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
      console.log('Id de cuenta'+expId);
      setLoading(true);
      const response = await request({method: "get", url: `/movements/detail/${expId}`}); //sin el último slash
      console.log("RESPONSE =>",response.data)
      setLoading(false);
      setExpenses(response.data);
  
    } catch (error) {
      
  
      setLoading(false);
 
      console.error(error);
      alert(error);

    }
  };
  // if (Loading){
  //   return(
  //     <ActivityIndicator></ActivityIndicator> 
  //   )
  // }
  const modifyExpenses = async () => {
    try {
      let expId = route.params.id;
      
      setLoading(true);
      const response = await request({data:gasto,
        method: "put",
        url: `/movements/detail/${expId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("ExpensestList");
      alert("Se actualizó Gasto");

      //estari cool que navegara al stacks
    } catch (error) {
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
    };

  const deleteExpenses = async () => {
    try {
      let expId = route.params.id;
      console.log("Intento eliminar Id de cuenta " + expId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/movements/detail/${expId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("ExpensesList");
      alert("Se eliminó Gasto");

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
        label="Descripcion del Gasto:"
        place={route.params.description}
        value={expenses.description}
        setValue={(text) => updateExpenses(text, "description")}
      />

      <MyTextInput
        label="INGRESOS O EGRESOS:"
        place={expenses.flow_type}
        value={expenses.flow_type}
        setValue={(text) => updateExpenses(text, "flow_type")}
      />

      <MyTextInput
        label="Importe de Gasto:"
        place={expenses.amount}
        value={expenses.amount}
        setValue={(text) => updateExpenses(text, "amount")}
      />

      {/* <MyTextInput
        label="Concepto de Gasto:"
        place={expenses.tag}
        value={expenses.tag}
        setValue={(text) => updateExpenses(text, "tag")}
      /> */}

      <MyTextInput
        label="Cuenta Asociada al Gasto:"
        place={expenses.account_fkey?.account_name}
        value={expenses.account_fkey?.account_name}
        setValue={(text) => updateExpenses(text, "account_fkey")}
        
      />
{/* 
      <MyTextInput
        label="Ingreso o Egreso:"
        place={expenses.flow_type}
        value={expenses.flow_type}
        setValue={(text) => updateExpenses(text, "flow_type")}
      /> */}
       <TouchableOpacity style={styles.boton1} onPress={modifyExpenses}>
        <Text style={styles.texto1}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton2} onPress={deleteExpenses}>
        <Text style={styles.texto1}>Eliminar</Text>
      </TouchableOpacity>
    
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


export default ExpensesDetailScreen;