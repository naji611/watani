import { jwtDecode } from "jwt-decode";

export default function decodeToken(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
}
