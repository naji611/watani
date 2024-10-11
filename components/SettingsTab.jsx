import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function SettingsTab({ title, subTitle, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name="caret-back-outline"
        color="green"
        size={24}
        style={styles.arrowIcon}
      />
      <View style={styles.content}>
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
    flexDirection: "row", // To align the text and the arrow in the same row
    justifyContent: "space-between", // Space out the text and arrow icon
    backgroundColor: "#C5C0C0", // Changed to a more modern gray shade
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center", // Vertically center items
    minHeight: 80,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#000", // Light gray for the subtitle
    marginTop: 4,
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
