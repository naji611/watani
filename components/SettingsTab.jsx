import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsTab({ title, subTitle, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons
          name="caret-back-outline"
          color="green"
          size={24}
          style={styles.arrowIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
        <Ionicons name={icon} color="green" size={30} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden", // Ensure that content doesn't overflow
  },
  content: {
    flexDirection: "row", // Align text and icons in the same row
    justifyContent: "space-between", // Space out the text and arrow icon
    backgroundColor: "#C5C0C0", // Modern gray shade
    padding: 20, // Increased padding for a larger tap area
    alignItems: "center", // Vertically center items
    minHeight: 100, // Increased minimum height
  },
  icon: {
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1, // Allow the text container to grow
    justifyContent: "center", // Center text vertically
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#000", // Color for the subtitle
    marginTop: 4,
    marginLeft: 10,
  },
  arrowIcon: {
    marginRight: 10, // Change to right margin for proper spacing
  },
});
