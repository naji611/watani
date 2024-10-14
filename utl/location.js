import { Alert } from "react-native";

const GOOGLE_API_KEY = "AIzaSyB3JYciXpGitz8RK5VNodEdiuKBfrq3aF8";

export function getMapPreview(lat, lng) {
  if (!lat || !lng || typeof lat !== "number" || typeof lng !== "number") {
    console.error("Invalid latitude or longitude values:", { lat, lng });

    Alert.alert(
      "Invalid Location",
      "The provided latitude or longitude is invalid. Please try again."
    );

    return null;
  }

  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewURL;
}

export async function getAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      Alert.alert(
        "Address Fetch Error",
        `Failed to fetch address. Status: ${response.status}`
      );
      return null; // Gracefully handle error without crashing
    }

    const data = await response.json();

    if (data.results.length === 0) {
      Alert.alert(
        "Address Not Found",
        "No address found for the given location."
      );
      return null;
    }

    return data.results[0].formatted_address;
  } catch (error) {
    console.error("Error fetching address:", error);

    Alert.alert(
      "Address Fetch Error",
      "Unable to fetch the address at this time. Please check your network connection and try again later."
    );

    return null; // Return null to avoid crashes in the calling component
  }
}
