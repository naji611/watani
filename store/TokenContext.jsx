import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
  isAuthenticated: false,
  token: "",
  authenticate: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    getToken();
  }, []);
  function authenticate(token) {
    setToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setToken(null);
    AsyncStorage.removeItem("token");
  }
  const value = {
    isAuthenticated: !!token,
    token,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
