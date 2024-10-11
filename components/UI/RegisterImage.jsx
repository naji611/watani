import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function RegisterImage({ style }) {
  return (
    <View>
      <Image
        source={require("../../assets/HeaderLogo.png")}
        style={[styles.image, style]}
      ></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: -100,
    left: -50,
    width: 200,
    height: 200,
  },
});
