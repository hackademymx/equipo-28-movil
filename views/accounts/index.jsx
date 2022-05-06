import axios from "axios";
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


//"https://mymoneyhackademy.herokuapp.com/login/"
export default function Accounts({navigation}) {
  const [cuenta, setCuenta] = React.useState({account_name:"", type_account:"", account_num:"", current_balance:"", account_cbe:"", cutoff_date:""})
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  
  // const {itemId}= route.params;
  // const {usuarios, putData} = React.useContext(MyContext);
  const ChangeUserInputs =(propiedad, value) => {
      setUser({
          ...user,
          [propiedad]: value,
      });
  };

  const enviarCuenta = async() => {
      //putData(user, itemId);

      const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxODc3NDAyLCJpYXQiOjE2NTE4NzcxMDIsImp0aSI6ImI2YzkwMjlkOTBhODQ3MDJiZWQ3OTU5YmI3N2U1NTMxIiwidXNlcl9pZCI6NDh9.sLXmgxmR5Ix_CMTF2w9h7fTmyarvPIVt2ZGINozJ-gU';
      const headers = {
        'Authorization': `Bearer ${access_token}`
      };

      try {
        setLoading(true);
        const response = await axios.post(
          "https://mymoneyhackademy.herokuapp.com/accounts/",
          cuenta,
          {headers: headers}
        );

        setLoading(false);

      }catch (error) { 
        const data= error.response.data
      setLoading(false);
      setError(data.msg ?data.msg :data.error);
      console.error(error);
      alert(error);
    }

  };

  const changeCuenta = (text, name) => {
    setCuenta(
      {
        ...cuenta,
        [name]: text
      }
    );
  };

  return (
    <View style={styles.container}>
    <Image source={ImgLogo} style={styles.logoMoney} />
        <MyTextInput
      label="Nombre"
      place="e.g. cuenta de nómina"
      value={cuenta.account_name}
      setValue={(text) => changeCuenta(text, "account_name")}
    />

    <MyTextInput
      label="Tipo de Cuenta"
      place=" "
      value={cuenta.type_account}
      setValue={(text) => changeCuenta(text, "type_account")}
    
    />
    <MyTextInput
      label="Número de cuenta"
      place=" "
      value={cuenta.account_num}
      setValue={(text) => changeCuenta(text, "account_num")}
    
    />
    <MyTextInput
      label="Clabe Interbancaria"
      place=" "
      value={cuenta.account_cbe}
      setValue={(text) => changeCuenta(text, "account_cbe")}
    
    />
    <MyTextInput
      label="Saldo Actual"
      place=" "
      value={cuenta.current_balance}
      setValue={(text) => changeCuenta(text, "current_balance")}
    
    />
    <MyTextInput
      label="Fecha de Corte"
      place=" "
      value={cuenta.cutoff_date}
      setValue={(text) => changeCuenta(text, "cutoff_date")}
    
    />
    <MyBoton text="GUARDAR" onPress={enviarCuenta} />
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