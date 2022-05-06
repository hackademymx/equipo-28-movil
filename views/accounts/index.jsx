import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Picker,
  TextInput,
  Button
} from "react-native";
import { MyTextInput, MyBoton } from "../../components/";


const ImgLogo = require("../../assets/MLogo.jpg");



export default function Accounts({navigation}) {
  const [cuentas, setCuentas] = React.useState({nombre:"", tipo:"", numero:"", clabe:"", saldo:"", fecha:""})
  // const {itemId}= route.params;
  // const {usuarios, putData} = React.useContext(MyContext);
  const ChangeUserInputs =(propiedad, value) => {
      setUser({
          ...user,
          [propiedad]: value,
      });
  };

  const PUTDATA = () => {
      putData(user, itemId);
  };

  return (
    <View style={styles.container}>
    <Image source={ImgLogo} style={styles.logoMoney} />
        <MyTextInput
      label="Nombre"
      place="e.g. cuenta de nómina"
      value={cuentas.nombre}
      setValue={(text) => changeUser(text, "nombre")}
    />

    <MyTextInput
      label="Tipo de Cuenta"
      place=" "
      value={cuentas.tipo}
      setValue={(text) => changeUser(text, "tipo")}
    
    />
    <MyTextInput
      label="Clabe Interbancaria"
      place=" "
      value={cuentas.clabe}
      setValue={(text) => changeUser(text, "clabe")}
    
    />
    <MyTextInput
      label="Saldo Actual"
      place=" "
      value={cuentas.saldo}
      setValue={(text) => changeUser(text, "saldo")}
    
    />
    <MyTextInput
      label="Fecha de Corte"
      place=" "
      value={cuentas.fecha}
      setValue={(text) => changeUser(text, "fecha")}
    
    />
    <MyBoton text="GUARDAR" onPress={PUTDATA} />
  </View>
  );
};



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