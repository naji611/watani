import { View, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Input from "../components/UI/Input";
import LocationPicker from "../components/location/LocationPicker";
import Button from "../components/UI/Button";

export default function TakeReportScreen({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(""); // Added building number state
  const [complaintDetails, setComplaintDetails] = useState("");
  const [city, setCity] = useState("");

  const { title, lat, lng } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  function onSubmitHandler() {
    if (!selectedLocation) {
      Alert.alert("Error", "Please pick a location before submitting.");
      return;
    }

    if (!phoneNumber || !streetName || !buildingNumber || !complaintDetails) {
      Alert.alert("Error", "Please fill out all fields before submitting.");
      return;
    }

    // Send the form data and selected location to the backend or wherever it's needed
    console.log("Form submitted with:", {
      phoneNumber,
      streetName,
      buildingNumber,
      complaintDetails,
      location: selectedLocation,
    });
  }

  function onPickedLocationHandler({ lng, lat, address }) {
    const city = address.split(",")[1];
    setSelectedLocation({ lat, lng, city });
    setCity(city);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          placeHolder={"رقم الهاتف"}
          icon="call-outline"
          onChangeText={(text) => setPhoneNumber(text)} // Handle phone number input
        />
        <Input
          placeHolder={"اسم الشارع"}
          icon="location-outline"
          onChangeText={(text) => setStreetName(text)} // Handle street name input
        />
        <Input
          placeHolder={"رقم المبنى"}
          icon="home-outline"
          onChangeText={(text) => setBuildingNumber(text)} // Handle building number input
        />
        <Input
          placeHolder={"تفاصيل الشكوى"}
          icon="document-text-outline"
          multiline={true}
          style={styles.textArea}
          onChangeText={(text) => setComplaintDetails(text)} // Handle complaint details input
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
