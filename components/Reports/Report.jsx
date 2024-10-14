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
        <LinearGradient
          colors={["#a1c4fd", "#c2e9fb"]} // Refined soft blue gradient
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
    borderRadius: 20,
    marginBottom: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    margin: 10,
    borderRadius: 20, // More rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    minWidth: 180,
    maxWidth: 230,
    minHeight: 130,
    minWidth: 230,
    backgroundColor: "#fff",
    borderWidth: 0.5, // Soft border for more definition
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "700", // Slightly bolder for emphasis
    color: "#555",
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 15,
  },
});
