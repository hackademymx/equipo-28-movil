import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
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
      const response = await request({method: 'get', url: `/movements/detail/${expId}`}) //sin el último slash
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


export default ExpensesDetailScreen;