import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

import { MyTextInput, MyBoton } from "../../components";
import request from "../../api";

import { BASE_URL } from "../../config";

//import { useState } from 'react/cjs/react.production.min';

const ImgLogo = require("../../../assets/MLogo.jpg");


const TagsDetailScreen = ({ navigation }) => {
  const route = useRoute(); 
  const [etiqueta, setEtiqueta] = useState({});
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
 

  const { userInfo } = useContext(AuthContext);

  const updateTags = (text, name) => {
    setEtiqueta({
      ...etiqueta,
      [name]: text,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getTagsDetail();
    }
  }, [isFocused]);

 
  const getTagsDetail = async () => {      
    try {
      let accId = route.params.id;
      console.log("Id de cuenta" + tagId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/customtags/${tagId}`,
      }); //sin el último slash

      setLoading(false);
      setEtiqueta(response.data);
      //console.log(account);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const modifyTag = async () => {
    try {
      let tagId = route.params.id;
      
      setLoading(true);
      const response = await request({data:etiqueta,
        method: "put",
        url: `/customtag/${tagId}`,
      }); //sin el último slash
      setLoading(false);
      navigation.navigate("TagsList");
      alert("Se actualizó Etiqueta");

    
    } catch (error) {
      setLoading(false);
    
      console.error(error);
      alert(error);
    }
    };

  const deleteTag = async () => {
    try {
      let tagId = route.params.id;
      console.log("Intento eliminar etiqueta " + tagId);
      setLoading(true);
      const response = await request({
        method: "delete",
        url: `/customtag/${tagId}`,
      }); 
      setLoading(false);
      navigation.navigate("TagsList");
      alert("Se eliminó etiqueta");

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
        label="Tipo:"
        place={route.params.etiqueta.flow_type}
        value={etiqueta.etiqueta.flow_typee}
        setValue={(text) => updateTags(text, "flow_type")}
      />

      <MyTextInput
        label="Clasificación:"
        place={etiqueta.cost_type}
        value={etiqueta.cost_type}
        setValue={(text) => updateTags(text, "cost_type")}
      />

      <MyTextInput
        label="Color:"
        place={tag.tag_color}
        value={tag.tag_color}
        setValue={(text) => updateTags(text, "tag_color")}
      />

      <TouchableOpacity style={styles.boton1} onPress={modifyTag}>
        <Text style={styles.texto1}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton2} onPress={deleteTag}>
        <Text style={styles.texto1}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};
//navigation.getParam('id')

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


export default TagsDetailScreen;

