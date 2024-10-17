import React, { useState, useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { LanguageContext } from "../../store/languageContext";

const LanguageSwitch = () => {
  const languageCtx = useContext(LanguageContext);
  const [isArabic, setIsArabic] = useState(true);

  const toggleSwitch = () => {
    setIsArabic((state) => !state);
    languageCtx.toggleLanguage(); // Ensure you call the function
    console.log(languageCtx.language);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#ccc", true: "#4CAF50" }} // Light gray for off, green for on
        thumbColor={isArabic ? "#ffffff" : "#ffcc00"} // White for Arabic, yellow for others
        onValueChange={toggleSwitch}
        value={isArabic}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LanguageSwitch;
