import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import CustomAlert from "../components/UI/CustomAlert";
import { ForgetPassword } from "../utl/apis";
import LoadingIndicator from "../components/UI/LoadingIndicator";
export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  function handleSubmit() {
    if (!email || email.trim() === "") {
      setAlertVisible(true);
      setAlertMessage("Please enter your email");
      setAlertError(true);
    } else if (!isValidEmail(email)) {
      setAlertVisible(true);
      setAlertMessage("Please enter a valid email");
      setAlertError(true);
    } else {
      setIsLoading(true);
      ForgetPassword(email)
        .then((response) => {
          console.log(response.status);
          if (!response.status) {
            navigation.navigate("verifyEmailFromEmail");
          } else if (response.status === 404) {
            setAlertVisible(true);
            setAlertMessage("Email not found, try another email!");
            setAlertError(true);
          } else {
            setAlertVisible(true);
            setAlertMessage(response.message);
            setAlertError(true);
          }
        })
        .catch((error) => {
          setAlertVisible(true);
          setAlertMessage("An error occurred. Please try again.");
          setAlertError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      {isLoading && <LoadingIndicator></LoadingIndicator>}

      {!isLoading && (
        <>
          <View style={styles.screen}>
            <CustomAlert
              visible={alertVisible}
              message={alertMessage}
              onConfirm={() => setAlertVisible(false)}
              error={alertError}
            ></CustomAlert>

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
                <Button onPress={handleSubmit}>تأكيد</Button>
              </View>
            </View>
          </View>
        </>
      )}
    </>
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
