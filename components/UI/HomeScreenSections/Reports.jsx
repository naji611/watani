import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

const { width: screenWidth } = Dimensions.get("window");

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
            ? require("../../../assets/images/planning.jpg")
            : id === 4
            ? require("../../../assets/images/social.jpg")
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
    width: screenWidth * 0.9, // Responsive width based on screen size
    height: screenWidth * 0.5, // Height as a proportion of width for aspect ratio
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
    opacity: 0.9,
  },
  textContainer: {
    position: "absolute",
    bottom: 15, // Positioning closer to the bottom for visibility
    right: 10,
    backgroundColor: "rgba(0, 128, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: screenWidth * 0.045, // Responsive font size based on screen width
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
