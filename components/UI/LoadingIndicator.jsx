import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingIndicator({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="extra-large" color="#4CAF50" />
      {/* Larger size and color */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50, // Increased padding
  },
  message: {
    fontSize: 24, // Larger font size
    fontWeight: "bold", // Bold for emphasis
    marginBottom: 20, // Increased margin for spacing
    textAlign: "center", // Center the message text
    color: "#333", // Darker color for readability
  },
});
