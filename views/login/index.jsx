import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Picker,
  TextInput,
} from "react-native";
import { MyTextInput, MyBoton } from "../../components/";
import axios from "axios";
import { passwordValidation } from "../../utils/validations";

const ImgLogo = require("../../assets/MLogo.jpg");

export default function Login() {
  const [Correo, setCorreo] = React.useState("");
  const [Contraseña, setContraseña] = React.useState("");
  const [Loading, setLoading] = React.useState(false);
  const [PasswordVisible, setPasswordVisible] = React.useState(false);
  const [Error, setError] = React.useState("")

  const enviarFormulario = () => {
    if (Correo === "") {
      return alert("Necesita llenar el campo del Correo");
    }
    if (!passwordValidation.test(Contraseña)) {
      return alert(
        "La contraseña debe contener 6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
      );
    }
    enviarUsuario();
  };
  const enviarUsuario = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mymoneyhackademy.herokuapp.com/login/",
        { email: Correo, password: Contraseña }
      );

      setLoading(false);
    } catch (error) { 
        const data= error.response.data
      setLoading(false);
      setError(data.msg ?data.msg :data.error);
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text style={styles.ingresaTexto}> Bienvenido</Text>
      <MyTextInput
        label="Correo electrónico"
        place="e.g. tu_nombre@mail.com"
        value={Correo}
        setValue={setCorreo}
      />

      <MyTextInput
        label="Contraseña"
        place="6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
        security={!PasswordVisible}
        value={Contraseña}
        setValue={setContraseña}
        icon={PasswordVisible ? "eye-slash" : "eye"}
        onIconclick={() => setPasswordVisible(!PasswordVisible)}
      />
      <Text style={styles.errortext}>{Error}</Text>
      <View style={styles.miBotonContener}>
        {Loading ? (
          <ActivityIndicator />
        ) : (
          <MyBoton text="INICIA SESION" onPress={enviarFormulario} />
        )}
      </View>
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
  theeye: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  ojo: {
    backgroundColor: "blue",
  },
  ingresaTexto: {
    color: "#000",
    fontSize: 40,
    padding: -100,
    marginLeft: -15,
  },
  logoMoney: {
    height: 90,
    width: 90,
    alignSelf: "flex-end",
    margin: 25,
  },
  miBotonContener: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  errortext: {
      color: "#ff0000",
      fontSize: 20,


  }
});
