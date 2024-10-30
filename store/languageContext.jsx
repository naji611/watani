import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LanguageContext = createContext({
  language: "",
  toggleLanguage: () => {},
});

export default function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("ar"); // Default to English

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("language");

      if (storedLanguage) {
        console.log("set to :", storedLanguage);
        setLanguage(storedLanguage);
      }
    };

    loadLanguage();
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "ar" : "en";
      console.log("store to :", newLang);
      AsyncStorage.setItem("language", newLang);
      return newLang;
    });
  };

  const value = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
