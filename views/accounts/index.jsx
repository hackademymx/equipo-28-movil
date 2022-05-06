import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Picker,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { MyTextInput, MyBoton } from "../../components/";

const ImgLogo = require("../../assets/MLogo.jpg");

export default function Accounts({ navigation }) {
  const [Cuentas, setCuentas] = React.useState({
    account_name: "",
    type_account: "",
    account_num: "",
    account_cbe: "",
    current_balance: "",
    cutoff_date: "",
  });

  // const {itemId}= route.params;
  // const {usuarios, putData} = React.useContext(MyContext);
  const postAccount = async () => {
    await axios.post("https://mymoneyhackademy.herokuapp.com/accounts/");
    headers: {
    }
    token: {
    }
    Cuentas;
  };

  const changeCuenta = (text, name) => {
    setCuentas({
      ...Cuentas,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Nombre"
        place="e.g. cuenta de nómina"
        value={Cuentas.account_name}
        setValue={(text) => changeCuenta(text, "account_name")}
      />

      <MyTextInput
        label="Tipo de Cuenta"
        place=" "
        value={Cuentas.type_account}
        setValue={(text) => changeCuenta(text, "type_account")}
      />
      <MyTextInput
        label="Número de Cuenta"
        place=" "
        value={Cuentas.account_num}
        setValue={(text) => changeCuenta(text, "account_num")}
      />
      <MyTextInput
        label="Clabe Interbancaria"
        place=" "
        value={Cuentas.account_cbe}
        setValue={(text) => changeCuenta(text, "account_cbe")}
      />
      <MyTextInput
        label="Saldo Actual"
        place=" "
        value={Cuentas.current_balance}
        setValue={(text) => changeCuenta(text, "current_balance")}
      />

      <MyTextInput
        label="Fecha de Corte"
        place=" "
        value={Cuentas.cutoff_date}
        setValue={(text) => changeCuenta(text, "cutoff_date")}
      />
      <MyBoton text="GUARDAR" onPress={postAccount} />
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
