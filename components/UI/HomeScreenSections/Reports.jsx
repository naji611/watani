import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Reports({ image, title, onPress, id }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          id === 1
            ? require("../../../assets/images/street.jpg")
            : id === 2
            ? require("../../../assets/images/health.jpg")
            : id === 3
            ? require("../../../assets/images/planning.jpg") // Added based on your original sections
            : id === 4
            ? require("../../../assets/images/social.jpg") // Add an image for Social Affairs
            : id === 5
            ? require("../../../assets/images/Construction.jpg")
            : id === 6
            ? require("../../../assets/images/ashgal.jpg")
            : ""
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    width: 350,
    height: 200,
    backgroundColor: "gray",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    opacity: 0.7,
  },
  textContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "rgba(0, 128, 0, 0.7)",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    padding: 3,
  },
});
