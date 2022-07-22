// import React, {useState} from "react";
// import {Alert, StyleSheet, View} from "react-native";
// import {Icon, Input} from "react-native-elements";
// import { MyBoton } from "../../components";


// export default function RecoverPassword({navigation}) {
//     const[recuperacion, setRecuperacion ]= useState("")
//     const[errorRecupera, setErrorRecupera]= useState(null)
//     const[loading, setLoading]= useState(false)

//     const onSubmit = async() => {
//         if (!validateData()) {
//             return
//         }
        
//         setLoading(true)
//         const result = await sendEmailResetPassword
//         setLoading(false)

//         if(!result.statusResponse) {
//             Alert.alert ("Error", "El correo no está relacionado a ningún usuario registrado")
//             return
//     } 
//             Alert.alert ("Confirmación", "Se le ha enviado un correo con instrucciones para cambiar contraseña")
//             navigation.navigate()
        
//     const validateData = () => {
//         setErrorRecupera(null)
//         let valid = true

//         if(!validateEmail(recuperacion)){
//             setErrorRecupera("Debes ingresar correo válido")
//             valid = false
//         }
//         return valid
//     }

//     return(
//         <View style={styles.formContainer}>
//             <Input
//                 placeholder="Ingresa tu correo"
//                 containerStyle= {styles.inputForm}
//                 onChange= {(e)=> setRecuperacion(e.nativeEvent.text)}
//                 defaultValue={recuperacion}
//                 errorMessage={errorRecupera}
//                 keyboardType="email-address"
//                 rightIcon={
//                     <Icon
//                         type="material-community"
//                         name="at"
//                         iconStyle={styles.icon}
//                     />
//                 }
//             />

//             <MyBoton text="Recuperar contraseña" onPress={onSubmit} />
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     formContainer:{
//         flex:1,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 30,
//     },
//     inputForm:{
//         width: "90%",
        
//     },
    

// });