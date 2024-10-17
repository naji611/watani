import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SettingsTab from "../components/SettingsTab";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import ButtonSwitch from "../components/UI/ButtonSwitch.jsx";
import LanguageSwitch from "../components/UI/LanguageSwitch.jsx";
export default function SettingsScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);
  return (
    <>
      <View>
        <SettingsTab
          title={authCtx.userData.name}
          subTitle={authCtx.userData.primaryNumber}
          icon="person-circle"
          onPress={() => {
            navigation.navigate("PersonalInfo");
          }}
        ></SettingsTab>
        <SettingsTab
          title={"الاراء "}
          icon="chatbubbles-outline"
          onPress={() => {
            navigation.navigate("FeedBackScreen");
          }}
        ></SettingsTab>
        <SettingsTab
          title={"عن التطبيق"}
          icon="alert-circle-outline"
          onPress={() => {
            navigation.navigate("OverViewScreen");
          }}
        ></SettingsTab>
        <SettingsTab
          title={"تغيير كلمة المرور "}
          icon="lock-closed-outline"
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        ></SettingsTab>
        <SettingsTab
          title={"تسجبل الخروج"}
          icon="log-out-outline"
          onPress={() => {
            authCtx.logout();
          }}
        ></SettingsTab>
      </View>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>EN</Text>
            <LanguageSwitch />
            <Text style={styles.label}>AR</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Dark</Text>
            <ButtonSwitch />
            <Text style={styles.label}>Light</Text>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background color for better contrast
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically centered
    width: "80%", // Adjust the width as needed
  },
  label: {
    fontSize: 18,
    color: "#333", // Default text color
  },
});
