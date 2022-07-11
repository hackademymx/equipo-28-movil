import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { useIsFocused } from "@react-navigation/native";
//import colors from "./utils/colors.js"
import { MyTextInput } from "../../components";
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import request from "../../api";


import {BASE_URL} from '../../config';
import { ScrollView } from "react-native-gesture-handler";

const ImgLogo = require("../../../assets/MLogo.jpg");

const TagsList = ({navigation}) => {
  const [etiqueta, setEtiqueta] = useState([]);
  //const {account, deleteData} = React.useContext()
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getTags();
    }
  }, [isFocused]);

  const getTags = async () => {
    
    try {
      setLoading(true);
      const response = await request({method: 'get', url: '/customtags/'})
      console.log(response.data)
      setLoading(false);
      setEtiqueta(response.data)
    } catch (error) {
      
      //const data = error.response.data;
      setLoading(false);
     // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }

    //const response= await axios.get(`${BASE_URL}/accounts/`);
  };

  const eliminarElemento= async (idx) => {
    const response = await axios.delete(`${BASE_URL}/customtags/${idx}`) 
    deleteData(idx);
  }

  const tagsDetail = ({...tag}) => {
    //console.log('POD'+acc.id+'-')
    navigation.navigate('TagsDetail')
  };

  return (
    
    
        <ScrollView style={styles.container}>
          {etiqueta.map((tag, idx) => {
            return (
            <TouchableOpacity key={`customtags-${idx}`} onPressIn={()=>navigation.navigate('TagsDetailScreen', tag)}>
              <View style={styles.tagItem}> 
                <Text style={{color:tag.tag_color}}>{tag.flow_type}-{tag.cost_type}</Text> 
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
tagItem:{
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

export default TagsList;
