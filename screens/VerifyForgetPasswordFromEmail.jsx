import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";

export default function PasswordResetConfirmationScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>
          تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
        </Text>
        <Text style={styles.subText}>
          يرجى التحقق من بريدك الإلكتروني واتباع التعليمات
        </Text>
        <View style={styles.button}>
          <Button
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            العودة إلى تسجيل الدخول
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
