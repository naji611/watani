import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import CustomAlert from "../components/UI/CustomAlert";

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <View style={styles.screen}>
      {/* <CustomAlert
        visible={alertVisible}
        message={
          " lk fjdkslgnfjgnlndhjkdsnhgjkngdhkjfdnhjkn,.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbيرجى التأكد"
        }
        onConfirm={() => setAlertVisible(false)}
      ></CustomAlert> */}

      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>هل نسيت كلمة المرور</Text>
        <Input
          logo="mail-outline"
          placeHolder="ادخل  بريدك الالكتروني"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <View style={styles.button}>
          <Button
            onPress={() => {
              setAlertVisible(true);
              // navigation.navigate("verifyEmailFromEmail");
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
