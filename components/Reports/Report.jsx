import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Ensure you have expo-linear-gradient installed

export default function Report({ title, description, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.touchable}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#a8e063", "#56ab2f"]} // Gradient colors ranging from light green to darker green
        style={styles.container}
      >
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 15,
    overflow: "hidden", // Ensure rounded corners apply to gradient background
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10, // Reduced margin for a more compact look
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    minWidth: 180,
    maxWidth: 180,
    minHeight: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
