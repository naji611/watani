import React, { createContext, useState, useEffect } from "react";

// Create the context
export const LanguageContext = createContext({
  language: "",
  toggleLanguage: () => {},
});

// Language translations
// const translations = {
//   en: {
//     welcome: "Welcome",
//     changeLanguage: "Switch to Arabic",
//     theme: "Theme",
//   },
//   ar: {
//     welcome: "مرحبا",
//     changeLanguage: "التبديل إلى الإنجليزية",
//     theme: "الثيم",
//   },
// };

// Language provider component
export default function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("ar"); // Default to English

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  const value = {
    language,
    //    translations: translations[language], // Current language translations
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
