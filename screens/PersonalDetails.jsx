import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";

export default function PersonalDetails() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>الاسم</Text>
            <Text style={styles.value}>{authCtx.userData.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="card-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            {authCtx.userData.userType === "ForeignUser" && (
              <Text style={styles.label}>الرقم الشخصي</Text>
            )}
            {authCtx.userData.userType === "JordanianWomenChild" && (
              <Text style={styles.label}>رقم الوثيقة</Text>
            )}
            {authCtx.userData.userType === "JordanianUser" && (
              <Text style={styles.label}>الرقم الوطني</Text>
            )}
            {authCtx.userData.userType === "GazaSon" && (
              <Text style={styles.label}>رقم الملف</Text>
            )}

            <Text style={styles.value}>{authCtx.userData.primaryNumber}</Text>
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
            <Text style={[styles.label, ,]}>البريد الإلكتروني</Text>
            <Text
              style={[
                {
                  color:
                    authCtx.userData.isEmailConfirmed === "True"
                      ? "#666"
                      : "red",
                },
              ]}
            >
              {authCtx.userData.isEmailConfirmed === "True"
                ? " verified"
                : "Not verified"}
            </Text>
            <Text style={[styles.value]}>{authCtx.userData.email}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the start
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Align vertically to the center
  },
  icon: {
    fontSize: 28,
    color: "#4CAF50",
    marginRight: 15,
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align text to the start
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    paddingBottom: 5,
    textAlign: "left", // Align text to the left
    fontWeight: "bold",
  },
});
