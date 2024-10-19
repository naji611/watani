import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/UI/CustomAlert";
import { LanguageContext } from "./languageContext";

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
    setUser(userData);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userData", JSON.stringify(userData));

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
            : "انتهت المعلة الخاصة بك يرجى اعادة تسجيل الدخول!"
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
