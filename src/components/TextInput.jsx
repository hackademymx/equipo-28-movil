import reactDom from "react-dom";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MyTextInput = ({
  label = "",
  place = "",
  security = false,
  value = "",
  setValue = null,
  icon,
  onIconclick,
}) => {
  const changeText = (text) => setValue(text);

  return (
    <View style={styles.row}>
      <View style={styles.textcontainer}>
        <Text style={styles.textlabel}>{label}</Text>
        <TextInput
          type="Text"
          placeholder={place}
          style={styles.textinput}
          secureTextEntry={security}
          value={value}
          onChangeText={changeText}
        />
      </View>
      {icon && (
        <Icon size={17} color={"#000"} name={icon} onPress={onIconclick} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textinput: {
    flex: 1,
    fontSize: 13,
    height: 50,
    borderColor: "#000",
    borderRadius: 5,
    borderBottomWidth: 1,
    padding: 4,
  },
  textcontainer: {
    flex: 1,
  },
  textlabel: {
    fontSize: 15,
    fontFamily: "Calibri",
    fontStyle: "bold",
  },
});

export default MyTextInput;
