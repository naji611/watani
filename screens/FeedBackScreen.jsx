import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/UI/Button";

export default function FeedBackScreen() {
  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>رأيك بهمنا لنطور من خدماتنا</Text>

      {/* Feedback text area */}
      <TextInput
        style={styles.textArea}
        placeholder="أكتب رأيك..."
        placeholderTextColor="#999"
        multiline={true}
        numberOfLines={6} // Adjusts the height of the text area
      />

      {/* Submit button */}
      <Button onPress={handleSubmit} color="green">
        أرسل
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top", // Ensures text starts at the top of the input
    marginBottom: 20,
    fontSize: 16,
    height: 120, // Set the height for multiline input
  },
});
