import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Report from "./Report";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const reports = [
  { id: 1, title: "طلب حاوية" }, // Request for a container
  { id: 2, title: "طلب ازالة مطب" }, // Request to remove a speed bump
  { id: 3, title: "طلب تقليم اشجار" }, // Request to trim trees
  { id: 4, title: "طلب صيانة انارة" }, // Request for streetlight maintenance
  { id: 5, title: "طلب تنظيف الحي" }, // Request for neighborhood cleaning
  { id: 6, title: "طلب اصلاح حفر الطريق" }, // Request to repair road potholes
  { id: 7, title: "طلب رش مبيدات" }, // Request for pesticide spraying
  { id: 8, title: "طلب تحسين بنية الشارع" }, // Request to improve street infrastructure
  { id: 9, title: "طلب صيانة صرف صحي" }, // Request for sewer maintenance
  { id: 10, title: "طلب ازالة سيارة مهملة" }, // Request to remove an abandoned vehicle
  { id: 11, title: "طلب نقل نفايات" }, // Request for waste removal
  { id: 12, title: "طلب اصلاح كسر في أنبوب" }, // Request to repair a broken pipe
  { id: 13, title: "طلب طلاء الارصفة" }, // Request to paint curbs
  { id: 14, title: "طلب صيانة حديقة عامة" }, // Request to maintain a public park
];

export default function ReportList({}) {
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.list}
      numColumns={2}
      data={reports}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <Report
            title={itemData.item.title}
            onPress={() =>
              navigation.navigate("TakeReportScreen", {
                title: itemData.item.title,
              })
            }
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,

    marginHorizontal: 5,
  },
});
