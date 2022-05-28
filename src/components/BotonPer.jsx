import {TouchableOpacity, StyleSheet, Text} from "react-native";

    const MyBoton= ({text = "texto por defecto", onPress = null }) =>{
    
    return(
        
        <TouchableOpacity style = {styles.Touchable} onPress = {onPress}>
            <Text style={styles.boton}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    boton: {
        backgroundColor: "#000",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 45,
        color: "#fff",
        fontFamily: "Calibri",
        fontSize: 20,
        alignContent: "center"
    },
    
    Touchable: {
        alignSelf: "center",
    },

})

export default MyBoton;