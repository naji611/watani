import { View, Text, StyleSheet, Alert } from "react-native";
import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useContext,
} from "react";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/UI/Button";
import CustomAlert from "../components/UI/CustomAlert.jsx";
import { LanguageContext } from "../store/languageContext";
export default function Map({ navigation, route }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);
  const langCtx = useContext(LanguageContext);
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
      setAlertMessage(
        langCtx.language === "en"
          ? "Pick a location first!"
          : "يرجى اختيار الموقع أولاً!"
      );
      setAlertVisible(true);
      setAlertError(true);
      return;
    }

    navigation.navigate(
      route.params.isEdit ? "UpdateComplaintsScreen" : "TakeReportScreen",
      {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
      }
    );
  }, [navigation, selectedLocation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: langCtx.language === "ar" ? "الخريطة" : "Map",
      headerRight: () => (
        <Button
          onPress={savePickedLocationHandler}
          style={[{ marginBottom: 10 }]}
        >
          {langCtx.language === "ar" ? "حفظ" : "Save"}
        </Button>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        error={alertError}
      ></CustomAlert>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
