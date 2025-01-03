import { View, ScrollView, StyleSheet, Alert, Text } from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import Input from "../components/UI/Input";
import LocationPicker from "../components/location/LocationPicker";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import { FetchMunicipalities, UpdateComplaints } from "../utl/apis.js";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import CustomAlert from "../components/UI/CustomAlert.jsx";
import { LanguageContext } from "../store/languageContext.jsx";
export default function UpdateComplaintsScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(authCtx.userData.phoneNumber);
  const [nearestLocation, setNearestLocation] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(""); // Added building number state
  const [complaintDetails, setComplaintDetails] = useState("");
  const [email, setEmail] = useState(authCtx.userData.email);
  const [accused, setAccused] = useState("");
  const [complaintId, setComplaintId] = useState();
  const [reportData, setReportData] = useState(route.params?.reportData || {});

  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [city, setCity] = useState("");
  const [shouldLoadLocation, setShouldLoadLocation] = useState(false);
  const [validation, setValidation] = useState({
    email: true,
    phoneNumber: true,
    buildingNumber: true,
    nearestLocation: true,
    complaintDetails: true,
    accused: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        langCtx.language === "ar"
          ? reportData.subject.arabicName
          : reportData.subject.name,
    });
  }, [navigation]);

  useEffect(() => {
    FetchMunicipalities(1)
      .then((response) => {
        setFetchedComplaints(response.data);
        // console.log(response.data);

        const specificMunicipalityId = reportData.municipalityId;
        const selectedMunicipality = response.data.find(
          (Municipality) => Municipality.id === specificMunicipalityId
        );
        console.log(selectedMunicipality);
        if (selectedMunicipality) {
          setSelectedCityId(selectedMunicipality.id);
          langCtx.language === "en"
            ? setSelectedCity(selectedMunicipality.name)
            : setSelectedCity(selectedMunicipality.arabicName);
        } else if (response.data.length > 0) {
          // Fallback to the first item if specific ID is not found

          setSelectedCityId(response.data[0].id);
          langCtx.language === "en"
            ? setSelectedCity(response.data[0].name)
            : setSelectedCity(response.data[0].arabicName);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigation]);

  useEffect(() => {
    if (reportData) {
      setShouldLoadLocation((prev) => !prev); // Toggle to trigger useEffect
      console.log(reportData);
      setComplaintDetails(reportData.details);
      setAccused(reportData.accused);
      setBuildingNumber(reportData.buildingNumber);
      setNearestLocation(reportData.nearestLocation);
      setSelectedLocation({
        lat: reportData.location.latitude,
        lng: reportData.location.longitude,
        city,
      });

      setComplaintId(reportData.id);
      setReportData(route.params.reportData);
    }
  }, [navigation]);
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

    setValidation(updatedValidation);
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
    console.log(selectedLocation);

    if (city !== "Jordan") {
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
      phoneNumber,
      email,
      nearestLocation,
      buildingNumber,
      location: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
      details: complaintDetails,
    };
    console.log("Complaint data :", { ...complaintData });
    try {
      // Call the API to submit the complaint
      setIsLoading(true);

      const response = await UpdateComplaints(
        complaintId,
        complaintData,
        authCtx.token
      );
      if (response.status == 204) {
        navigation.navigate("SuccessUpdateScreen");
        console.log("Success");
        console.log("rrrrrr", response?.status);
      } else {
        switch (response.status) {
          case 400:
            console.log(response.data.errors);
            setAlertMessage(
              langCtx.language === "ar"
                ? "لم يتم ارسال الشكوى"
                : response.data?.detail || "Failed to submit your complaint."
            );
            setAlertVisible(true);
            console.log("400 Bad Request");
            break;
          case 500:
            console.log(response.data.errors);
            setAlertMessage(
              langCtx.language === "ar"
                ? "يرجى المحاولة لاحقا   "
                : response.data?.detail || "Please Try Again Later."
            );
            setAlertVisible(true);
            console.log("400 Bad Request");
            break;

          default:
            console.log(response.data.errors);
            if (
              response.data &&
              response.data.detail === "Max Daily Complaints Reached"
            ) {
              console.log(
                "Max daily complaints reached:",
                response.data.detail
              );
              setAlertMessage(
                langCtx.language === "ar"
                  ? "لقد تجاوزت الحد الأقصى للشكاوى اليومية"
                  : response.data.detail || "Failed to submit your complaint."
              );
            } else {
              setAlertMessage(
                langCtx.language === "ar"
                  ? "لم يتم ارسال الشكوى"
                  : response.data?.detail || "Failed to submit your complaint."
              );
            }
            setAlertVisible(true);
            break;
        }
      }
    } catch (error) {
      setAlertMessage(
        langCtx.language === "en"
          ? "Something went wrong. Please try again."
          : "لقد حدث خطأ ما. يرجى المحاولة مرة أخرى."
      );
      setAlertVisible(true);
      console.log("Error occurred");

      if (error.response) {
        console.error("API Error response:", error.response.data);
      } else {
        console.error("Complaint submission error:", error);
      }
    } finally {
      setIsLoading(false);
    }

    // Log the submitted data
    console.log("Form submitted with:", complaintData);
  }

  const onPickedLocationHandler = useCallback(({ lng, lat, address }) => {
    // Split the address and get the last part as the country
    let country = address.split(",");
    country = country[country.length - 1].trim(); // .trim() removes any extra whitespace

    // Set the selected location and city state
    setSelectedLocation({ lat, lng, city: country });
    setCity(country.trim());

    console.log(country);
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
            {selectedLocation ? (
              <LocationPicker
                lat={selectedLocation.lat}
                lng={selectedLocation.lng}
                onPickedLocationHandler={onPickedLocationHandler}
                isEdit={true}
                shouldLoadLocation={shouldLoadLocation}
              />
            ) : (
              <Text style={styles.locationPlaceholder}>
                {langCtx.language === "ar"
                  ? "يرجى اختيار موقع"
                  : "Please pick a location"}
              </Text>
            )}
          </View>

          <Button onPress={onSubmitHandler} style={[{ marginBottom: 30 }]}>
            {langCtx.language === "ar" ? "  تعديل " : " Edit"}
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
