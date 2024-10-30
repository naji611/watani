import { View, Text, StyleSheet, Alert, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { getAddress, getMapPreview } from "../../utl/location.js";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import CustomAlert from "../UI/CustomAlert.jsx";
import { LanguageContext } from "../../store/languageContext.jsx";
import { useContext } from "react";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default function LocationPicker({
  onPickedLocationHandler,
  isEdit,
  shouldLoadLocation,
  lat,
  lng,
}) {
  const langCtx = useContext(LanguageContext);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  // useEffect(() => {
  //   async function requestLocationPermission() {
  //     if (locationPermissionInfo?.status !== PermissionStatus.GRANTED) {
  //       const permissionResponse = await requestPermission();
  //       console.log("Permission response: ", permissionResponse);
  //     }
  //   }

  //   requestLocationPermission();
  // }, [locationPermissionInfo]);
  // useEffect(() => {
  //   console.log("Current permission status: ", locationPermissionInfo?.status);
  // }, [locationPermissionInfo]);

  useEffect(() => {
    if (isFocused && route.params.pickedLat && route.params.pickedLng) {
      console.log("picked :", route.params.pickedLat);
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      //   console.log("picked: ", mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  // Effect to load address when a location is picked
  useEffect(() => {
    async function loadLocation() {
      console.log("call google");
      if (pickedLocation) {
        try {
          const address = await getAddress(
            pickedLocation.lat,
            pickedLocation.lng
          );
          onPickedLocationHandler({ ...pickedLocation, address });
        } catch (error) {
          console.log(error);
          setAlertMessage(
            langCtx.language === "en"
              ? "Address Error,Could not fetch the address."
              : "خطأ في العنوان، تعذر جلب العنوان."
          );
          setAlertError(true);
          setAlertVisible(true);
        }
      }
    }

    loadLocation();
  }, [pickedLocation, onPickedLocationHandler]);

  async function verifyPermission() {
    // Request permissions if they are undetermined
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // Show alert if permission is denied
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      console.log(locationPermissionInfo.status);
      setAlertMessage(
        langCtx.language === "en"
          ? "Please grant location permissions in your device settings."
          : " يرجى منح أذونات الموقع في إعدادات جهازك."
      );
      setAlertError(true);
      setAlertVisible(true);

      return false;
    }

    // If granted, return true
    if (locationPermissionInfo.status === PermissionStatus.GRANTED) {
      return true;
    }
  }
  useEffect(() => {
    if (lat && lng)
      setPickedLocation({
        lat: lat,
        lng: lng,
      });
  }, [shouldLoadLocation]);
  async function locateUserLocation() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      // Get current location after permission is granted
      const currentLocation = await getCurrentPositionAsync();
      console.log(currentLocation);
      setPickedLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    } catch (error) {
      // Handle error if location services are unavailable or failed
      setAlertMessage(
        langCtx.language === "en"
          ? "Location Error ,Unable to fetch your current location. Please try again."
          : "خطأ في الموقع، غير قادر على جلب موقعك الحالي. يرجى المحاولة مرة أخرى."
      );
      setAlertError(true);
    }
  }

  function pickLocationOnMapHandler() {
    navigation.navigate("Map", { isEdit: isEdit ? true : false });
  }

  let locationPreview = (
    <View style={styles.mapPreview}>
      <Text style={styles.text}>
        {langCtx.language === "en"
          ? "No Location Picked yet."
          : "لم يتم اختيار الموقع بعد."}
      </Text>
    </View>
  );

  if (pickedLocation) {
    locationPreview = (
      <View style={styles.mapPreview}>
        <Image
          style={styles.img}
          source={{
            uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <CustomAlert
        error={alertError}
        message={alertMessage}
        visible={alertVisible}
        onConfirm={() => setAlertVisible(false)}
      ></CustomAlert>
      {locationPreview}
      <View style={styles.actions}>
        <Button
          onPress={locateUserLocation}
          style={[
            styles.button,
            { backgroundColor: isEdit ? "#FFA726" : "#4CAF50" },
          ]}
        >
          {langCtx.language === "en" ? "Locate User" : "تحديد موقع المستخدم"}
        </Button>
        <Button
          onPress={pickLocationOnMapHandler}
          style={[
            styles.button,
            { backgroundColor: isEdit ? "#FFA726" : "#4CAF50" },
          ]}
        >
          {langCtx.language === "en" ? "Pick on Map" : "اختر من الخريطة"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: screenHeight * 0.25, // Adjust height based on screen height
    marginVertical: screenHeight * 0.01, // Dynamic vertical margin
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFE1AF",
    borderRadius: 10,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: screenWidth * 0.05, // Adjusted padding based on screen width
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: screenWidth * 0.04, // Adjust font size based on screen width
    color: "black",
  },
  button: {
    flex: 1,
    marginHorizontal: screenWidth * 0.02, // Dynamic margin for spacing
    paddingVertical: screenHeight * 0.015, // Adjusted padding for better touch targets
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
});
