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

const IncomesList = ({navigation}) => {
  const [Incomes, setIncomes] = useState([]);
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getIncomes();
    }
  }, [isFocused]);

  const getIncomes = async () => {
    
    try {
      setLoading(true);
      const response = await request({method: 'get', url: '/incomes/'})
      console.log(response.data)
      setLoading(false);
      setIncomes(response.data)
    } catch (error) {
      
     
      setLoading(false);
      console.error(error);
      alert(error);
    }

  };

  const eliminarElemento= async (idx) => {
    const response = await axios.delete(`${BASE_URL}/incomes/${idx}`) 
    deleteData(idx);
  }

  const incomesDetail = ({...inc}) => {
    navigation.navigate('incomesDetail')
  };

  return (
    
    
        <ScrollView style={styles.container}>
          {Incomes.map((inc, idx) => {
            return (
            <TouchableOpacity key={`incomes-${idx}`} onPressIn={()=>navigation.navigate('incomesDetail', inc)}>
              <View style={styles.incItem}> 
                <Text >{inc.incomes_name}-{inc.type_incomes}-{inc.current_balance}</Text> 
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
incItem:{
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

export default IncomesList;

  
