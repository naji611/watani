import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import SettingsTab from "../components/SettingsTab";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import { LanguageContext } from "../store/languageContext.jsx";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "../store/ColorMode.jsx";

export default function SettingsScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const languageCtx = useContext(LanguageContext);
  const themeCtx = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleSwitchLanguage}
            style={styles.languageButton}
          >
            <Text style={styles.languageButtonText}>
              {languageCtx.language === "ar" ? "AR" : "EN"}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, languageCtx.language, themeCtx.theme]);

  function handleSwitchLanguage() {
    languageCtx.toggleLanguage();
    console.log(languageCtx.language);
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <SettingsTab
          title={languageCtx.language === "ar" ? "معلوماتي" : "Personal Info"}
          icon="person-circle"
          onPress={() => navigation.navigate("PersonalInfo")}
        />
        <SettingsTab
          title={languageCtx.language === "ar" ? "الاراء " : "Feedback"}
          icon="chatbubbles-outline"
          onPress={() => navigation.navigate("FeedBackScreen")}
        />
        <SettingsTab
          title={languageCtx.language === "ar" ? "عن التطبيق" : "About Us "}
          icon="alert-circle-outline"
          onPress={() => navigation.navigate("OverViewScreen")}
        />
        <SettingsTab
          title={
            languageCtx.language === "ar"
              ? "تغيير كلمة المرور "
              : "Change Password"
          }
          icon="lock-closed-outline"
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <SettingsTab
          title={languageCtx.language === "ar" ? "تسجيل الخروج" : "Logout"}
          icon="log-out-outline"
          onPress={authCtx.logout}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background for better contrast
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageButton: {
    width: 55,
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    backgroundColor: "#f55",
  },
  languageButtonText: {
    textAlign: "center",
    padding: 5,
    color: "white",
  },
});
