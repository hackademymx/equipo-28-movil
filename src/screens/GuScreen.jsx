import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import { TouchableOpacity } from "react-native-web";


const ImgLogo = require("../../assets/logon.jpg");

const Gu = ({navigation}) => {
    return (
      <SafeAreaView style={styles.margen}>
        <View>
          <Text style={styles.texto1}>Bienvenido a</Text>
        </View>
        <Image source={ImgLogo} style={styles.logoMoney} />

      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    margen: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
      //borderBottomColor: "#fff",
      //borderBottomWidth: 120,
    },
    logoMoney: {
      height: 129,
      width: 300,
      alignSelf: "center",
      margin: 25,
    },
    boton1: {
      backgroundColor: "#000",
      height: 50,
      width: 162,
      borderWidth: 2,
      padding: 10,
      margin: 0,
      marginVertical: -10,
      borderColor: "#000",
      borderRadius: 10,
      alignSelf: "flex-start",
      position: "fixed",
      bottom: 50,
      right: "5%",
    },
    boton2: {
      backgroundColor: "#fff",
      height: 50,
      width: 162,
      borderWidth: 2,
      padding: 10,
      marginVertical: -30,
      borderColor: "#000",
      borderRadius: 10,
      alignSelf: "flex-end",
      position: "fixed",
      bottom: 70,
      right: "52%",
    },
    texto1: {
      fontFamily: "Tahoma",
      fontSize: 20,
      color: "#fff",
      alignSelf: "center",
      padding: 5,
    },
    texto2: {
      fontFamily: "Roboto",
      fontSize: 13,
      color: "#000",
      alignSelf: "center",
      padding: 5,
    },
  });

export default Gu;