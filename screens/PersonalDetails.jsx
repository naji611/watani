import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import { LanguageContext } from "../store/languageContext.jsx";

const { width } = Dimensions.get("window");

export default function PersonalDetails() {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  console.log("userData: ", authCtx.userData);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              {langCtx.language === "ar" ? "الاسم" : "Name"}
            </Text>
            <Text style={styles.value}>{authCtx.userData.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="card-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            {authCtx.userData.userType === "ForeignUser" && (
              <Text style={styles.label}>
                {langCtx.language === "ar" ? "الرقم الشخصي" : "Personal Number"}
              </Text>
            )}
            {authCtx.userData.userType === "JordanianWomenChild" && (
              <Text style={styles.label}>
                {langCtx.language === "ar" ? "رقم الوثيقة" : "Document Number"}
              </Text>
            )}
            {authCtx.userData.userType === "JordanianUser" && (
              <Text style={styles.label}>
                {langCtx.language === "ar" ? "الرقم الوطني" : "Nationality Id"}
              </Text>
            )}
            {authCtx.userData.userType === "GazaSon" && (
              <Text style={styles.label}>
                {langCtx.language === "ar" ? "الرقم الملف" : "File Number"}
              </Text>
            )}
            <Text style={styles.value}>{authCtx.userData.primaryNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="call-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              {langCtx.language === "ar" ? "رقم الهاتف" : "Phone Number"}
            </Text>
            <Text style={styles.value}>{authCtx.userData.phoneNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="location-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              {langCtx.language === "ar" ? " المدينة" : " City"}
            </Text>
            <Text style={styles.value}>{authCtx.userData.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              {langCtx.language === "ar" ? "البريد الإلكتروني" : " Email"}
            </Text>
            <Text
              style={{
                color:
                  authCtx.userData.isEmailConfirmed === "True"
                    ? "green"
                    : "red",
              }}
            >
              {authCtx.userData.isEmailConfirmed === "True"
                ? "verified"
                : "Not verified"}
            </Text>
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
    paddingHorizontal: width * 0.04, // Use percentage of width for responsiveness
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: width * 0.04, // Use percentage of width for responsiveness
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
    fontSize: width * 0.08, // Adjust icon size based on width
    color: "#4CAF50",
    marginRight: width * 0.04, // Use percentage of width for responsiveness
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align text to the start
  },
  label: {
    fontSize: width * 0.045, // Adjust font size based on width
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: width * 0.045, // Adjust font size based on width
    color: "#666",
    marginTop: 4,
    paddingBottom: 5,
    textAlign: "left", // Align text to the left
    fontWeight: "bold",
  },
});
