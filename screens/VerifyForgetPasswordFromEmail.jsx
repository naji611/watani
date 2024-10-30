import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import { LanguageContext } from "../store/languageContext"; // Assuming you have a LanguageContext

export default function PasswordResetConfirmationScreen({ navigation }) {
  const langCtx = useContext(LanguageContext); // Access language context

  return (
    <View style={styles.screen}>
      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>
          {langCtx.language === "ar"
            ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
            : "A password reset link has been sent to your email"}
        </Text>
        <Text style={styles.subText}>
          {langCtx.language === "ar"
            ? "يرجى التحقق من بريدك الإلكتروني واتباع التعليمات"
            : "Please check your email and follow the instructions"}
        </Text>
        <View style={styles.button}>
          <Button
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            {langCtx.language === "ar"
              ? "العودة إلى تسجيل الدخول"
              : "Back to Login"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 20,
  },
  subText: {
    color: "gray",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 30,
  },
  button: {
    width: "100%",
    height: 55,
  },
});
