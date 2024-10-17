import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../store/ColorMode";
import { LanguageContext } from "../../store/languageContext";
import { colors } from "../../constsnt/colors"; // Adjust the path as necessary

export default function Rectangle({ languageRectangle, themeRectangle }) {
  const themeCtx = useContext(ThemeContext);
  const languageCtx = useContext(LanguageContext);

  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [selectedTheme, setSelectedTheme] = useState("light");

  const switchTheme = (theme) => {
    setSelectedTheme(theme);
    themeCtx.toggleTheme(theme);
    console.log(theme);
  };

  const switchLanguage = (language) => {
    setSelectedLanguage(language);
    languageCtx.toggleLanguage(language);
    console.log(language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        {languageRectangle && (
          <>
            <TouchableOpacity
              style={[
                styles.squareLanguage,
                selectedLanguage === "ar" && styles.selectedLanguage,
              ]}
              onPress={() => switchLanguage("ar")}
            >
              <Text style={styles.text}>AR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.squareLanguage,
                selectedLanguage === "en" && styles.selectedLanguage,
              ]}
              onPress={() => switchLanguage("en")}
            >
              <Text style={styles.text}>EN</Text>
            </TouchableOpacity>
          </>
        )}
        {themeRectangle && (
          <>
            <TouchableOpacity
              style={[
                styles.squareTheme,
                selectedTheme === "light" && styles.selectedTheme,
              ]}
              onPress={() => switchTheme("light")}
            >
              <Text style={styles.text}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.squareTheme,
                selectedTheme === "dark" && styles.selectedTheme,
              ]}
              onPress={() => switchTheme("dark")}
            >
              <Text style={styles.text}>Dark</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  rectangle: {
    flexDirection: "row",
    width: 200,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  squareTheme: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    transition: "background-color 0.3s ease",
  },
  squareLanguage: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    transition: "background-color 0.3s ease",
  },
  selectedTheme: {
    backgroundColor: colors.primary, // Change to primary when selected
  },
  selectedLanguage: {
    backgroundColor: colors.primary, // Change to primary when selected
  },
  text: {
    color: colors.text, // Use the text color from the palette
    fontWeight: "bold",
    fontSize: 16,
  },
});
