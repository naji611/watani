import { View, Text } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import SettingsTab from "../components/SettingsTab";
export default function SettingsScreen({ navigation }) {
  return (
    <View>
      <SettingsTab
        title={"مصطفى الاحمد"}
        subTitle={20000264545}
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
      {/* <SettingsTab title={"dark mood "} icon="moon"></SettingsTab> */}
    </View>
  );
}
