import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import OTPTextView from "react-native-otp-textinput";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
export default function OTPScreen() {
  return (
    <>
      <RegisterImage />
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>رمز التحقق</Text>
          <Text>لقد قمنا بارسال رمز التحقق إلى رقم هاتفك.</Text>
          <OTPTextView
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
          />

          <View>
            <Button
              style={styles.button}
              onPress={() => {
                //navigation.navigate("");
              }}
            >
              تأكيد
            </Button>
          </View>
        </View>
        <TouchableOpacity
          style={styles.reOTPContainer}
          onPress={() => {
            // navigation.navigate("");
          }}
        >
          <Text style={styles.reOTPText}> اعادة ارسال الرمز</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,

    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  otpContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: "#2E7D32",
    borderRadius: 15,
    textAlign: "center",
    fontSize: 24,
    color: "black",
    backgroundColor: "#fff",
    elevation: 2,
  },
  button: {
    width: "80%",
    height: 55,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reOTPContainer: {
    position: "absolute",
    top: 570,
    right: 50,
  },
  reOTPText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202720",
  },
});
