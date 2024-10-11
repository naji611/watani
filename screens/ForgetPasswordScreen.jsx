import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";

export default function ForgetPasswordScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>هل نسيت كلمة المرور</Text>
        <Input logo="phone" placeHolder="ادخل رقم هاتفك" />
        <View style={styles.button}>
          <Button
            onPress={() => {
              navigation.navigate("OTPScreen");
            }}
          >
            تأكيد
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
    marginBottom: 30,
    marginLeft: 130,
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 55,
  },
});
