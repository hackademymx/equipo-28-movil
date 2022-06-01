import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MyTextInput } from "../../components";
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import request from "../../api";

import {BASE_URL} from '../../config';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ImgLogo = require("../../../assets/MLogo.jpg");

const ExpensesList = ({navigation}) => {
  const [expenses, setExpenses] = useState([]);
  //const {account, deleteData} = React.useContext()
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getExpenses();
    }
  }, [isFocused]);

  const getExpenses = async () => {
    
    try {
      setLoading(true);
      const response = await request({method: 'get', url: '/expense/'})
      console.log(response.data)
      setLoading(false);
      setExpenses(response.data)
    } catch (error) {
       setLoading(false);
    
      console.error(error);
      alert(error);
    }

 
  };

  const eliminarElemento= async (idx) => {
    const response = await axios.delete(`${BASE_URL}/expenses/${idx}`) 
    deleteData(idx);
  }

  const expensesDetail = ({...exp}) => {

    navigation.navigate('ExpensesDetail')
  };

  return (
    
    
        <ScrollView style={styles.container}>
          {expenses.map((exp, idx) => {
            return (
            <TouchableOpacity key={`expenses-${idx}`} onPressIn={()=>navigation.navigate('ExpensesDetail', exp)}>
              <View style={styles.expItem}> 
                <Text >{exp.expenses_name}-{exp.date_expenses}-{exp.expenses_amount}</Text> 
              </View>
            </TouchableOpacity>
            )
          })}
        </ScrollView>
    
    );
};

const styles= StyleSheet.create({
  textInput: {
      backgroundColor: "#fff",
      padding:10,
      borderWidth: 1,
      borderColor: "#000",
  },
  eliminar:{
    color: "gold",
    backgroundColor: "#000",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 13,
    marginLeft: 15,
},
actualizar:{
    backgroundColor: "#000",
    padding:13,
    color: "#fff",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginBottom: 20,
},
container: {
  flex: 1,
  backgroundColor: '#FFFFFF', //RRGGBB hex
  flexDirection: 'column',
},
accItem:{
  backgroundColor:'#F2F2F2',
  padding:10,
  borderRadius:8,
 // borderWidth:1,
  //borderColor:'#000020',
  marginBottom:10,
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
},
});

export default ExpensesList;
