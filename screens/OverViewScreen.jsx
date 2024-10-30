import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LanguageContext } from "../store/languageContext";

const { width } = Dimensions.get("window"); // Get the screen width

export default function OverViewScreen() {
  const langCtx = useContext(LanguageContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.description}>
        {langCtx.language === "ar"
          ? "وطني هو تطبيق يتيح للمستخدمين تقديم الشكاوى في جميع أنحاء الأردن. تم تصميمه لتوفير المزيد من المرونة للمواطنين للتواصل مع البلديات. من خلال تطبيق وطني، يمكنك بسهولة الإبلاغ عن المشكلات، ومشاركة الملاحظات، والمساهمة في تحسين المجتمع."
          : "Watani is an app that allows users to make complaints in all places in Jordan. It is built to provide more flexibility for citizens to communicate with municipalities. With Watani, you can easily report issues, share feedback, and contribute to a better community."}
      </Text>

      <Text style={styles.description}>
        {langCtx.language === "ar"
          ? "نأمل أن يجعل هذا التطبيق تجربتك أكثر كفاءة ومتعة. لأي ملاحظات أو دعم، يرجى التواصل معنا من خلال قسم الاتصال."
          : "We hope this app makes your experience more efficient and enjoyable. For any feedback or support, please reach out to us through the contact section."}
      </Text>

      <Text style={styles.contactTitle}>
        {langCtx.language === "ar" ? "تواصل معنا" : "Contact Us"}
      </Text>

      <Text style={styles.contactEmail}>
        {langCtx.language === "ar"
          ? "البريد الإلكتروني: watanihu@gmail.com"
          : "Email: watanihu@gmail.com"}
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
