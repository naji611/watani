import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import HeaderImage from "../components/UI/HeaderImage";
import RegisterImage from "../components/UI/RegisterImage";
import { Login } from "../utl/apis";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useContext } from "react";
import decodeToken from "../utl/converToken.js";

import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
export default function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [activeScreen, setActiveScreen] = useState("Login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    userName: true,
    password: true,
  });
  function handleLogin() {
    validateInputs();

    if (validation.userName && validation.password) {
      setIsLoading(true);

      Login(userName, password)
        .then((response) => {
          if (response.status === 200) {
            console.log("Login successful:", response.data);

            // Decode the token to get user data
            const decodedData = decodeToken(response.data.token);

            const userData = {
              name: decodedData.name, // Full name
              email: decodedData.email,
              phoneNumber: decodedData.phone_number,
              city: decodedData.City,
              userType: decodedData.typ,
              id: decodedData.sub,
              expiration: decodedData.exp,
              primaryNumber: decodedData.nameid,
              phoneNumber: decodedData.phone_number,
              // Add any other fields as needed
            };
            // Authenticate user and store data
            authCtx.authenticate(response.data.token, userData);
          } else {
            console.log("Login failed:", response.status);
            console.log(
              "Login failed:",
              response.data.message || "Unknown error"
            );
            alert(response.data.message || "Login failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          alert("An error occurred during login. Please try again.");
        })
        .finally(() => {
          setIsLoading(false); // Ensure loading state is reset
        });
    } else {
      alert("Please fill in all the fields");
    }
  }

  function validateInputs() {
    if (userName.length === 0 || userName !== null) {
      setValidation((prev) => ({ ...prev, userName: false }));
    } else {
      setValidation((prev) => ({ ...prev, userName: true }));
    }
    if (password.length === 0 || userName !== null) {
      setValidation((prev) => ({ ...prev, password: false }));
    } else {
      setValidation((prev) => ({ ...prev, password: true }));
    }
  }

  return (
    <>
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {!isLoading && (
        <ScrollView style={styles.screen}>
          <RegisterImage />
          <View style={[styles.tabs]}>
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
              <Text style={styles.textTab}> حساب جديد </Text>
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
              <Text style={styles.textTab}>تسجيل الدخول</Text>
            </View>
          </View>
          <View style={styles.form}>
            <Input
              placeHolder={"اسم المستخدم "}
              logo={"id"}
              borderColorRed={validation.userName === false}
              onChangeText={(val) => setUserName(val)}
              value={userName}
            ></Input>

            <Input
              placeHolder={" كلمة المرور"}
              logo={"lock-closed"}
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
            <Text style={styles.forgetText}>هل نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
          <View style={styles.onButton}>
            <Button onPress={handleLogin}>الدخول </Button>
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
    left: 40,
  },
  tab: {
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  textTab: {
    fontSize: 20,
    fontWeight: "bold",
  },
  forgetContainer: {
    marginRight: 230,
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
