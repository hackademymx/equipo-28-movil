import axios from "axios";
import React, {useState} from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
} from "react-native";
import { MyTextInput, MyBoton } from "../../components/";
import { Picker } from "@react-native-picker/picker";
import request from "../../api";
//import colors from "../../../utils/colors";
import { TouchableOpacity } from "react-native-web";

const ImgLogo = require("../../../assets/MLogo.jpg");


export default function TagsScreen({ navigation }) {
  const [etiqueta, setEtiqueta] = useState({
    // description: "",
    flow_type: "",
    cost_type: "",
    tag_color: "",
  });
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [PickerItems, SetPickerItems] = useState();

  const backgroundColors = ['#655d8a', '#d885a3', '#9fcbda', '#ffbcbc', '#faf5d6', '#fdceb9', '#abe1df', '#f8f4a3', '#bff2be', '#7c99ac']

  const ChangeUserInputs = (propiedad, value) => {
    setUser({
      ...user,
      [propiedad]: value,
    });
  };

  const enviarEtiqueta = async () => {
    
    try {
      setLoading(true);
      const response = await request({method: 'post', url: '/customtags/', data: etiqueta});
      setLoading(false);
      alert('Etiqueta registrada');
    } catch (error) {
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const changeEtiqueta = (text, name) => {
    setEtiqueta({
      ...etiqueta,
      [name]: text,
    });
  };

  const renderColors = () => {
    return backgroundColors.map(color => {
      return (
      <TouchableOpacity
        key={color}
        style={[color===etiqueta.tag_color ? styles.selectedTag : styles.selectColor, {backgroundColor: color}]}
        onPress={() => changeEtiqueta(color, "tag_color")}
      />
    )}

    )
  }

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      {/* <MyTextInput
        label="Descripción:"
        place=" "
        value={etiqueta.description}
        setValue={(text) => changeEtiqueta(text, "description")}
      /> */}
    <Text>Tipo:</Text>
      <Picker
        selectedValue={etiqueta.flow_type}
        onValueChange={(itemValue) => changeEtiqueta(itemValue, "flow_type")}
      >
        <Picker.Item label="Selecciona un tipo de movimiento"/>
        <Picker.Item label="Gasto" value="EGRESOS" />
        <Picker.Item label="Ingreso" value="INGRESOS" />

      </Picker>

      <Text>Clasificación:</Text>
      <Picker
        selectedValue={etiqueta.cost_type}
        onValueChange={(itemValue) => changeEtiqueta(itemValue, "cost_type")}
      >
        <Picker.Item label="Selecciona un tipo: fijo/variable"/>
        <Picker.Item label="Fijo" value="FIJO" />
        <Picker.Item label="Variable" value="VARIABLE" />

      </Picker>

      <Text>Color:</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        {renderColors()}
      </View>
      {/*<Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label=" " value=" " />
        <Picker.Item label=" " value=" " />

  </Picker>*/}

    {/*
    <View>
    <Text>
      {etiqueta.tag_color}
    </Text>
    </View>
  
      
    
    <MyTextInput
        label="Color:"
        place=" "
        value={etiqueta.tag_color}
        setValue={(text) => changeEtiqueta(text, "tag_color")}
      />
*/}
    
      
      
      <MyBoton text="GUARDAR" onPress={enviarEtiqueta} />
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
  selectColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: '#b8b7b6',
    borderWidth: 2,
  },
  selectedTag: {
    width: 23,
    height: 23,
    borderRadius: 4,
    borderColor: '#b8b7b6',
    borderWidth: 3,
  },
});