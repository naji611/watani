import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 10,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
