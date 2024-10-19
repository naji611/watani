import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import CustomAlert from "../components/UI/CustomAlert";
import { ChangePassword } from "../utl/apis";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";

export default function ChangePasswordScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modelMessage, setModelMessage] = useState("something Wrong");
  const [modelVisible, setModelVisible] = useState(false);
  const [validation, setValidation] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });
  const handleResetPassword = () => {
    validateInputs();
    if (
      validation.newPassword &&
      validation.confirmPassword &&
      validation.oldPassword
    ) {
      // Logic for resetting the password
      console.log(newPassword, oldPassword, confirmPassword);
      ChangePassword(
        { newPassword, oldPassword, email: authCtx.userData.email },
        authCtx.token
      ).then((response) => {
        if (response.status === 204) {
          setModelMessage("Password Changed Successfully");
          setModelVisible(true);
          navigation.navigate("HomeTabs");
        } else {
          if (validation.newPassword !== validation.confirmPassword) {
            setModelMessage("the confirm password is not match ");

            setModelVisible(true);
          }
          console.log(response);
          setModelMessage("Something went wrong");
          setModelVisible(true);
        }
      });

      console.log("valid inputs");
    } else {
      setModelMessage("please fill all fields");
      setModelVisible(true);
    }
  };
  function validateInputs() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (
      oldPassword === null ||
      oldPassword.length === 0 ||
      !passwordRegex.test(oldPassword)
    ) {
      setValidation((prev) => ({ ...prev, oldPassword: false }));
    } else {
      setValidation((prev) => ({ ...prev, oldPassword: true }));
    }
    if (
      newPassword.length === 0 ||
      newPassword === null ||
      !passwordRegex.test(newPassword)
    ) {
      setValidation((prev) => ({ ...prev, newPassword: false }));
    } else {
      setValidation((prev) => ({ ...prev, newPassword: true }));
    }
    if (
      confirmPassword.length === 0 ||
      confirmPassword === null ||
      newPassword !== confirmPassword ||
      !passwordRegex.test(confirmPassword)
    ) {
      setValidation((prev) => ({ ...prev, confirmPassword: false }));
    } else {
      setValidation((prev) => ({ ...prev, confirmPassword: true }));
    }
  }

  return (
    <View style={styles.screen}>
      <CustomAlert
        visible={modelVisible}
        message={modelMessage}
        onConfirm={() => setModelVisible(false)}
      ></CustomAlert>
      <RegisterImage />
      <View style={styles.container}>
        <Text style={styles.text}>إعادة تعيين كلمة المرور</Text>
        <Input
          placeHolder="ادخل كلمة المرور القديمة"
          value={oldPassword}
          onChangeText={(val) => setOldPassword(val)}
          secureTextEntry
          borderColorRed={validation.oldPassword === false}
        />
        <Input
          placeHolder="ادخل كلمة المرور الجديدة"
          value={newPassword}
          onChangeText={(val) => setNewPassword(val)}
          secureTextEntry
          borderColorRed={validation.newPassword === false}
        />
        <Input
          placeHolder="تأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
          secureTextEntry
          borderColorRed={validation.confirmPassword === false}
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
