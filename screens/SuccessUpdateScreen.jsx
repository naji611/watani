import React, { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../store/languageContext"; // Assuming you have this context

export default function SuccessUpdateScreen({ navigation }) {
  const langCtx = useContext(LanguageContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: langCtx.language === "ar" ? " " : " ",
    });
  }, [navigation]);

  const handleNextPress = () => {
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Ionicons name="checkmark-circle" style={styles.icon} />
        <Text style={styles.title}>
          {langCtx.language === "ar"
            ? "تم التحديث بنجاح!"
            : "Update Successful!"}
        </Text>
        <Text style={styles.message}>
          {langCtx.language === "ar"
            ? "تم تحديث بياناتك بنجاح. يمكنك الآن الرجوع إلى الصفحة الرئيسية."
            : "Your information has been updated successfully. You can now return to the home page."}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <Text style={styles.buttonText}>
            {langCtx.language === "ar"
              ? "العودة الى الصفحة الرئيسية    "
              : "Back to Home Screen "}
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
    backgroundColor: "#FFF8E1", // Light yellow background
    marginVertical: 200,
  },
  icon: {
    fontSize: 100,
    color: "#FFA726", // Warm orange color for success icon
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFA726", // Orange color for the title
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
    backgroundColor: "#FFA726", // Orange color for button
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
