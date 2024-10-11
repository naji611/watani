import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/UI/Button";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 31.916898343327365,
    longitude: 35.89108306914568,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationOnMap(event) {
    const { nativeEvent } = event;
    const { latitude, longitude } = nativeEvent.coordinate;
    console.log(latitude, longitude);
    setSelectedLocation({ lat: latitude, lng: longitude });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("pick a location first!");
      return;
    }

    navigation.navigate("TakeReportScreen", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الخريطة",
      headerRight: () => (
        <Button
          onPress={savePickedLocationHandler}
          style={[{ marginBottom: 10 }]}
        >
          حفظ
        </Button>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.container}
      onPress={selectLocationOnMap}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
