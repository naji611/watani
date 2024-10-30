import { View, TextInput, StyleSheet, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Input({
  placeHolder,
  logo,
  width,
  secureTextEntry,
  multiline = false,
  borderColorRed,
  multilineHight = 100,
  errorLabel,
  val,
  hasLabel,
  ...props
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={{ marginBottom: screenHeight * 0.02 }}>
      {hasLabel && val && <Text style={styles.label}>{placeHolder}</Text>}

      <View
        style={[
          styles.container,
          {
            width: width === "small" ? screenWidth * 0.45 : screenWidth * 0.85,
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
          secureTextEntry={isSecure}
          multiline={multiline}
        />
        {logo === "id" ? (
          <AntDesign name="idcard" style={styles.icon} />
        ) : logo === "phone" ? (
          <AntDesign name="phone" style={styles.icon} />
        ) : (
          <Ionicons name={logo} style={styles.icon} />
        )}
        {secureTextEntry && (
          <Ionicons
            name={isSecure ? "eye-off" : "eye"}
            style={styles.icon}
            onPress={() => setIsSecure(!isSecure)}
          />
        )}
      </View>
      {errorLabel ? <Text style={styles.error}>{errorLabel}</Text> : null}
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
    marginVertical: screenHeight * 0.01,
    marginHorizontal: screenWidth * 0.01,
  },
  input: {
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.03,
    flex: 1,
    color: "black",
    fontWeight: "bold",
  },
  icon: {
    fontSize: screenWidth * 0.075,
    color: "green",
    paddingHorizontal: screenWidth * 0.025,
  },
  error: {
    color: "red",
    fontSize: screenHeight * 0.015,
    marginTop: screenHeight * 0.005,
    marginHorizontal: screenWidth * 0.05,
    textAlign: "center",
  },
  label: {
    fontSize: screenHeight * 0.02,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: screenWidth * 0.05,
  },
});
