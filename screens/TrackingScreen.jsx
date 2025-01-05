import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useCallback } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { AuthContext } from "../store/TokenContext.jsx";
import { FetchComplaintsStatus } from "../utl/apis.js";
import { useFocusEffect } from "@react-navigation/native";
import { LanguageContext } from "../store/languageContext.jsx";

const { width, height } = Dimensions.get("window");

export default function TrackingScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchComplaintsStatus = async () => {
        try {
          const userId = authCtx.userData.id;
          setLoading(true);

          const response = await FetchComplaintsStatus(authCtx.token, userId);
          console.log("data:", response);

          if (response && !response.status) {
            // Only update complaints if the response status is 200
            setComplaints(response || []);
            console.log(response);
          } else {
            // Handle non-200 status (errors)
            setComplaints(null);
            // Optionally, handle error display here
          }
        } catch (error) {
          console.error("Error fetching complaints:", error);
          setComplaints(null);
          // You can display an error message to the user here
        } finally {
          setLoading(false);
        }
      };
      fetchComplaintsStatus();
    }, [authCtx.token, authCtx.userData.id])
  );

  const handleEdit = (reportData) => {
    navigation.navigate("UpdateComplaintsScreen", { reportData });
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      {!loading && (
        <View style={styles.screen}>
          <HeaderImage />
          {!complaints ? (
            <View style={styles.containerNot}>
              <Text style={styles.textNot}>
                {langCtx.language === "ar"
                  ? "لا يوجد لديك شكاوي"
                  : "No Complaints Yet"}
              </Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {complaints.map((report) => (
                <View key={report.id} style={styles.report}>
                  <Text style={styles.reportTitle}>
                    <Text style={styles.complaintLabel}>
                      {langCtx.language === "ar"
                        ? "رقم الشكوى"
                        : "Complaint Number"}
                      :
                    </Text>{" "}
                    {report.id}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar"
                        ? "نوع الشكوى"
                        : "Complaint Type"}
                      :
                    </Text>{" "}
                    <Text>
                      {langCtx.language === "ar"
                        ? report.subject.arabicName
                        : report.subject.name}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar" ? "التاريخ" : "Date"}:
                    </Text>{" "}
                    {report.date}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar" ? "الحالة" : "Status"}:
                    </Text>{" "}
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            report.status === "Rejected"
                              ? "red"
                              : report.status === "Registered"
                              ? "green"
                              : report.status === "Processing"
                              ? "#FFC107"
                              : report.status === "Closed"
                              ? "black"
                              : "black",
                        },
                      ]}
                    >
                      {langCtx.language === "ar"
                        ? report.status === "Rejected"
                          ? "مرفوض"
                          : report.status === "Registered"
                          ? "مسجل"
                          : report.status === "Processing"
                          ? "تحت المعالجة"
                          : report.status === "Closed"
                          ? "مغلق"
                          : "غير معروف"
                        : report.status}
                    </Text>
                  </Text>

                  {report.notes && (
                    <Text style={styles.text}>
                      <Text style={styles.bold}>
                        {langCtx.language === "ar" ? "ملاحظات" : "notes"}:
                      </Text>{" "}
                      {report.notes}
                    </Text>
                  )}
                  {report.status === "Registered" && (
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(report)}
                    >
                      <Text style={styles.editButtonText}>
                        {langCtx.language === "ar" ? "تعديل" : "Edit"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerNot: {
    alignItems: "center",
    marginVertical: height * 0.03,
  },
  textNot: {
    fontSize: width * 0.05,
    color: "#000000",
    textAlign: "center", // Center the text
  },
  report: {
    marginVertical: height * 0.01,
    backgroundColor: "#fff",
    marginHorizontal: width * 0.05,
    padding: width * 0.05,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  reportTitle: {
    fontWeight: "bold",
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  complaintLabel: {
    fontSize: width * 0.045,
    color: "#333", // Changed color for better visibility
  },
  text: {
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  statusText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.032,
  },
  scrollViewContent: {
    paddingBottom: height * 0.1, // Add some padding at the bottom
  },
});
