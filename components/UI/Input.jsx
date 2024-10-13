import { View, TextInput, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function Input({
  placeHolder,
  logo,
  width,
  secureTextEntry,
  multiline = false,
  borderColorRed,
  multilineHight = 100,
  errorLabel,
  ...props
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={{ marginBottom: 20 }}>
      {/* Wrap everything in a parent view */}
      <View
        style={[
          styles.container,
          {
            width: width === "small" ? 170 : "100%",
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
    marginVertical: 5, // Reduced vertical margin for tighter grouping
    marginHorizontal: 10,
  },
  input: {
    padding: 15, // Reduced padding for more compact input
    flex: 1,
    color: "black",
    fontWeight: "bold",
  },
  icon: {
    fontSize: 30,
    color: "green",
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 10,
    marginTop: 5, // Space between the input field and the error label
    marginHorizontal: 15, // Aligns error with input field edges

    textAlign: "center",
  },
});
