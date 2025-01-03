import { View, ScrollView, StyleSheet, Alert, Text } from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import Input from "../components/UI/Input";
import LocationPicker from "../components/location/LocationPicker";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import { FetchMunicipalities, TakeComplaint } from "../utl/apis.js";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import CustomAlert from "../components/UI/CustomAlert.jsx";
import { LanguageContext } from "../store/languageContext.jsx";
export default function TakeReportScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(authCtx.userData.phoneNumber);
  const [nearestLocation, setNearestLocation] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(""); // Added building number state
  const [complaintDetails, setComplaintDetails] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState(authCtx.userData.email);
  const [accused, setAccused] = useState("");
  const [complaintId, setComplaintId] = useState(route.params.subjectId);
  const { title, lat, lng, reportData, type } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEditing, setIsEditing] = useState(type === "edit");
  const [validation, setValidation] = useState({
    email: true,
    phoneNumber: true,
    buildingNumber: true,
    nearestLocation: true,
    complaintDetails: true,
    accused: true,
  });
  const [fetchedComplaints, setFetchedComplaints] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: type
        ? langCtx.language === "ar"
          ? reportData.subject.arabicName
          : reportData.subject.name
        : title,
    });
  }, [navigation, title]);

  useEffect(() => {
    FetchMunicipalities(authCtx.userData.governorateId)
      .then((response) => {
        setFetchedComplaints(response.data);
        console.log(response.data);
        setSelectedCityId(fetchedComplaints[0].id);
        langCtx.language === "en"
          ? setSelectedCity(fetchedComplaints[0].name)
          : setSelectedCity(fetchedComplaints[0].arabicName);
        setSelectedCity(fetchedComplaints[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function validateInputs() {
    let updatedValidation = { ...validation };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^07[789]\d{7}$/;
    if (!emailRegex.test(email.trim())) {
      updatedValidation.email = false;
      console.log("Invalid email");
    } else {
      updatedValidation.email = true;
    }
    if (!phoneRegex.test(phoneNumber)) {
      updatedValidation.phoneNumber = false;
    } else {
      updatedValidation.phoneNumber = true;
    }
    if (!buildingNumber.trim()) {
      updatedValidation.buildingNumber = false;
    } else {
      updatedValidation.buildingNumber = true;
    }
    if (!nearestLocation.trim()) {
      updatedValidation.nearestLocation = false;
    } else {
      updatedValidation.nearestLocation = true;
    }
    if (!complaintDetails.trim()) {
      updatedValidation.complaintDetails = false;
    } else {
      updatedValidation.complaintDetails = true;
    }
    if (!accused.trim()) {
      updatedValidation.accused = false;
    } else {
      updatedValidation.accused = true;
    }
    setValidation(updatedValidation);
  }
  async function submitEditedForm() {
    console.log("Editing submitting..");
  }

  async function onSubmitHandler() {
    validateInputs();

    // Validate if selectedLocation exists
    if (!selectedLocation) {
      setAlertMessage(
        langCtx.language === "en"
          ? "Please pick a location before submitting."
          : "يرجى اختيار موقع  قبل الإرسال."
      );

      setAlertVisible(true);

      return;
    }

    // Validate if city is in Jordan
    if (city[2] !== " Jordan") {
      setAlertMessage(
        langCtx.language === "en"
          ? "Pleas pick a location in Jordan."
          : " يرجى اختيار موقع داخل الاردن"
      );
      setAlertVisible(true);

      return;
    }

    // Validate all other required fields
    if (
      !phoneNumber ||
      !nearestLocation ||
      !buildingNumber ||
      !complaintDetails
    ) {
      setAlertMessage(
        langCtx.language === "en"
          ? "please fill all required fields"
          : "يرجى  ملء جميع الحقول المطلوبة"
      );

      setAlertVisible(true);
      return;
    }

    // Prepare complaint data
    const complaintData = {
      PhoneNumber: phoneNumber,
      Email: email,
      Date: "2024-10-14",
      NearestLocation: nearestLocation,
      BuildingNumber: buildingNumber,
      Visibility: "Visible",
      Latitude: selectedLocation.lat,
      Longitude: selectedLocation.lng,
      Details: complaintDetails,
      UserId: authCtx.userData.id,
      SubjectId: complaintId,
      MunicipalityId: selectedCityId,
      Attachment: null,
    };

    try {
      // Call the API to submit the complaint
      setIsLoading(true);
      const response = await TakeComplaint(complaintData, authCtx.token); // Assuming you have the token in your auth context

      if (response.status === 200) {
        navigation.navigate("SuccessComplaint");
        console.log("success");
      } else {
        if (response.data.detail === "Max Daily Complaints Reached") {
          console.log("hello", response.data.detail);
          setAlertMessage(
            langCtx.language === "ar"
              ? "لقد تجاوزت الحد الأقصى للشكاوى اليومية"
              : response.data.detail || "Failed to submit your complaint."
          );
          setAlertVisible(true);
          return;
        }
        console.log(response.data);
        setAlertMessage(
          langCtx.language === "ar"
            ? "لم يتم ارسال الشكوى"
            : response.data.detail || "Failed to submit your complaint."
        );
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage(
        langCtx.language === "en"
          ? "Something went wrong. Please try again."
          : "لقد  حدث خطأ ما. يرجى المحاولة مرة أخرى."
      );

      setAlertVisible(true);
      console.error("Complaint submission error:", error);
    } finally {
      setIsLoading(false);
    }

    console.log("Form submitted with:", complaintData);
  }

  const onPickedLocationHandler = useCallback(({ lng, lat, address }) => {
    //   console.log(lat, "address");
    const cityArray = address.split(",");
    setSelectedLocation({ lat, lng, city: cityArray });
    setCity(cityArray);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {!isLoading && (
        <>
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            onConfirm={() => setAlertVisible(false)}
            error={true}
          ></CustomAlert>
          <View style={styles.form}>
            <Input
              placeHolder={
                langCtx.language === "ar" ? "رقم الهاتف" : "Phone Number"
              }
              icon="call-outline"
              onChangeText={(text) => setPhoneNumber(text)} // Handle phone number input
              value={phoneNumber}
              borderColorRed={validation.phoneNumber === false}
              hasLabel={true}
              val={phoneNumber}
              keyboardType="numeric"
            />
            <Input
              placeHolder={
                langCtx.language === "ar" ? "البريد الالكتروني" : " Email"
              }
              icon="mail-outline"
              onChangeText={(text) => setEmail(text)} // Handle phone number input
              value={email}
              borderColorRed={validation.email === false}
              hasLabel={true}
              val={email}
            />
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelText}>
                {langCtx.language === "en" ? "Municipality" : "البلدية"}
              </Text>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => {
                  const selectedCityObject = fetchedComplaints.find(
                    (city) => city.name === itemValue
                  );
                  setSelectedCityId(selectedCityObject?.id);
                  setSelectedCity(itemValue);
                  //   console.log(selectedCityId);
                }}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode={"dropdown"}
              >
                {fetchedComplaints.map((city) => (
                  <Picker.Item
                    key={city.id}
                    label={
                      langCtx.language === "en" ? city.name : city.arabicName
                    }
                    value={city.name}
                  />
                ))}
              </Picker>
            </View>
            <Input
              placeHolder={
                langCtx.language === "ar" ? "أقرب معلم" : " Nearest location"
              }
              icon="location-outline"
              onChangeText={(text) => setNearestLocation(text)} // Handle street name input
              value={nearestLocation}
              borderColorRed={validation.nearestLocation === false}
              hasLabel={true}
              val={nearestLocation}
            />
            <Input
              placeHolder={
                langCtx.language === "ar" ? "رقم المبنى" : " Building Number"
              }
              icon="home-outline"
              onChangeText={(text) => setBuildingNumber(text)} // Handle building number input
              value={buildingNumber}
              borderColorRed={validation.buildingNumber === false}
              hasLabel={true}
              val={buildingNumber}
              keyboardType="numeric"
            />

            <Input
              placeHolder={
                langCtx.language === "ar"
                  ? "تفاصيل الشكوى"
                  : " Complaints Details"
              }
              icon="document-text-outline"
              multiline={true}
              style={styles.textArea}
              onChangeText={(text) => setComplaintDetails(text)} // Handle complaint details input
              borderColorRed={validation.complaintDetails === false}
              hasLabel={true}
              value={complaintDetails}
              val={complaintDetails}
            />
          </View>
          <View style={styles.location}>
            <LocationPicker
              lat={lat}
              lng={lng}
              onPickedLocationHandler={onPickedLocationHandler}
            />
          </View>
          <Button
            onPress={isEditing ? submitEditedForm : onSubmitHandler}
            style={[{ marginBottom: 30 }]}
          >
            {isEditing
              ? langCtx.language === "ar"
                ? "  تعديل "
                : " Edit"
              : langCtx.language === "ar"
              ? "  ارسال "
              : " Send"}
          </Button>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 7,
  },
  form: {
    marginVertical: 20,
    marginHorizontal: 20,
    marginRight: 35,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  location: {
    marginHorizontal: 20,
    marginVertical: 20, // Adds space between the form and the LocationPicker
    padding: 10,
  },

  pickerWrapper: {
    marginVertical: 10,
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20, // Adds space between label and picker
    textAlign: "left", // Aligns text to the left
  },
  picker: {
    width: 200,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  pickerItem: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
