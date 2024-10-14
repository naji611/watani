import { View, Text } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import SettingsTab from "../components/SettingsTab";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
export default function SettingsScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);
  return (
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
        title={"تسجبل الخروج"}
        icon="log-out-outline"
        onPress={() => {
          authCtx.logout();
        }}
      ></SettingsTab>
      {/* <SettingsTab title={"dark mood "} icon="moon"></SettingsTab> */}
    </View>
  );
}
