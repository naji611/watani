import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");

export default function Report({ title, description, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
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
          colors={["#6CAAA4", "#66BFBF"]}
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
    marginBottom: screenWidth * 0.04, // Spacing based on screen width
    overflow: "hidden",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: screenWidth * 0.06, // Padding responsive to screen width
    marginHorizontal: screenWidth * 0.05, // Margin based on screen width
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    maxWidth: screenWidth * 0.8, // Limit max width to 90% of screen width
    minWidth: screenWidth * 0.8,
    minHeight: screenWidth * 0.35, // Minimum height proportionate to width
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  title: {
    fontSize: screenWidth * 0.055, // Dynamic font size
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  description: {
    fontSize: screenWidth * 0.04, // Responsive font size for description
    color: "#fff",
    textAlign: "center",
    marginTop: screenWidth * 0.02, // Responsive spacing
    paddingHorizontal: screenWidth * 0.04,
    lineHeight: screenWidth * 0.06,
    fontFamily: "Roboto",
  },
});
