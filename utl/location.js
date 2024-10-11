const GOOGLE_API_KEY = "AIzaSyB3JYciXpGitz8RK5VNodEdiuKBfrq3aF8";

export function getMapPreview(lat, lng) {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewURL;
}

export async function getAddress(lat, lng) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("field to fetch address");
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}
