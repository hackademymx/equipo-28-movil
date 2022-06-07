import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";
import {BASE_URL} from '../../config';


const ImgLogo = require("../../../assets/MLogo.jpg");


const IncomesDetailScreen = ({navigation}) => {
  const route = useRoute();
  const [incomes, setIncomes] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const {userInfo} = useContext(AuthContext);

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
      console.log('Id de cuenta'+incId);
      setLoading(true);
      const response = await request({method: 'get', url: `/incomes/${incId}`}) //sin el último slash
      
      setLoading(false);
      setIncomes(response.data);
    
    } catch (error) {
      
      //const data = error.response.data;
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
        label="Concepto del Ingreso:"
        place={route.params.incomes_concept}
        value={incomes.incomes_concept}
        setValue={(text) => updateIncomes(text, "incomes_concept")}
      />

      <MyTextInput
        label="Fecha:"
        place={incomes.incomes_date}
        value={incomes.incomes_date}
        setValue={(text) => updateIncomes(text, "incomes_date")}
      />

      <MyTextInput
        label="Monto:"
        place={incomes.incomes_amount}
        value={incomes.incomes_amount}
        setValue={(text) => updateIncomes(text, "incomes_amount")}
      />

      <MyTextInput
        label="Descripcion:"
        place={incomes.incomes_description}
        value={incomes.incomes_description}
        setValue={(text) => updateIncomes(text, "incomes_description")}
      />

      <MyTextInput
        label="Cuenta:"
        place={incomes.income_account}
        value={incomes.income_account}
        setValue={(text) => updateIncomes(text, "income_account")}
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



export default IncomesDetailScreen;

