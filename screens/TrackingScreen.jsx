import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import LoadingIndicator from "../components/UI/LoadingIndicator";
const tracksReports = [
  {
    id: 1,
    title: "طلب حاوية",
    status: "مكتمل",
    date: "2024-10-01",
    comp: "تم التنفيذ بنجاح",
  },
  {
    id: 2,
    title: "طلب ازالة مطب",
    status: "انتظار",
    date: "2024-10-02",
    comp: "بانتظار الموافقة",
  },
  {
    id: 3,
    title: "طلب تقليم اشجار",
    status: "مكتمل",
    date: "2024-09-30",
    comp: "تم تقليم جميع الأشجار المطلوبة",
  },
  {
    id: 4,
    title: "طلب صيانة انارة",
    status: "مرفوض",
    date: "2024-10-03",
    comp: "الطلب غير معتمد",
  },
  {
    id: 5,
    title: "طلب تنظيف الحي",
    status: "مكتمل",
    date: "2024-09-28",
    comp: "تم تنظيف جميع المناطق",
  },
  {
    id: 6,
    title: "طلب اصلاح حفر الطريق",
    status: "انتظار",
    date: "2024-10-04",
    comp: "بانتظار التمويل",
  },
  {
    id: 7,
    title: "طلب رش مبيدات",
    status: "مكتمل",
    date: "2024-10-05",
    comp: "تم رش المبيدات بالكامل",
  },
  {
    id: 8,
    title: "طلب تحسين بنية الشارع",
    status: "مرفوض",
    date: "2024-09-25",
    comp: "لم تتم الموافقة من البلدية",
  },
  {
    id: 9,
    title: "طلب صيانة صرف صحي",
    status: "مكتمل",
    date: "2024-10-06",
    comp: "تم اصلاح مشكلة الصرف الصحي",
  },
  {
    id: 10,
    title: "طلب ازالة سيارة مهملة",
    status: "انتظار",
    date: "2024-10-07",
    comp: "بانتظار التحقيق",
  },
  {
    id: 11,
    title: "طلب نقل نفايات",
    status: "مكتمل",
    date: "2024-09-29",
    comp: "تم نقل النفايات بالكامل",
  },
  {
    id: 12,
    title: "طلب اصلاح كسر في أنبوب",
    status: "انتظار",
    date: "2024-09-27",
    comp: "بانتظار الموافقة من شركة المياه",
  },
  {
    id: 13,
    title: "طلب طلاء الارصفة",
    status: "مكتمل",
    date: "2024-09-26",
    comp: "تم طلاء جميع الأرصفة",
  },
  {
    id: 14,
    title: "طلب صيانة حديقة عامة",
    status: "مكتمل",
    date: "2024-09-24",
    comp: "تم صيانة الحديقة بالكامل",
  },
];

export default function TrackingScreen() {
  return (
    <View style={styles.screen}>
      <HeaderImage />
      {tracksReports.length === 0 ? (
        <View style={styles.containerNot}>
          <Text style={styles.textNot}>لا يوجد لديك شكاوي </Text>
        </View>
      ) : (
        <ScrollView>
          {tracksReports.map((report) => (
            <View key={report.id} style={styles.report}>
              <Text style={styles.reportTitle}>
                <Text style={{ fontSize: 20 }}>رقم الشكوى: </Text>
                {report.id}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>نوع الشكوى: </Text>
                {report.title}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>التاريخ: </Text>
                {report.date}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>الحالة: </Text>
                <Text
                  style={[
                    {
                      color:
                        report.status === "مكتمل"
                          ? "green"
                          : report.status === "مرفوض"
                          ? "red"
                          : report.status === "انتظار"
                          ? "#FFC107"
                          : "black", // default color if no match
                      fontSize: 15,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {report.status}
                </Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>الملاحظات: </Text>
                {report.comp}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerNot: {
    alignItems: "center",
    marginVertical: 30,
  },
  textNot: {
    fontSize: 20,
    color: "#000000",
  },
  report: {
    marginVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  reportTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
