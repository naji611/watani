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
import ImagePicker from "../components/ImagePicker.jsx";
import RNPickerSelect from "react-native-picker-select";
const jordanCitiesEN = [
  { id: 1, name: "Amman" },
  { id: 2, name: "Irbid" },
  { id: 3, name: "Ajloun" },
  { id: 4, name: "Jerash" },
  { id: 5, name: "Mafraq" },
  { id: 6, name: "Balqa" },
  { id: 7, name: "Zarqa" },
  { id: 8, name: "Madaba" },
  { id: 9, name: "Karak" },
  { id: 10, name: "Tafilah" },
  { id: 11, name: "Ma'an" },
  { id: 12, name: "Aqaba" },
];

const jordanCitiesAR = [
  { id: 1, name: "عمان" },
  { id: 2, name: "إربد" },
  { id: 3, name: "عجلون" },
  { id: 4, name: "جرش" },
  { id: 5, name: "المفرق" },
  { id: 6, name: "البلقاء" },
  { id: 7, name: "الزرقاء" },
  { id: 8, name: "مادبا" },
  { id: 9, name: "الكرك" },
  { id: 10, name: "الطفيلة" },
  { id: 11, name: "معان" },
  { id: 12, name: "العقبة" },
];
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
  const [selectedCityId, setSelectedCityId] = useState(19);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGovernment, setSelectedGovernment] = useState(1);
  const [selectedGovernmentName, setSelectedGovernmentName] = useState("");
  const [image, setImage] = useState(null);

  const cityList = langCtx.language === "en" ? jordanCitiesEN : jordanCitiesAR;
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
    FetchMunicipalities(selectedGovernment)
      .then((response) => {
        setFetchedComplaints(response.data);
        //console.log(response.data[0].id);
        setSelectedCityId(response.data[0].id);

        langCtx.language === "en"
          ? setSelectedCity(fetchedComplaints[0].name)
          : setSelectedCity(fetchedComplaints[0].arabicName);
        setSelectedCity(fetchedComplaints[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedGovernment]);
  function ImageTakenHandler(imageUri) {
    if (!imageUri) {
      console.error("Invalid image URI");
      return;
    }
    setImage(imageUri);
    console.log("Image URI:", imageUri);
  }
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
    console.log(selectedCity);
    console.log(new Date());

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
    if (!city.includes(" Jordan")) {
      console.log(city);
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
    const formattedDate = new Date().toISOString().split("T")[0];
    const complaintData = {
      PhoneNumber: phoneNumber,
      Email: email,
      Date: formattedDate,
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
            <View style={styles.governmentWrapper}>
              <Text style={styles.governmentLabel}>
                {langCtx.language === "en" ? "Government" : "المحافظة"}
              </Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedGovernment(value)}
                items={cityList.map((city) => ({
                  label: city.name,
                  value: city.id,
                }))}
                value={selectedGovernment}
                style={{
                  inputAndroid: styles.governmentPicker,
                  inputIOS: styles.governmentPicker,

                  modalViewTop: styles.dropdownBorder, // Applies the border to the dropdown
                }}
              />
            </View>

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
          {/* <View style={styles.location}>
            <ImagePicker onImageTaken={ImageTakenHandler} />
          </View> */}
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
    alignItems: "center", // Centers content horizontally
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center", // Centers text horizontally
  },
  picker: {
    width: 200,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    textAlign: "center", // Centers text inside the picker
    marginBottom: 20,
  },

  pickerItem: {
    height: 50,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  governmentWrapper: {
    marginVertical: 10,
    alignItems: "center", // Centers the picker horizontally
    marginLeft: 70,
  },
  governmentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center", // Centers the label text
    marginRight: 60,
  },
  governmentPicker: {
    width: 200,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  dropdownBorder: {
    borderWidth: 2, // Thickness of the border
    borderColor: "#007bff", // Border color (blue)
    borderRadius: 8, // Rounded corners
    backgroundColor: "#fff", // Dropdown background color
    padding: 10,
  },
});
