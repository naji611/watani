import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import { Login } from "../utl/apis";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useContext } from "react";
import decodeToken from "../utl/converToken.js";
import { AuthContext } from "../store/TokenContext.jsx";
import { LanguageContext } from "../store/languageContext.jsx";

import CustomAlert from "../components/UI/CustomAlert.jsx";
const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [activeScreen, setActiveScreen] = useState("Login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    userName: true,
    password: true,
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  function handleLogin() {
    validateInputs();

    if (validation.userName && validation.password) {
      setIsLoading(true);
      Login(userName, password)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("Login successful:", response.data);
            // Decode the token to get user data
            const decodedData = decodeToken(response.data.token);
            const userData = {
              name: decodedData.name, // Full name
              email: decodedData.email,
              phoneNumber: decodedData.phone_number,
              governorateId: decodedData.governorateId,
              userType: decodedData.typ,
              id: decodedData.sub,
              expiration: decodedData.exp,
              primaryNumber: decodedData.nameid,
              phoneNumber: decodedData.phone_number,
              isEmailConfirmed: decodedData.isEmailConfirmed,
              // Add any other fields as needed
            };
            // Authenticate user and store data
            authCtx.authenticate(response.data.token, userData);
          } else if (response.status === 500) {
            setAlertMessage(
              langCtx.language === "en"
                ? "Sorry, the system is down."
                : " عذرًا، النظام معطل."
            );
            setAlertVisible(true);
            console.log("response:::", response);
          } else {
            // Handle other cases, for example, invalid user or password
            console.log("response:::else ", response);
            if (response.data.detail === "Can not find the specified user") {
              setAlertMessage(
                langCtx.language === "ar"
                  ? "لا يوجد مستخدم مسجل بهذا الرقم!"
                  : "User not found!"
              );
              setAlertVisible(true);
            } else if (
              response.data.detail === "Invalid username or password"
            ) {
              setAlertMessage(
                langCtx.language === "ar"
                  ? " الرقم السري او اسم المستخدم خطأ!"
                  : "Invalid username or password!"
              );
              setAlertVisible(true);
            } else {
              setAlertMessage(
                langCtx.language === "ar"
                  ? "خطأ غير معروف، يرجى المحاولة لاحقًا."
                  : "Unknown error, please try again later."
              );
              setAlertVisible(true);
            }
            console.log("Login failed:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);

          // Handle different error scenarios based on the type of error
          if (error.response) {
            // Server responded with an error status code
            setAlertMessage(
              langCtx.language === "ar"
                ? "حدث خطأ في الخادم، يرجى المحاولة لاحقًا."
                : "Server error, please try again later."
            );
            setAlertVisible(true);
          } else if (error.request) {
            // No response from server, network issue
            setAlertMessage(
              langCtx.language === "ar"
                ? "لم يتمكن من الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت."
                : "Could not connect to the server, please check your internet connection."
            );
            setAlertVisible(true);
          } else {
            // Something else went wrong (e.g., request configuration)
            setAlertMessage(
              langCtx.language === "ar"
                ? "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا."
                : "An unexpected error occurred. Please try again later."
            );
            setAlertVisible(true);
          }
        })
        .finally(() => {
          setIsLoading(false); // Ensure loading state is reset
        });
    } else {
      setAlertMessage(
        langCtx.language === "ar"
          ? "يرجى تعبئة البيانات بشكل صحيح"
          : "Please fill the fields correctly!"
      );
      setAlertVisible(true);
    }
  }

  function validateInputs() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Validate username: must not be null and must be exactly 10 characters long
    if (!userName || userName.length !== 10) {
      setValidation((prev) => ({ ...prev, userName: false }));
    } else {
      setValidation((prev) => ({ ...prev, userName: true }));
    }

    // Validate password: must not be null, and must match the regex criteria
    if (!password || !passwordRegex.test(password)) {
      setValidation((prev) => ({ ...prev, password: false }));
    } else {
      setValidation((prev) => ({ ...prev, password: true }));
    }
  }

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        error={true}
      ></CustomAlert>
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {!isLoading && (
        <ScrollView style={styles.screen}>
          <RegisterImage />
          <View
            style={[
              styles.tabs,
              {
                left: langCtx.language === "en" ? width / 20 : width / 25,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    activeScreen === "Login" ? "#88B788" : "green",
                },
              ]}
            >
              <Text style={styles.textTab}>
                {langCtx.language === "ar" ? "حساب جديد" : "SignUp"}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    activeScreen === "Login" ? "green" : "#88B788",
                },
              ]}
            >
              <Text style={styles.textTab}>
                {langCtx.language === "ar" ? "تسجيل الدخول " : "Login"}
              </Text>
            </View>
          </View>
          <View style={styles.form}>
            <Input
              placeHolder={
                langCtx.language === "ar"
                  ? " الرقم الوطني "
                  : "Nationality Number"
              }
              logo={"id"}
              keyboardType="numeric"
              borderColorRed={validation.userName === false}
              onChangeText={(val) => setUserName(val)}
              value={userName}
              maxLength={10}
            ></Input>

            <Input
              placeHolder={
                langCtx.language === "ar" ? " كلمة المرور" : "password"
              }
              secureTextEntry={true}
              borderColorRed={validation.password === false}
              onChangeText={(val) => setPassword(val)}
              value={password}
            ></Input>
          </View>
          <TouchableOpacity
            style={styles.forgetContainer}
            onPress={() => {
              navigation.navigate("ForgetPasswordScreen");
            }}
          >
            <Text style={[styles.forgetText, {}]}>
              {" "}
              {langCtx.language === "ar"
                ? "هل نسيت كلمة المرور؟"
                : "Forget Password?"}
            </Text>
          </TouchableOpacity>
          <View style={styles.onButton}>
            <Button onPress={handleLogin}>
              {" "}
              {langCtx.language === "ar" ? "الدخول " : " Sign in"}
            </Button>
          </View>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1 },

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 230,
    marginHorizontal: 40,
  },
  rowInputs: {
    flexDirection: "row",
  },
  tabs: {
    flexDirection: "row",
    position: "absolute",
    top: 140,
  },
  tab: {
    width: width / 2.25,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  textTab: {
    fontSize: width < 360 ? 15 : 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  forgetContainer: {
    marginHorizontal: 40,
  },
  forgetText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#202720",
  },
  onButton: {
    marginTop: 20,
  },
});
