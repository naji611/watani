import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/UI/CustomAlert";
import { LanguageContext } from "./languageContext";
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

export const AuthContext = createContext({
  isAuthenticated: false,
  userData: {},
  token: "",
  authenticate: () => {},
  logout: () => {},
  showAlert: false,
  setShowAlert: () => {},
});

export default function AuthContextProvider({ children }) {
  const languageCtx = useContext(LanguageContext);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    phoneNumber: "",
    email: "",
    primaryNumber: "",
    userType: "",
    city: "",
    expiration: "",
    name: "",
    id: "",
    isEmailConfirmed: "",
    governorateId: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserData = await AsyncStorage.getItem("userData");

      if (storedToken && storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        setToken(storedToken);
        setUser(parsedUserData);
        if (parsedUserData.expiration) {
          const expirationDate = Number(parsedUserData.expiration) * 1000; // Convert to milliseconds
          const currentTime = Date.now();
          const timeout = expirationDate - currentTime; // Time until expiration

          if (timeout > 0) {
            const alertTimeout = setTimeout(() => {
              console.log("Token expired, showing alert");
              setShowAlert(true); // Show alert when token expires
            }, timeout);

            // Cleanup function to clear the timeout
            return () => clearTimeout(alertTimeout);
          } else {
            console.log("Token already expired, showing alert");
            setShowAlert(true); // Show alert if token is already expired
          }
        }
      }
    };

    loadUserData();
  }, []);

  function authenticate(token, userData) {
    setToken(token);
    const governorateId = parseInt(userData.governorateId, 10);
    console.log("governorateId:", userData.governorateId);
    const updatedUserData = {
      ...userData,
      city:
        languageCtx.language === "en"
          ? jordanCitiesEN.find((city) => city.id === governorateId)?.name
          : jordanCitiesAR.find((city) => city.id === governorateId)?.name,
      governorateId: governorateId,
    };

    setUser(updatedUserData);
    console.log(updatedUserData); // Log the updated data
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userData", JSON.stringify(updatedUserData)); // Save the updated data

    // Check for token expiration upon authentication
    if (userData.expiration) {
      const expirationDate = Number(userData.expiration) * 1000;
      const currentTime = Date.now();
      const timeout = expirationDate - currentTime;

      if (timeout > 0) {
        const alertTimeout = setTimeout(() => {
          console.log("Token expired, showing alert");
          setShowAlert(true);
        }, timeout);

        return () => clearTimeout(alertTimeout); // Clear timeout on re-authentication
      }
    }
  }

  function logout() {
    setToken(null);
    setUser({
      phoneNumber: "",
      email: "",
      primaryNumber: "",
      userType: "",
      city: "",
      expiration: "",
      name: "",
      id: "",
      isEmailConfirmed: "",
      governorateId: "",
    });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userData");
    setShowAlert(false); // Reset alert when logging out
  }

  const value = {
    isAuthenticated: !!token,
    token: token,
    userData: user,
    authenticate: authenticate,
    logout: logout,
    showAlert: showAlert,
    setShowAlert: setShowAlert,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <CustomAlert
        message={
          languageCtx.language === "en"
            ? "Your session has expired. Please log in again."
            : "انتهت المهلة الخاصة بك. يرجى اعادة تسجيل الدخول!"
        }
        visible={showAlert}
        onConfirm={() => {
          logout();
          setShowAlert(false);
        }}
      />
    </AuthContext.Provider>
  );
}
