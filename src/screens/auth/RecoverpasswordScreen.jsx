import React, { useState } from "react";
import {StyleSheet, View, Text} from "react-native";
import request from "../../api";
import { MyBoton, MyTextInput } from "../../components";

export default function ChangePassword({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendCodigo = async () => {
    try {
      if (codigo === "") {
        return setError("Completa el campo de codigo");
      }
      setLoading(true);
      const { data } = await request({
        url: "/auth/password-reset-complete/",
        method: "patch",
        data: { codigo },
      });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Ocurrio un error con el codigo");
    }
  };

  return (
    <View style={styles.formContainer}>
      <MyTextInput
        label="Ingresa codigo 1:"
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
    flexDirection:"column",
    justifyContent:"center",
    padding: 10,
   },
  inputForm: {
    width: "90%",
  },
  verde:{
    color: "#3BAA1D",
  },
  rojo:{
    color: "#9D1D0C",
  },
});
