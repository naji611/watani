import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  isAuthenticated: false,
  userData: {}, // Holds the complete user data
  token: "",
  authenticate: () => {}, // Function to authenticate the user
  logout: () => {}, // Function to logout the user
});

export default function AuthContextProvider({ children }) {
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

  // Load token and user data from AsyncStorage on component mount
  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserData = await AsyncStorage.getItem("userData");

      if (storedToken && storedUserData) {
        setToken(storedToken);
        setUser(JSON.parse(storedUserData)); // Parse and set user data from storage
      }
    };
    loadUserData();
  }, []);

  // Function to authenticate and store token and user data
  function authenticate(token, userData) {
    setToken(token);
    setUser(userData); // Directly set the complete user data

    // Store both token and user data in AsyncStorage
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("from store: ", userData);
  }

  // Function to logout and clear data
  function logout() {
    setToken(null);
    setUser({
      // Reset user data
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
  }

  // Context value that provides user state and auth functions
  const value = {
    isAuthenticated: !!token, // true if the token exists
    token: token,
    userData: user, // Expose the full user data
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
