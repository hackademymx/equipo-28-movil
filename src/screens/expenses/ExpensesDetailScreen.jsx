import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import {BASE_URL} from '../../config';



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
      const response = await request({method: 'get', url: `/expenses/${expId}`}) //sin el último slash
      
      setLoading(false);
      setExpenses(response.data);
  
    } catch (error) {
      
  
      setLoading(false);
 
      console.error(error);
      alert(error);

    }
  };
  
  return (
    <View style={styles.container}>
      
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Descripcion del Gasto:"
        place={route.params.expenses_name}
        value={expenses.expenses_name}
        setValue={(text) => updateExpenses(text, "expenses_name")}
      />

      <MyTextInput
        label="Fecha del Gasto:"
        place={expenses.date_expenses}
        value={expenses.date_expenses}
        setValue={(text) => updateExpenses(text, "date_expenses")}
      />

      <MyTextInput
        label="Importe de Gasto:"
        place={expenses.expenses_amount}
        value={expenses.expenses_amount}
        setValue={(text) => updateExpenses(text, "expenses_amount")}
      />

      <MyTextInput
        label="Concepto de Gasto:"
        place={expenses.expenses_concept}
        value={expenses.expenses_concept}
        setValue={(text) => updateExpenses(text, "expenses_concept")}
      />

      <MyTextInput
        label="Cuenta Asociada al Gasto:"
        place={expenses.expenses_account}
        value={expenses.expenses_acount}
        setValue={(text) => updateExpenses(text, "expenses_account")}
      />

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