import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MyTextInput } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import request from "../../api";

import { BASE_URL } from "../../config";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ImgLogo = require("../../../assets/MLogo.jpg");

const SavingsList = ({ navigation }) => {
  const [ahorro, setAhorro] = useState([]);
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getAhorro();
    }
  }, [isFocused]);

  const getAhorro = async () => {
    try {
      setLoading(true);
      const response = await request({ method: "get", url: "/movements?flow_type__contains=AHORROS" });
      console.log(response.data);
      setLoading(false);
      setAhorro(response.data);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }

   
  };

  const eliminarElemento = async (idx) => {
    const response = await axios.delete(`${BASE_URL}/movements/${idx}`);
    deleteData(idx);
  };

  const savingsDetail = ({ ...sav }) => {
    //console.log('POD'+acc.id+'-')
    navigation.navigate("SavingsDetail");
  };

  return (
    <ScrollView style={styles.container}>
      {ahorro.map((sav, idx) => {
        return (
          <TouchableOpacity
            key={`savings-${idx}`}
            onPressIn={() => navigation.navigate("SavingsDetail", sav)}
          >
            <View style={styles.savItem}>
              <Text>
                {sav.amount}-{sav.description}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  eliminar: {
    color: "gold",
    backgroundColor: "#000",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 13,
    marginLeft: 15,
  },
  actualizar: {
    backgroundColor: "#000",
    padding: 13,
    color: "#fff",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", //RRGGBB hex
    flexDirection: "column",
  },
  savItem: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 8,
    // borderWidth:1,
    //borderColor:'#000020',
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SavingsList;
