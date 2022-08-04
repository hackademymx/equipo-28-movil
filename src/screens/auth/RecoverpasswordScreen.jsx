import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import request from "../../api";
import { MyBoton, MyTextInput } from "../../components";

const ImgLogo = require("../../../assets/MLogo.jpg");

export default function ChangePassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async () => {
    try {
      if (email === "") {
        return setError("Completa el campo con un correo registrado");
      }
      

      setLoading(true);
      const { data } = await request({
        url: "/auth/request-reset-email/",
        method: "post",
        data: { email },
      });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Ocurrio un error con el correo electrónico");
    }
   
    
  }

  useEffect(() =>  {
    // if (success) {
    //   return alert("Sigue las instrucciones que se enviaron a tu correo")
    // }
    if (success) {
      navigation.navigate("ResetPassword")
    }
  }, [success])

 
  
  return (
    <View style={styles.formContainer}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Ingresa correo electronico:"
        value={email}
        setValue={(text) => setEmail(text)}
      />
    {success && <Text style={styles.verde}>Se han enviado las instrucciones a tu correo</Text>}
    {error && <Text style={styles.rojo}>{error}</Text>}
      <MyBoton text={loading ? "Enviando..." : "Enviar"} onPress={sendEmail} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    flexDirection:"column",
    justifyContent: "space-evenly",
    padding: 10,
   },
  inputForm: {
    width: "90%",
  },
  logoMoney: {
    height: 90,
    width: 90,
    alignSelf: "flex-end",
    padding: 20,
    margin: 10,
  },
  verde:{
    color: "#3BAA1D",
  },
  rojo:{
    color: "#9D1D0C",
  },
});
