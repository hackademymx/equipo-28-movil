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


export default function Home({navigation}) {
  const [Correo, setCorreo] = React.useState("");
  const [Contraseña, setContraseña] = React.useState("");
  const [ConfContra, setConfiContra] = React.useState("");
  const [Loading, setLoading] = React.useState(false);
  const [PasswordVisible, setPasswordVisible] = React.useState(false);



  const enviarFormulario = () => {
    if (Correo === "") {
      return alert("Necesita llenar el campo del Correo");
    }
    if (!passwordValidation.test(Contraseña)) {
      return alert(
        "La contraseña debe contener 6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
      );
    }
    if (ConfContra != Contraseña) {
      return alert("Verifica que las 2 contraseñas sean iguales");
    }
    enviarUsuario();
  };


  const enviarUsuario = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mymoneyhackademy.herokuapp.com/signup/",
        { email: Correo, password: Contraseña }
      );

      setLoading(false);
      navigation.navigate("Login")
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
 

    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text style={styles.ingresaTexto}> Registro</Text>
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

      <MyTextInput
        label="Confirmar Contraseña"
        place="Confirma Contraseña"
        security={!PasswordVisible}
        value={ConfContra}
        setValue={setConfiContra}
        icon={PasswordVisible ? "eye-slash" : "eye"}
        onIconclick={() => setPasswordVisible(!PasswordVisible)}
      />

      <View style={styles.miBotonContener}>
        {Loading ? (
          <ActivityIndicator />
        ) : (
          <MyBoton text="REGISTRATE" onPress={enviarFormulario} />
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
});



// const Home = () => {
//     return(
//       <View style={styles.homescreen}>
//         <Text>Homescreen</Text>
//       </View>
//     )
//   }

//   const styles = StyleSheet.create({
//     homescreen:{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center"
//     },
//   });
//   export default Home