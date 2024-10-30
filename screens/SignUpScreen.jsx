import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import RegisterImage from "../components/UI/RegisterImage";
import RadioGroup from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import {
  RegisterJordanian,
  RegisterJordanianWomenChild,
  RegisterGazaSons,
  RegisterForeign,
} from "../utl/apis";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import decodeToken from "../utl/converToken.js";
import CustomAlert from "../components/UI/CustomAlert.jsx";
import { LanguageContext } from "../store/languageContext.jsx";
const { width, height } = Dimensions.get("window");
const jordanCitiesEN = [
  { id: 1, name: "Amman" },
  { id: 2, name: "Zarqa" },
  { id: 3, name: "Irbid" },
  { id: 4, name: "Aqaba" },
  { id: 5, name: "Mafraq" },
  { id: 6, name: "Salt" },
  { id: 7, name: "Madaba" },
  { id: 8, name: "Jerash" },
  { id: 9, name: "Ajloun" },
  { id: 10, name: "Ma'an" },
  { id: 11, name: "Karak" },
  { id: 12, name: "Tafilah" },
];
const jordanCitiesAR = [
  { id: 1, name: "عمان" },
  { id: 2, name: "الزرقاء" },
  { id: 3, name: "إربد" },
  { id: 4, name: "العقبة" },
  { id: 5, name: "المفرق" },
  { id: 6, name: "السلط" },
  { id: 7, name: "مادبا" },
  { id: 8, name: "جرش" },
  { id: 9, name: "عجلون" },
  { id: 10, name: "معان" },
  { id: 11, name: "الكرك" },
  { id: 12, name: "الطفيلة" },
];

