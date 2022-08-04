import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MyTextInput } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import request from "../../api";

import { BASE_URL } from "../../config";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ImgLogo = require("../../../assets/MLogo.jpg");

const MetaList = ({ navigation }) => {
  const [meta, setMeta] = useState([]);
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getMeta();
    }
  }, [isFocused]);

  const getMeta= async () => {
    try {
      setLoading(true);
      const response = await request({ method: "get", url: "/goals/" });
      console.log(response.data);
      setLoading(false);
      setMeta(response.data);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }

   
  };

  const eliminarElemento = async (idx) => {
    const response = await axios.delete(`${BASE_URL}/goals/${idx}`);
    deleteData(idx);
  };

  const metaDetail = ({ ...met }) => {
    //console.log('POD'+acc.id+'-')
    navigation.navigate("MetaDetail");
  };

  return (
    <ScrollView style={styles.container}>
      {meta.map((met, idx) => {
        return (
          <TouchableOpacity
            key={`goals-${idx}`}
            onPressIn={() => navigation.navigate("MetaDetail", met)}
          >
            <View style={styles.metItem}>
              <Text>
                {met.concept}-{met.total}
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
  metItem: {
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

export default MetaList;
