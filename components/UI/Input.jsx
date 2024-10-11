import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function Input({
  placeHolder,
  logo,
  width,
  id,
  secureTextEntry,
  multiline = false,
  borderColorRed,
  multilineHight = 100,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        {
          width: width === "small" ? "50%" : "100%",
          borderColor: borderColorRed ? "red" : "green",
        },
      ]}
    >
      <TextInput
        {...props}
        style={[
          styles.input,
          multiline && { height: multilineHight, textAlignVertical: "top" },
        ]}
        placeholder={placeHolder}
        secureTextEntry={secureTextEntry}
        multiline={multiline} // Pass the multiline prop to TextInput
      />
      {logo === "id" ? (
        <AntDesign name="idcard" style={styles.icon} />
      ) : logo === "phone" ? (
        <AntDesign name="phone" style={styles.icon} />
      ) : (
        <Ionicons name={logo} style={styles.icon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  input: {
    padding: 20,
    flex: 1,
    color: "black",
    fontWeight: "bold",
  },
  icon: {
    fontSize: 40,
    color: "green",
    paddingTop: 10,
    paddingRight: 10,
  },
});
