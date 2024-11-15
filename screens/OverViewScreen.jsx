import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { LanguageContext } from "../store/languageContext";

const { width } = Dimensions.get("window");

export default function OverViewScreen() {
  const langCtx = useContext(LanguageContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image
        source={require("../assets/HeaderLogo.png")}
        style={[styles.image]} // Apply rotation
      />
      <Text style={styles.description}>
        {langCtx.language === "ar"
          ? "وطني هو تطبيق يتيح للمستخدمين تقديم الشكاوى في جميع أنحاء الأردن. تم تصميمه لتوفير المزيد من المرونة للمواطنين للتواصل مع البلديات. من خلال تطبيق وطني، يمكنك بسهولة الإبلاغ عن المشكلات، ومشاركة الملاحظات، والمساهمة في تحسين المجتمع."
          : "Watani is an app that allows users to make complaints in all places in Jordan. It is built to provide more flexibility for citizens to communicate with municipalities. With Watani, you can easily report issues, share feedback, and contribute to a better community."}
      </Text>

      <Text style={styles.contactTitle}>
        {langCtx.language === "ar" ? "تواصل معنا" : "Contact Us"}
      </Text>

      <Text style={styles.contactEmail}>
        {langCtx.language === "ar"
          ? " watanihu@gmail.com"
          : " watanihu@gmail.com"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width > 400 ? 30 : 20, // Responsive padding based on screen width
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: width * 0.3, // Set the width of the image (60% of screen width)
    height: width * 0.3, // Set the height of the image to match the width for a square aspect ratio
    alignSelf: "center", // Center the image horizontally
    marginBottom: 20, // Add some margin below the image
    resizeMode: "contain", // Resize the image to fit within the bounds
  },
  description: {
    fontSize: width > 400 ? 18 : 16, // Responsive font size
    marginBottom: 15,
    color: "#333",
    lineHeight: 24,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contactTitle: {
    fontSize: width > 400 ? 26 : 24, // Responsive font size for contact title
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    color: "#4CAF50",
  },
  contactEmail: {
    fontSize: width > 400 ? 18 : 16, // Responsive font size for email
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
