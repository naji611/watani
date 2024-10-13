import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";

export default function PersonalDetails() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>الاسم</Text>
            <Text style={styles.value}>
              {authCtx.userData.firstName} {authCtx.userData.lastName}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="card-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>الرقم الوطني</Text>
            <Text style={styles.value}>
              {authCtx.userData.nationalityNumber}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="call-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>رقم الهاتف</Text>
            <Text style={styles.value}>{authCtx.userData.phoneNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="location-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>المدينة</Text>
            <Text style={styles.value}>{authCtx.userData.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>البريد الإلكتروني</Text>
            <Text style={styles.value}>{authCtx.userData.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20, // Vertical padding for more height
    paddingHorizontal: 15, // Horizontal padding for better spacing
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Align vertically to the center
  },
  icon: {
    fontSize: 28,
    color: "#4CAF50",
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // Takes up remaining space after the icon
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,

    paddingBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});
