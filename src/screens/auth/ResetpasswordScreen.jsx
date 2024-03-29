import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { passwordValidation } from "../../../utils/validation";
import { MyTextInput, MyBoton } from "../../components";

const ImgLogo = require("../../../assets/MLogo.jpg");

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [User, setUser] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

    const cambiarContraseña = async () => {
      try {
    if (!passwordValidation.test(User.password)) {
      return alert("La contraseña debe contener 6-20 Caracteres 1Mayusc, 1Caracter, 1Núm.");
    }

    
    login(User.uidb64, User.password, User.token);
    setLoading(true);
    const { data } = await request({
      url: "/auth/password-reset-complete/",
      method: "patch",
      data: { password, token, uidb64},
    });
    setSuccess(true);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError("Ocurrio un error con la contraseña");
  }
  }


  const changeUser = (text, name) => {
    setUser({
      ...User,
      [name]: text,
    });
  };


   
    
  

  useEffect(() =>  {

    if (success) {
      navigation.navigate("Login")
    }
  }, [success])

  
  //const val = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text style={styles.ingresaTexto}> Ingresa Codigos </Text>
      <MyTextInput
        label="Codigo de acceso 1"
        place=" "
        value={User.uidb64}
        setValue={(text) => changeUser(text, "uidb64")}
      />
      <MyTextInput
        label="Codigo de acceso 2"
        place=" "
        value={User.token}
        setValue={(text) => changeUser(text, "token")}
      />
      <MyTextInput
        label="Nueva Contraseña"
        place=" "
        value={User.password}
        setValue={(text) => changeUser(text, "password")}
        // security={!PasswordVisible}
        // value={User.pass}
        // setValue={(text) => changeUser(text, "password")}
        // icon={PasswordVisible ? "eye-slash" : "eye"}
        // onIconclick={() => setPasswordVisible(!PasswordVisible)}
      />
      <MyBoton text={"Modificar contraseña"} onPress={cambiarContraseña} />
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
  },
  link: {
    color: "blue",
  },
});

export default ResetPassword;
