import { View, Text, StyleSheet, Alert, Image } from "react-native";
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

export default function LocationPicker({ onPickedLocationHandler }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
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
      console.log("mustafa");
      console.log(pickedLocation);
      console.log();
      if (pickedLocation) {
        try {
          const address = await getAddress(
            pickedLocation.lat,
            pickedLocation.lng
          );
          onPickedLocationHandler({ ...pickedLocation, address });
        } catch (error) {
          Alert.alert("Address Error", "Could not fetch the address.");
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
      Alert.alert(
        "Insufficient Permissions",
        "Please grant location permissions in your device settings."
      );

      return false;
    }

    // If granted, return true
    if (locationPermissionInfo.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

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
      Alert.alert(
        "Location Error",
        "Unable to fetch your current location. Please try again."
      );
    }
  }

  function pickLocationOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = (
    <View style={styles.mapPreview}>
      <Text style={styles.text}>No Location Picked yet.</Text>
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
      {locationPreview}
      <View style={styles.actions}>
        <Button onPress={locateUserLocation} style={styles.button}>
          Locate User
        </Button>
        <Button onPress={pickLocationOnMapHandler} style={styles.button}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFE1AF", // Light neutral background
    borderRadius: 10,
    overflow: "hidden", // Ensures image respects borderRadius
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures equal space between buttons

    paddingHorizontal: 20, // Adds spacing around the buttons
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  button: {
    flex: 1, // Make both buttons take equal width
    marginHorizontal: 10, // Space between buttons
    paddingVertical: 10, // Increase padding for better touch targets
    backgroundColor: "#4CAF50", // Green background for buttons
    borderRadius: 5, // Rounded corners for buttons
    alignItems: "center", // Center the text inside the buttons
  },
});
