import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import Reports from "../components/UI/HomeScreenSections/Reports";
const complaintsCat = [
  { id: 1, en: "Areas", ar: "المناطق" },
  {
    id: 2,
    en: "Health and disasters for individuals and facilities",
    ar: "الصحة والمكاره على الأفراد والمنشآت",
  },
  { id: 3, en: "Planning", ar: "التخطيط" },
  { id: 4, en: "Social Affairs", ar: "الشؤون الاجتماعيه" },
  { id: 5, en: "Construction Department", ar: "دائره الانشاءات" },
  { id: 6, en: "Maintenance and road", ar: "صيانه و الطرق" },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      {/* Content starts here */}
      <ScrollView contentContainerStyle={styles.container}>
        {complaintsCat.map((comp) => {
          return (
            <Reports
              key={comp.id}
              title={comp.ar}
              id={comp.id}
              onPress={() => {
                navigation.navigate("ReportsScreen", { id: comp.id });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 50, // Adjust based on the header height
    paddingBottom: 20,
    alignItems: "center",

    paddingBottom: 100,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100, // Adjust to your image's size
    height: 100, // Adjust to your image's size
    zIndex: 10, // Ensures it is above other content
  },
});
