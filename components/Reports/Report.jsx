import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Report({ title, description, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Slightly shrink the card on press
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Return to original size
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.touchable}
      >
        {/* colors={["#2980B9", "#66BFBF"]} */}
        <LinearGradient
          colors={["#6CAAA4", "#66BFBF"]} // Soft blue gradient with a hint of green
          style={styles.container}
        >
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 25, // More rounded corners for a modern look
    marginBottom: 15,
    overflow: "hidden", // Prevent clipping of the gradient
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    margin: 10,
    borderRadius: 25, // More rounded corners for a modern look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,

    maxWidth: 320,
    minHeight: 130,
    minWidth: 320,
    backgroundColor: "#fff",
    borderWidth: 0.5, // Soft border for more definition
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "700", // Slightly bolder for emphasis
    color: "#fff", // White text for better contrast against the gradient
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto", // A clean and readable font
  },
  description: {
    fontSize: 15,
    color: "#fff", // White text for better contrast against the gradient
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 15,
    lineHeight: 1.5, // Adjust line height for better readability
    fontFamily: "Roboto", // A clean and readable font
  },
});
