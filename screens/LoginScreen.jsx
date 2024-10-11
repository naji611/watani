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
export default function LoginScreen({ navigation }) {
  const [activeScreen, setActiveScreen] = useState("Login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    userName: true,
    password: true,
  });
  function handleLogin() {
    validateInputs();
    if (validation.userName && validation.password) {
      // console.log(userName, password);
      Login(userName, password)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            navigation.navigate("SuccessRegistrationScreen");
          }
        })

        .catch((response) => {
          console.log("Error during Logging:", response);
        });
    } else {
      alert("Please fill all the fields");
    }
  }
  function validateInputs() {
    if (userName.length === 0) {
      setValidation((prev) => ({ ...prev, userName: false }));
    } else {
      setValidation((prev) => ({ ...prev, userName: true }));
    }
    if (password.length === 0) {
      setValidation((prev) => ({ ...prev, password: false }));
    } else {
      setValidation((prev) => ({ ...prev, password: true }));
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <RegisterImage />
      <View style={[styles.tabs]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={[
            styles.tab,
            {
              borderBottomColor: activeScreen === "Login" ? "#88B788" : "green",
            },
          ]}
        >
          <Text style={styles.textTab}> حساب جديد </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.tab,
            {
              borderBottomColor: activeScreen === "Login" ? "green" : "#88B788",
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
