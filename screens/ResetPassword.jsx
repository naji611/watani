import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";

export default function ResetPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      // Logic for resetting the password
      navigation.navigate("LoginScreen");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <View style={styles.screen}>
      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>إعادة تعيين كلمة المرور</Text>
        <Input
          placeHolder="ادخل كلمة المرور الجديدة"
          value={newPassword}
          onChangeText={(val) => setNewPassword(val)}
          secureTextEntry
        />
        <Input
          placeHolder="تأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button onPress={handleResetPassword}>إعادة تعيين</Button>
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
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 55,
  },
});
