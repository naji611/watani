import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../store/languageContext"; // Assuming you have this context

export default function SuccessComplaintScreen({ navigation }) {
  const langCtx = useContext(LanguageContext);

  const handleNextPress = () => {
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Ionicons name="checkmark-circle" style={styles.icon} />
        <Text style={styles.title}>
          {langCtx.language === "ar"
            ? "تمت العملية بنجاح!"
            : "Operation Successful!"}
        </Text>
        <Text style={styles.message}>
          {langCtx.language === "ar"
            ? "تم ارسال طلبك بنجاح. يمكنك الآن متابعة طلبك من خلال تتبع الطلبات."
            : "Your request has been submitted successfully. You can now track your request."}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <Text style={styles.buttonText}>
            {langCtx.language === "ar"
              ? "الذهاب إلى الصفحة الرئيسية"
              : "Go to Home Page"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light gray background
    marginVertical: 200,
  },
  icon: {
    fontSize: 100,
    color: "#4CAF50", // Green color for success
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50", // Green color for the title
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50", // Green color for button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3, // Elevation for Android
  },
  buttonText: {
    color: "#fff", // White color for button text
    fontSize: 16,
    fontWeight: "bold",
  },
});
