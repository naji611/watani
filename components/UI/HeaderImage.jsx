import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function HeaderImage({ style }) {
  return (
    <View>
      <Image
        source={require("../../assets/iconWhite.png")}
        style={[styles.image, style]}
      ></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: -40,
    left: 10,
    width: 60,
    height: 60,
  },
});
