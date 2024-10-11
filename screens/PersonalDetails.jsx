import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "../components/UI/LoadingIndicator";

export default function PersonalDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="person-outline" style={styles.icon} />
        <View>
          <Text style={styles.label}>الاسم</Text>
          <Text style={styles.value}>مصطفى الاحمد</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="card-outline" style={styles.icon} />
        <View>
          <Text style={styles.label}>الرقم الوطني</Text>
          <Text style={styles.value}>2000758076</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="call-outline" style={styles.icon} />
        <View>
          <Text style={styles.label}>رقم الهاتف</Text>
          <Text style={styles.value}>0786914584</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" style={styles.icon} />
        <View>
          <Text style={styles.label}>المدينة</Text>
          <Text style={styles.value}>عمان</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="mail-outline" style={styles.icon} />
        <View>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <Text style={styles.value}>johndoe@example.com</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    fontSize: 28,
    color: "#4CAF50",
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1, // Allow label and value to take remaining space
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#666",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginTop: 3,
  },
});
