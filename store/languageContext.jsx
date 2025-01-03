import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store"; // Import expo-secure-store

export const LanguageContext = createContext({
  language: "",
  toggleLanguage: () => {},
});

export default function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("ar"); // Default to Arabic

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await SecureStore.getItemAsync("language"); // Use expo-secure-store instead of SecureStorage

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
      SecureStore.setItemAsync("language", newLang); // Use expo-secure-store instead of SecureStorage
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
