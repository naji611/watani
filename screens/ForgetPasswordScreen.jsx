import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import CustomAlert from "../components/UI/CustomAlert";
import { ForgetPassword } from "../utl/apis";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { LanguageContext } from "../store/languageContext";
export default function ForgetPasswordScreen({ navigation }) {
  const langCtx = useContext(LanguageContext);
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
      setAlertMessage(
        langCtx.language === "en"
          ? "Please enter your email"
          : "يرجى إدخال بريدك الإلكتروني"
      );
      setAlertError(true);
    } else if (!isValidEmail(email)) {
      setAlertVisible(true);
      setAlertMessage(
        langCtx.language === "en"
          ? "Please enter a valid email"
          : "يرجى إدخال بريد إلكتروني صالح"
      );
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
            setAlertMessage(
              langCtx.language === "en"
                ? "Email not found, try another email!"
                : "البريد الإلكتروني غير موجود، جرب بريدًا آخر!"
            );
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
              <Text style={styles.text}>
                {" "}
                {langCtx.language === "ar"
                  ? "هل نسيت كلمة المرور "
                  : " Forget Your Password"}
              </Text>
              <Input
                logo="mail-outline"
                placeHolder={
                  langCtx.language === "ar"
                    ? " ادخل بريدك الالكتروني"
                    : "  Enter your Email"
                }
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
    fontSize: 20,
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
