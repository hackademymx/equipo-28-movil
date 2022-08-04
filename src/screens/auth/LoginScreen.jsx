import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import { passwordValidation } from "../../../utils/validation";
import { MyTextInput, MyBoton } from "../../components";

const ImgLogo = require("../../../assets/MLogo.jpg");

const LoginScreen = ({ navigation }) => {
  const [User, setUser] = useState({ email: "", password: "" });

  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [Error, setError] = useState("");

  const { isLoading, login } = useContext(AuthContext);

  const checkForm = () => {
    if (User.email === "") {
      return alert("Necesita llenar el campo del Correo");
    }

    if (!passwordValidation.test(User.password)) {
      return alert(
        "La contraseña debe contener 6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
      );
    }

    login(User.email, User.password);
  };

  const changeUser = (text, name) => {
    setUser({
      ...User,
      [name]: text,
    });
  };

  //const val = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text style={styles.ingresaTexto}> Bienvenido</Text>
      <MyTextInput
        label="Correo electrónico"
        place="e.g. tu_nombre@mail.com"
        value={User.email}
        setValue={(text) => changeUser(text, "email")}
      />

      <MyTextInput
        label="Contraseña"
        place="6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
        security={!PasswordVisible}
        value={User.password}
        setValue={(text) => changeUser(text, "password")}
        icon={PasswordVisible ? "eye-slash" : "eye"}
        onIconclick={() => setPasswordVisible(!PasswordVisible)}
      />
      <Text style={styles.errortext}>{Error}</Text>
      <View style={styles.miBotonContener}>
        {isLoading ? (
          <Spinner visible={isLoading} />
        ) : (
          <MyBoton text="INICIA SESION" onPress={checkForm} />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Text>¿Aún no tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Regístrate</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Text>¿Olvidaste tu contraseña? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RecoverPassword")}
        >
          <Text style={styles.link}>Recupérala</Text>
        </TouchableOpacity>
      </View>
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

/*(
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={() => {
            login(email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

*/

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});*/

export default LoginScreen;