export default function SignUpScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [activeScreen, setActiveScreen] = useState("signUp");
  const [selectedId, setSelectedId] = useState("1");
  const [selectedCity, setSelectedCity] = useState(jordanCitiesAR[0].name);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [LastName, setLastName] = useState("");
  const [nationalityId, setNationalityId] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serialNumberJordanSn, setSerialNumberJordanSn] = useState("");
  const [documentNumberJordanSn, setDocumentNumberJordanSn] = useState("");
  const [fileNumberGaza, setFileNumberGaza] = useState("");
  const [documentNumberGaza, setDocumentNumberGaza] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workflow, setWorkflow] = useState(1);
  const [validation, setValidation] = useState({
    firstName: true,
    secondName: true,
    thirdName: true,
    LastName: true,
    email: true,
    password: true,
    confirmPassword: true,
    nationalityId: true,
    identityNumber: true,
    phoneNumber: true,
    serialNumberJordanSn: true,
    documentNumberJordanSn: true,
    fileNumberGaza: true,
    documentNumberGaza: true,
    personalNumber: true,
    birthYear: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    firstName: null,
    secondName: null,
    thirdName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    nationalityId: null,
    identityNumber: null,
    phoneNumber: null,
    serialNumberJordanSn: null,
    documentNumberJordanSn: null,
    fileNumberGaza: null,
    documentNumberGaza: null,
    personalNumber: null,
    birthYear: null,
  });

  function validInputs() {
    let updatedValidation = { ...validation };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^07[789]\d{7}$/;

    let isValid = true;

    // General validation for all cases
    if (!emailRegex.test(email.trim())) {
      updatedValidation.email = false;
      isValid = false;
    } else {
      updatedValidation.email = true;
    }

    if (firstName === "") {
      updatedValidation.firstName = false;
      isValid = false;
    } else {
      updatedValidation.firstName = true;
    }

    if (secondName === "") {
      updatedValidation.secondName = false;
      isValid = false;
    } else {
      updatedValidation.secondName = true;
    }

    if (thirdName === "") {
      updatedValidation.thirdName = false;
      isValid = false;
    } else {
      updatedValidation.thirdName = true;
    }

    if (LastName === "") {
      updatedValidation.LastName = false;
      isValid = false;
    } else {
      updatedValidation.LastName = true;
    }

    if (!phoneRegex.test(phoneNumber)) {
      updatedValidation.phoneNumber = false;
      isValid = false;
    } else {
      updatedValidation.phoneNumber = true;
    }

    if (!passwordRegex.test(password)) {
      updatedValidation.password = false;
      isValid = false;
    } else {
      updatedValidation.password = true;
    }

    if (!passwordRegex.test(password) || confirmPassword !== password) {
      updatedValidation.confirmPassword = false;
      isValid = false;
    } else {
      updatedValidation.confirmPassword = true;
    }

    // Conditional validation based on selectedId
    if (selectedId === "1") {
      // Validation for Jordanian users
      if (nationalityId.length !== 10) {
        updatedValidation.nationalityId = false;
        isValid = false;
      } else {
        updatedValidation.nationalityId = true;
      }

      if (identityNumber.length !== 8) {
        updatedValidation.identityNumber = false;
        isValid = false;
      } else {
        updatedValidation.identityNumber = true;
      }
    } else if (selectedId === "2") {
      // Validation for Jordanian Women Child users
      if (serialNumberJordanSn.length !== 10) {
        updatedValidation.serialNumberJordanSn = false;
        isValid = false;
      } else {
        updatedValidation.serialNumberJordanSn = true;
      }

      if (documentNumberJordanSn.length !== 8) {
        updatedValidation.documentNumberJordanSn = false;
        isValid = false;
      } else {
        updatedValidation.documentNumberJordanSn = true;
      }
    } else if (selectedId === "3") {
      // Validation for Gaza Sons users
      if (fileNumberGaza.length !== 10) {
        updatedValidation.fileNumberGaza = false;
        isValid = false;
      } else {
        updatedValidation.fileNumberGaza = true;
      }

      if (documentNumberGaza.length !== 8) {
        updatedValidation.documentNumberGaza = false;
        isValid = false;
      } else {
        updatedValidation.documentNumberGaza = true;
      }
    } else if (selectedId === "4") {
      // Validation for Foreign users
      if (personalNumber.length !== 10) {
        updatedValidation.personalNumber = false;
        isValid = false;
      } else {
        updatedValidation.personalNumber = true;
      }

      if (birthYear.length !== 4) {
        updatedValidation.birthYear = false;
        isValid = false;
      } else {
        updatedValidation.birthYear = true;
      }
    }

    setValidation(updatedValidation);
    return isValid; // Return true if all relevant validations pass
  }

  const radioButtonsAR = [
    {
      id: "1",
      label: "أردني", // Jordanian
      value: "jordanian",
      selected: true,
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "2",
      label: "ابناء الاردنيات", // Children of Jordanian Women
      value: "children_of_jordanian_women",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "3",
      label: "ابناء غزة", // Children of Gaza
      value: "children_of_gaza",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "4",
      label: "اجنبي", // Foreigner
      value: "foreigner",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
  ];
  const radioButtonsEN = [
    {
      id: "1",
      label: "Jordanian",
      value: "jordanian",
      selected: true,
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "2",
      label: "Children of Jordanian Women",
      value: "children_of_jordanian_women",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "3",
      label: "Children of Gaza",
      value: "children_of_gaza",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
    {
      id: "4",
      label: "Foreigner",
      value: "foreigner",
      labelStyle: styles.radioLabel,
      containerStyle: styles.radioContainer,
    },
  ];

  function onPressRadioButton(selectedId) {
    // setRadioButtons(radioButtonsArray);
    console.log(selectedId);
    setSelectedId(selectedId);
  }
  // Validation function for Jordanians
  function isValidJordanian() {
    return (
      validation.firstName &&
      validation.email &&
      validation.secondName &&
      validation.thirdName &&
      validation.LastName &&
      validation.nationalityId &&
      validation.identityNumber &&
      validation.phoneNumber &&
      validation.password &&
      validation.confirmPassword
    );
  }

  // Validation function for Jordanian Women and Children
  function isValidJordanianWomenChild() {
    return (
      validation.firstName &&
      validation.secondName &&
      validation.thirdName &&
      validation.LastName &&
      validation.phoneNumber &&
      validation.email &&
      validation.password &&
      validation.documentNumberJordanSn &&
      validation.serialNumberJordanSn
    );
  }

  // Validation function for Gaza Sons
  function isValidGazaSon() {
    return (
      validation.firstName &&
      validation.secondName &&
      validation.thirdName &&
      validation.LastName &&
      validation.phoneNumber &&
      validation.email &&
      validation.password &&
      validation.documentNumberGaza &&
      validation.fileNumberGaza
    );
  }

  function isValidForeign() {
    return (
      validation.firstName &&
      validation.secondName &&
      validation.thirdName &&
      validation.LastName &&
      validation.phoneNumber &&
      validation.email &&
      validation.password &&
      validation.personalNumber &&
      validation.birthYear
    );
  }
  function handleRegistrationSuccess(response) {
    const decodedData = decodeToken(response.data.token);
    const userData = {
      name: decodedData.name,
      email: decodedData.email,
      phoneNumber: decodedData.phone_number,
      city: decodedData.city,
      userType: decodedData.typ,
      id: decodedData.sub,
      expiration: decodedData.exp,
      primaryNumber: decodedData.nameid,
      isEmailConfirmed: decodedData.isEmailConfirmed,
    };
    navigation.navigate("SuccessRegistrationScreen", {
      token: response.data.token,
      userData: userData,
    });
  }
  function handleRegistrationFailure(response) {
    if (response.status === 500) {
      setAlertMessage("Sorry", "The system is down");
      setAlertError(true);
      setAlertVisible(true);
    } else {
      if (response.data.detail) {
        setAlertMessage("Registration failed," + response.data.detail);
        setAlertError(true);
        setAlertVisible(true);
      }

      if (response.data.errors) {
        console.log(response.data.errors);
        if (response.data.errors.DocumentNumber) {
          setAlertMessage("Document Number is not in the correct format.");
          setAlertError(true);
          setAlertVisible(true);
        } else if (response.data.errors.SerialNumber) {
          setAlertMessage("Serial Number is not in the correct format.");
          setAlertError(true);
          setAlertVisible(true);
        } else if (response.data.errors.FileNumber) {
          setAlertMessage("File Number is not in the correct format.");
          setAlertError(true);
          setAlertVisible(true);
        } else if (response.data.errors.PersonalNumber) {
          setAlertMessage("Personal Number is not in the correct format.");
          setAlertError(true);
          setAlertVisible(true);
        }
      }
    }
  }
  function handleError(error) {
    if (error.response && error.response.status === 400) {
      console.log("error:", error);
      const errorData = error.response.data;
      if (errorData.errors) {
        console.log("Validation errors:", errorData.errors);
      } else if (errorData.detail) {
        setErrorMessage({ general: errorData.detail });
        console.log("General error:", errorData.detail);
      }
    } else {
      console.log("Error during registration:", error);
    }
  }

  function submitRegistration(apiCall, registrationData) {
    setIsLoading(true);
    apiCall(registrationData)
      .then((response) => {
        if (response.status === 200) {
          handleRegistrationSuccess(response);
        } else {
          handleRegistrationFailure(response);
        }
      })
      .catch(handleError)
      .finally(() => setIsLoading(false));
  }
  function onSubmit() {
    const isFormValid = validInputs();

    // Registration flow for Jordanians
    if (selectedId == 1 && isFormValid) {
      const registrationData = {
        firstName,
        secondName,
        thirdName,
        LastName,
        phoneNumber,
        email: email.trim(),
        password,
        City: selectedCity,
        nationalityNumber: nationalityId,
        verificationMechanism: "IdentityNumber",
        identityNumber: identityNumber.toUpperCase(),
        civilRegistrationNumber: null,
      };
      submitRegistration(RegisterJordanian, registrationData);
    }
    // Registration flow for Jordanian Women and Children
    else if (selectedId == 2 && isFormValid) {
      const registrationData = {
        firstName,
        secondName,
        thirdName,
        LastName,
        phoneNumber,
        email: email.trim(),
        password,
        City: selectedCity,
        documentNumber: documentNumberJordanSn,
        serialNumber: serialNumberJordanSn,
      };
      submitRegistration(RegisterJordanianWomenChild, registrationData);
    }
    // Registration flow for Gaza Sons
    else if (selectedId == 3 && isFormValid) {
      const registrationData = {
        firstName,
        secondName,
        thirdName,
        LastName,
        phoneNumber,
        email: email.trim(),
        password,
        City: selectedCity,
        documentNumber: documentNumberGaza,
        fileNumber: fileNumberGaza,
      };
      submitRegistration(RegisterGazaSons, registrationData);
    }
    // Registration flow for Foreigners
    else if (selectedId == 4 && isFormValid) {
      const registrationData = {
        firstName,
        secondName,
        thirdName,
        LastName,
        phoneNumber,
        email: email.trim(),
        password,
        City: selectedCity,
        personalNumber,
        yearOfBirth: birthYear,
      };
      submitRegistration(RegisterForeign, registrationData);
    }
    // Fallback for invalid inputs
    else {
      setAlertMessage("Validation failed. Please fill in all required fields.");
      setAlertError(true);
      setAlertVisible(true);
      console.log("Validation failed. Please fill in all required fields.");
    }
  }

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        error={alertError}
      ></CustomAlert>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.scrollViewContent}
        >
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
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    activeScreen === "signUp" ? "green" : "#88B788",
                },
              ]}
            >
              <Text style={styles.textTab}>
                {" "}
                {langCtx.language === "ar" ? "حساب جديد" : "SignUp"}{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    activeScreen === "signUp" ? "#88B788" : "green",
                },
              ]}
            >
              <Text style={styles.textTab}>
                {" "}
                {langCtx.language === "ar" ? "تسجيل الدخول " : "Login"}{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>
              {langCtx.language === "ar" ? " الجنسية" : "nationality"}
            </Text>
            <RadioGroup
              radioButtons={
                langCtx.language === "ar" ? radioButtonsAR : radioButtonsEN
              }
              onPress={onPressRadioButton}
              layout="row" // Layout in a row
              containerStyle={styles.radioGroup}
              selectedId={selectedId}
              color="green"
            />
            <View style={styles.rowInputs}>
              <Input
                placeHolder={
                  langCtx.language === "ar" ? "الاسم الثاني " : "Second name"
                }
                logo={"person"}
                width="small"
                onChangeText={(val) => setSecondName(val)}
                value={secondName}
                borderColorRed={validation.secondName === false}
                maxLength={50}
              />
              <Input
                placeHolder={
                  langCtx.language === "ar" ? "الاسم الاول " : "First name"
                }
                logo={"person"}
                width="small"
                onChangeText={(val) => setFirstName(val)}
                value={firstName}
                borderColorRed={validation.firstName === false}
                maxLength={50}
              />
            </View>
            <View style={styles.rowInputs}>
              <Input
                placeHolder={
                  langCtx.language === "ar" ? "الاسم الرابع " : "Fourth name"
                }
                logo={"person"}
                width="small"
                onChangeText={(val) => setLastName(val)}
                value={LastName}
                borderColorRed={validation.LastName === false}
                maxLength={50}
              />

              <Input
                placeHolder={
                  langCtx.language === "ar" ? "الاسم الثالث " : "Third name"
                }
                logo={"person"}
                width="small"
                onChangeText={(val) => setThirdName(val)}
                value={thirdName}
                borderColorRed={validation.thirdName === false}
                maxLength={50}
              />
            </View>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem} // Bold text applied here
                mode={"dropdown"}
              >
                {(langCtx.language === "en"
                  ? jordanCitiesEN
                  : jordanCitiesAR
                ).map((city) => (
                  <Picker.Item
                    key={city.id}
                    label={city.name}
                    value={city.name}
                  />
                ))}
              </Picker>
            </View>
            <Input
              placeHolder={
                langCtx.language === "ar" ? " البريد الالكتروني" : " Email"
              }
              logo={"mail"}
              onChangeText={(val) => setEmail(val)}
              value={email}
              borderColorRed={validation.email === false}
            />
            {selectedId === "1" && (
              <>
                <Input
                  placeHolder={
                    langCtx.language === "ar"
                      ? "الرقم الوطني"
                      : "Nationality Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setNationalityId(val)}
                  value={nationalityId}
                  keyboardType="numeric"
                  borderColorRed={validation.nationalityId === false}
                  maxLength={10}
                />
                <Input
                  placeHolder={
                    langCtx.language === "ar" ? "رقم الهوية" : "Identity Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setIdentityNumber(val)}
                  value={identityNumber}
                  borderColorRed={validation.identityNumber === false}
                  maxLength={8}
                />
              </>
            )}
            {selectedId === "2" && (
              <>
                <Input
                  placeHolder={
                    langCtx.language === "ar"
                      ? "الرقم المتسلسل"
                      : "Serial Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setSerialNumberJordanSn(val)}
                  value={serialNumberJordanSn}
                  borderColorRed={validation.serialNumberJordanSn === false}
                  maxLength={10}
                  keyboardType="numeric"
                />
                <Input
                  placeHolder={
                    langCtx.language === "ar"
                      ? "رقم الوثيقة"
                      : "Document Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setDocumentNumberJordanSn(val)}
                  value={documentNumberJordanSn}
                  borderColorRed={validation.documentNumberJordanSn === false}
                  maxLength={8}
                  keyboardType="numeric"
                />
              </>
            )}
            {selectedId === "3" && (
              <>
                <Input
                  placeHolder={
                    langCtx.language === "ar" ? "رقم الملف" : "File Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setFileNumberGaza(val)}
                  value={fileNumberGaza}
                  borderColorRed={validation.fileNumberGaza === false}
                  maxLength={10}
                  keyboardType="numeric"
                />

                <Input
                  placeHolder={
                    langCtx.language === "ar"
                      ? "رقم الوثيقة"
                      : "Document Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setDocumentNumberGaza(val)}
                  value={documentNumberGaza}
                  borderColorRed={validation.documentNumberGaza === false}
                  maxLength={8}
                  keyboardType="numeric"
                />
              </>
            )}
            {selectedId === "4" && (
              <>
                <Input
                  placeHolder={
                    langCtx.language === "ar"
                      ? "الرقم الشخصي"
                      : "Personal Number"
                  }
                  logo={"id"}
                  onChangeText={(val) => setPersonalNumber(val)}
                  value={personalNumber}
                  borderColorRed={validation.personalNumber === false}
                  maxLength={10}
                  keyboardType="numeric"
                />

                <Input
                  placeHolder={
                    langCtx.language === "ar" ? "سنة الميلاد" : "Birth Year"
                  }
                  logo={"calendar-outline"}
                  onChangeText={(val) => setBirthYear(val)}
                  value={birthYear}
                  borderColorRed={validation.birthYear === false}
                  maxLength={4}
                  keyboardType="numeric"
                />
              </>
            )}
            <Input
              placeHolder={
                langCtx.language === "ar" ? "رقم الهاتف" : "Phone Number"
              }
              logo={"call"}
              onChangeText={(val) => setPhoneNumber(val)}
              value={phoneNumber}
              keyboardType="numeric"
              borderColorRed={validation.phoneNumber === false}
              maxLength={10}
            />
            <Input
              placeHolder={
                langCtx.language === "ar" ? "كلمة المرور" : "Password"
              }
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
              value={password}
              borderColorRed={validation.password === false}
              maxLength={20}
            />
            <Input
              placeHolder={
                langCtx.language === "ar"
                  ? "تأكيد كلمة المرور"
                  : "Confirm Password"
              }
              secureTextEntry={true}
              onChangeText={(val) => setConfirmPassword(val)}
              value={confirmPassword}
              borderColorRed={validation.confirmPassword === false}
              maxLength={20}
            />
          </View>

          <Button
            onPress={() => {
              onSubmit();
            }}
          >
            {langCtx.language === "ar" ? "التسجيل" : "Register"}
          </Button>
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
    marginTop: 200,
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
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 5,
    width: width / 2.25,
  },
  textTab: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioGroup: {
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  radioContainer: {
    flexDirection: "row", // Arrange radio button and label in a row
    alignItems: "center", // Center the items vertically
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 20,
    width: width * 0.2, // 50% of the screen width
  },

  radioLabel: {
    fontSize: 11,
    color: "#333",
    marginTop: 5, // Space between radio button and label
  },
  title: {
    fontSize: 20,
  },
  scrollViewContent: {
    paddingBottom: 20, // Adjust as needed
    flexGrow: 1, // Ensures the content expands to fill the space
  },
  picker: {
    width: 200,
    height: 45,
    padding: 10,
  },
  pickerItem: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontWeight: "bold", // Added bold text
  },
  pickerWrapper: {
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 2,
    marginVertical: 10,
  },
});
