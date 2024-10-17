import { View, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useLayoutEffect, useState, useCallback } from "react";
import Input from "../components/UI/Input";
import LocationPicker from "../components/location/LocationPicker";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import { TakeComplaint } from "../utl/apis.js";
export default function TakeReportScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(authCtx.userData.phoneNumber);
  const [nearestLocation, setNearestLocation] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(""); // Added building number state
  const [complaintDetails, setComplaintDetails] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState(authCtx.userData.email);
  const [accused, setAccused] = useState("");
  const [complaintId, setComplaintId] = useState(route.params.subjectId);
  const { title, lat, lng } = route.params;

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
      title: title,
    });
  }, [navigation, title]);

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
  async function onSubmitHandler() {
    validateInputs();

    // Validate if selectedLocation exists
    if (!selectedLocation) {
      Alert.alert("Error", "Please pick a location before submitting.");
      return;
    }

    // Validate if city is in Jordan
    if (city[2] !== " Jordan") {
      Alert.alert("Error", "Please pick a location in Jordan.");
      return;
    }

    // Validate all other required fields
    if (
      !phoneNumber ||
      !nearestLocation ||
      !buildingNumber ||
      !complaintDetails
    ) {
      Alert.alert("Error", "Please fill out all fields before submitting.");
      return;
    }

    // Prepare complaint data
    const complaintData = {
      phoneNumber,
      email,
      accused: accused || "", // Default to empty string if not provided
      date: "2024-10-14",
      nearestLocation,
      buildingNumber,
      complaintDetails,
      visibility: "Visible",
      location: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
      details: complaintDetails,
      userId: authCtx.userData.id,
      subjectId: complaintId,
    };

    try {
      // Call the API to submit the complaint
      const response = await TakeComplaint(complaintData, authCtx.token); // Assuming you have the token in your auth context

      if (response.status === 200) {
        navigation.navigate("SuccessComplaint");
        console.log("success");
      } else {
        console.log(response.data);
        Alert.alert(
          "Error",
          response.data.message || "Failed to submit your complaint."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error("Complaint submission error:", error);
    }

    console.log("Form submitted with:", complaintData);
  }

  const onPickedLocationHandler = useCallback(({ lng, lat, address }) => {
    const cityArray = address.split(",");
    setSelectedLocation({ lat, lng, city: cityArray });
    setCity(cityArray);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          placeHolder={"رقم الهاتف"}
          icon="call-outline"
          onChangeText={(text) => setPhoneNumber(text)} // Handle phone number input
          value={phoneNumber}
          borderColorRed={validation.phoneNumber === false}
        />
        <Input
          placeHolder={"البريد الالكتروني "}
          icon="mail-outline"
          onChangeText={(text) => setEmail(text)} // Handle phone number input
          value={email}
          borderColorRed={validation.email === false}
        />
        <Input
          placeHolder={" أقرب معلم"}
          icon="location-outline"
          onChangeText={(text) => setNearestLocation(text)} // Handle street name input
          value={nearestLocation}
          borderColorRed={validation.nearestLocation === false}
        />
        <Input
          placeHolder={"رقم المبنى"}
          icon="home-outline"
          onChangeText={(text) => setBuildingNumber(text)} // Handle building number input
          value={buildingNumber}
          borderColorRed={validation.buildingNumber === false}
        />
        <Input
          placeHolder={"المتهم "}
          icon="call-outline"
          onChangeText={(text) => setAccused(text)} // Handle phone number input
          value={accused}
        />
        <Input
          placeHolder={"تفاصيل الشكوى"}
          icon="document-text-outline"
          multiline={true}
          style={styles.textArea}
          onChangeText={(text) => setComplaintDetails(text)} // Handle complaint details input
          borderColorRed={validation.complaintDetails === false}
        />
      </View>
      <View style={styles.location}>
        <LocationPicker
          lat={lat}
          lng={lng}
          onPickedLocationHandler={onPickedLocationHandler}
        />
      </View>
      <Button onPress={onSubmitHandler} style={[{ marginBottom: 30 }]}>
        ارسال
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
