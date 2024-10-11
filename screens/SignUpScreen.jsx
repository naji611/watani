import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
  function validInputs() {
    let updatedValidation = { ...validation };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^07[789]\d{7}$/;
    setEmail(email.trim());
    if (!emailRegex.test(email)) {
      updatedValidation.email = false;
    } else {
      updatedValidation.email = true;
    }

    if (firstName.length < 0) {
      updatedValidation.firstName = false;
    } else {
      updatedValidation.firstName = true;
    }
    if (secondName.length < 0) {
      updatedValidation.secondName = false;
    } else {
      updatedValidation.secondName = true;
    }

    if (thirdName.length < 0) {
      updatedValidation.thirdName = false;
    } else {
      updatedValidation.thirdName = true;
    }

    if (LastName.length < 0) {
      updatedValidation.LastName = false;
    } else {
      updatedValidation.LastName = true;
    }
    if (!phoneRegex.test(phoneNumber)) {
      updatedValidation.phoneNumber = false;
    } else {
      updatedValidation.phoneNumber = true;
    }
    if (!passwordRegex.test(password)) {
      updatedValidation.password = false;
    } else {
      updatedValidation.password = true;
    }
    if (!passwordRegex.test(password) || confirmPassword !== password) {
      updatedValidation.confirmPassword = false;
    } else {
      updatedValidation.confirmPassword = true;
    }
    if (selectedId === "1") {
      if (nationalityId.length !== 10) {
        updatedValidation.nationalityId = false;
      } else {
        updatedValidation.nationalityId = true;
      }
      if (identityNumber.length !== 8) {
        updatedValidation.identityNumber = false;
      } else {
        setIdentityNumber(identityNumber.toUpperCase());
        updatedValidation.identityNumber = true;
      }
    } else if (selectedId === "2") {
      if (serialNumberJordanSn.length !== 10) {
        updatedValidation.serialNumberJordanSn = false;
      } else {
        updatedValidation.serialNumberJordanSn = true;
      }
      if (documentNumberJordanSn.length !== 8) {
        updatedValidation.documentNumberJordanSn = false;
      } else {
        updatedValidation.documentNumberJordanSn = true;
      }
    } else if (selectedId === "3") {
      if (fileNumberGaza.length !== 10) {
        updatedValidation.fileNumberGaza = false;
      } else {
        updatedValidation.fileNumberGaza = true;
      }

      if (documentNumberGaza.length !== 8) {
        updatedValidation.documentNumberGaza = false;
      } else {
        updatedValidation.documentNumberGaza = true;
      }
    } else if (selectedId === "4") {
      if (personalNumber.length !== 10) {
        updatedValidation.personalNumber = false;
      } else {
        updatedValidation.personalNumber = true;
      }
      if (birthYear.length !== 4) {
        updatedValidation.birthYear = false;
      } else {
        updatedValidation.birthYear = true;
      }
    }

    setValidation(updatedValidation);
  }

  const radioButtons = [
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

  function onPressRadioButton(selectedId) {
    // setRadioButtons(radioButtonsArray);
    console.log(selectedId);
    setSelectedId(selectedId);
  }
  function onSubmit() {
    validInputs();
    if (selectedId == 1) {
      if (
        validation.firstName &&
        validation.secondName &&
        validation.thirdName &&
        validation.LastName &&
        validation.nationalityId &&
        validation.identityNumber &&
        validation.phoneNumber &&
        validation.password &&
        validation.confirmPassword
      ) {
        console.log({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          nationalityNumber: nationalityId,
          verificationMechanism: "IdentityNumber",
          identityNumber,
          City: selectedCity,
          civilRegistrationNumber: null,
        });
        RegisterJordanian({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          nationalityNumber: nationalityId,
          verificationMechanism: "IdentityNumber",
          identityNumber,
          City: selectedCity,
          civilRegistrationNumber: null,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Registration successful:", response.data);
              navigation.navigate("SuccessRegistrationScreen");
            }
          })
          .catch((error) => {
            console.log("Error during registration:", error);
          });
      } else {
        console.error("Validation failed. Please fill in all required fields.");
      }
    } else if (selectedId == 2) {
      if (
        validation.firstName &&
        validation.secondName &&
        validation.thirdName &&
        validation.LastName &&
        validation.phoneNumber &&
        validation.email &&
        validation.password &&
        validation.documentNumberJordanSn &&
        validation.serialNumberJordanSn
      ) {
        console.log({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          documentNumber: documentNumberJordanSn,
          serialNumber: serialNumberJordanSn,
        });
        RegisterJordanianWomenChild({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          documentNumber: documentNumberJordanSn,
          serialNumber: serialNumberJordanSn,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Registration successful:", response.data);
              navigation.navigate("SuccessRegistrationScreen");
            }
          })
          .catch((error) => {
            console.log("Error during registration:", error);
          });
      } else {
        console.error("Validation failed. Please fill in all required fields.");
      }
    } else if (selectedId == 3) {
      if (
        validation.firstName &&
        validation.secondName &&
        validation.thirdName &&
        validation.LastName &&
        validation.phoneNumber &&
        validation.email &&
        validation.password &&
        validation.documentNumberGaza &&
        validation.fileNumberGaza
      ) {
        console.log({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          documentNumber: documentNumberGaza,
          fileNumber: fileNumberGaza,
        });
        RegisterGazaSons({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          documentNumber: documentNumberGaza,
          fileNumber: fileNumberGaza,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Registration successful:", response.data);
              navigation.navigate("SuccessRegistrationScreen");
            }
          })
          .catch((error) => {
            console.log("Error during registration:", error);
          });
      } else {
        console.error("Validation failed. Please fill in all required fields.");
      }
    } else if (selectedId == 4) {
      if (
        validation.firstName &&
        validation.secondName &&
        validation.thirdName &&
        validation.LastName &&
        validation.phoneNumber &&
        validation.email &&
        validation.password &&
        validation.personalNumber &&
        validation.birthYear
      ) {
        console.log({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          personalNumber,
          yearOfBirth: birthYear,
        });

        RegisterForeign({
          firstName,
          secondName,
          thirdName,
          LastName,
          phoneNumber,
          email,
          password,
          City: selectedCity,
          personalNumber,
          yearOfBirth: birthYear,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Registration successful:", response.data);
              navigation.navigate("SuccessRegistrationScreen");
            }
          })
          .catch((error) => {
            console.log("Error during registration:", error);
          });
      } else {
        console.error("Validation failed. Please fill in all required fields.");
      }
    }
  }
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollViewContent}
    >
      <RegisterImage />
      <View style={[styles.tabs]}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderBottomColor:
                activeScreen === "signUp" ? "green" : "#88B788",
            },
          ]}
        >
          <Text style={styles.textTab}> حساب جديد </Text>
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
          <Text style={styles.textTab}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>الجنسية</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row" // Layout in a row
          containerStyle={styles.radioGroup}
          selectedId={selectedId}
          color="green"
        />
        <View style={styles.rowInputs}>
          <Input
            placeHolder={"الاسم الثاني "}
            logo={"person"}
            width="small"
            onChangeText={(val) => setSecondName(val)}
            value={secondName}
            borderColorRed={validation.secondName === false}
            maxLength={50}
          />
          <Input
            placeHolder={"الاسم الاول"}
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
            placeHolder={"الاسم الرابع "}
            logo={"person"}
            width="small"
            onChangeText={(val) => setLastName(val)}
            value={LastName}
            borderColorRed={validation.LastName === false}
            maxLength={50}
          />

          <Input
            placeHolder={"الاسم الثالث"}
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
            {jordanCitiesAR.map((city) => (
              <Picker.Item key={city.id} label={city.name} value={city.name} />
            ))}
          </Picker>
        </View>
        <Input
          placeHolder={" البريد الالكتروني"}
          logo={"mail"}
          onChangeText={(val) => setEmail(val)}
          value={email}
          borderColorRed={validation.email === false}
        />
        {selectedId === "1" && (
          <>
            <Input
              placeHolder={"الرقم الوطني"}
              logo={"id"}
              onChangeText={(val) => setNationalityId(val)}
              value={nationalityId}
              keyboardType="numeric"
              borderColorRed={validation.nationalityId === false}
              maxLength={10}
            />
            <Input
              placeHolder={" رقم الهوية"}
              logo={"id"}
              onChangeText={(val) => {
                setIdentityNumber(val);
              }}
              value={identityNumber}
              borderColorRed={validation.identityNumber === false}
              maxLength={8}
            />
          </>
        )}
        {selectedId === "2" && (
          <>
            <Input
              placeHolder={" الرقم المتسلسل "}
              logo={"id"}
              onChangeText={(val) => setSerialNumberJordanSn(val)}
              value={serialNumberJordanSn}
              borderColorRed={validation.serialNumberJordanSn === false}
              maxLength={10}
            />
            <Input
              placeHolder={" رقم الوثيقة"}
              logo={"id"}
              onChangeText={(val) => setDocumentNumberJordanSn(val)}
              value={documentNumberJordanSn}
              borderColorRed={validation.documentNumberJordanSn === false}
              maxLength={8}
            />
          </>
        )}
        {selectedId === "3" && (
          <>
            <Input
              placeHolder={" رقم الملف"}
              logo={"id"}
              onChangeText={(val) => setFileNumberGaza(val)}
              value={fileNumberGaza}
              borderColorRed={validation.fileNumberGaza === false}
              maxLength={10}
            />

            <Input
              placeHolder={"رقم الوثيقة"}
              logo={"id"}
              onChangeText={(val) => setDocumentNumberGaza(val)}
              value={documentNumberGaza}
              borderColorRed={validation.documentNumberGaza === false}
              maxLength={8}
            />
          </>
        )}
        {selectedId === "4" && (
          <>
            <Input
              placeHolder={"  الرقم الشخصي"}
              logo={"id"}
              onChangeText={(val) => setPersonalNumber(val)}
              value={personalNumber}
              borderColorRed={validation.personalNumber === false}
              maxLength={10}
            />

            <Input
              placeHolder={"سنة الميلاد"}
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
          placeHolder={"رقم الهاتف"}
          logo={"call"}
          onChangeText={(val) => setPhoneNumber(val)}
          value={phoneNumber}
          keyboardType="numeric"
          borderColorRed={validation.phoneNumber === false}
          maxLength={10}
        />
        <Input
          placeHolder={"كلمة المرور"}
          logo={"lock-closed"}
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
          value={password}
          borderColorRed={validation.password === false}
          maxLength={20}
        />
        <Input
          placeHolder={"تأكيد كلمة المرور"}
          logo={"lock-closed"}
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
        التسجيل
      </Button>
    </ScrollView>
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
  radioGroup: {
    marginVertical: 10,
    paddingHorizontal: 20,

    borderRadius: 10,
    paddingVertical: 10,
  },
  radioContainer: {
    flexDirection: "column", // Arrange radio button and label in a column
    alignItems: "center", // Center the items
    marginHorizontal: 10,
  },
  radioLabel: {
    fontSize: 16,
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
