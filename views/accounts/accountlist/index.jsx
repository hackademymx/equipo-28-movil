import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MyTextInput } from "../../../components/";

const ImgLogo = require("../../../assets/MLogo.jpg");

const Accountlist = (navigation) => {
  const [informacion, setInformacion]= React.useState([]);
  const {account, deleteData} = React.useContext()
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      traerInformacion();
    }
  }, [isFocused]);
  const traerInformacion= async () => {
    const response= await axios.get("https://mymoneyhackademy.herokuapp.com/accounts/");
    
};

const eliminarElemento= async (idx) => {
const response = await axios.delete(`https://mymoneyhackademy.herokuapp.com/accounts/${Id}`) 
deleteData(idx);
}
  return (
    <View>
      <Image source={ImgLogo} style={styles.logoMoney} />
        <MyTextInput
            label="Nombre:"
            value={account.name} 
            onChangeText={(text) => ChangeAccountInputs("name", text)}
        />
        <MyTextInput
            label="Tipo de cuenta:"
            value={account.tipo} 
            onChangeText={(text) => ChangeAccountInputs("tipo",text)}
        />
        <MyTextInput 
            label="Número de cuenta:" 
            value={account.numero} 
            onChangeText={(text) => ChangeAccountInputs("numero",text)}
        />
        <MyTextInput
            label="Clabe Interbancaria:"
            value={account.clabe} 
            onChangeText={(text) => ChangeAccountInputs("clabe",text)}
        />
        <MyTextInput 
            label="Saldo Actual:"
            value={account.saldo} 
            onChangeText={(text) => ChangeAccountInputs("saldo",text)}
        />
        <MyTextInput
            label="Fecha de Corte:"
            value={account.fecha} 
            onChangeText={(text) => ChangeAccountInputs("fecha",text)}
        />
        <TouchableOpacity>
            <Text onPress={()=> eliminarElemento(idx)} style= {styles.eliminar}>ELIMINAR</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text onPress={()=>navigation.navigate("Vista Actualizar",{
                            itemId: idx,
                        })} style= {styles.actualizar}>ACTUALIZAR</Text>
        </TouchableOpacity>

        <Button title="GUARDAR CUENTA" onPress={() => navigation.navigate("Agregar Cuenta")}/>
    </View>
    );
};

const styles= StyleSheet.create({
  textInput: {
      backgroundColor: "#fff",
      padding:10,
      borderWidth: 1,
      borderColor: "#000",
  },
  eliminar:{
    color: "gold",
    backgroundColor: "#000",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 13,
    marginLeft: 15,
},
actualizar:{
    backgroundColor: "#000",
    padding:13,
    color: "#fff",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginBottom: 20,
},
});

export default Accountlist
