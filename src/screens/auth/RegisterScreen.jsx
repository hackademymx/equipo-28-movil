import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Navigation,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import {passwordValidation} from "../../../utils/validation";
import { MyTextInput, MyBoton } from "../../components"
import { CurrentRenderContext } from '@react-navigation/native';

const ImgLogo = require("../../../assets/MLogo.jpg");

const RegisterScreen = ({navigation}) => {
  //const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfContra, setConfiContra] = React.useState("");
  const [PasswordVisible, setPasswordVisible] = useState(false);

  const {isLoading, register} = useContext(AuthContext);

  //checar que todos los campos sean aceptables para enviar la petición
  const checkForm = () => {
    if (email === "") {
      return alert("Necesita llenar el campo del Correo");
    }
    if (!passwordValidation.test(password)) {
      return alert(
        "La contraseña debe contener 6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
      );
    }
    if (ConfContra != password) {
      return alert("Verifica que las 2 contraseñas sean iguales");
    }

    // si todo está bien ya mando la forma
    register(email, password);
  };

  return (
 

    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <Text style={styles.ingresaTexto}> Registro</Text>
      <MyTextInput
        label="Correo electrónico"
        place="e.g. tu_nombre@mail.com"
        value={email}
        setValue={setEmail}
      />

      <MyTextInput
        label="Contraseña"
        place="6-20 Caracteres 1Mayusc, 1Caracter, 1Núm."
        security={!PasswordVisible}
        value={password}
        setValue={setPassword}
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
        {isLoading ? (
          <Spinner visible={isLoading} />
        ) : (
          <MyBoton text="REGISTRATE" onPress={checkForm} />
        )}
      </View>

      <View style={{flexDirection: 'row', marginTop: 30, justifyContent: "center"}}>
          <Text>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Ingresa</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

/*
Spinner visible={isLoading}
*/

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
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;

/*
(
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
          title="Register"
          onPress={() => {
            register(email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  */

  /*
  const styles = StyleSheet.create({
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
});
*/
