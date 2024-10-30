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
  const [complaints, setComplaints] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchComplaintsStatus = async () => {
        try {
          const userId = authCtx.userData.id;
          setLoading(true);
          const response = await FetchComplaintsStatus(authCtx.token, userId);
          setComplaints(response);
        } catch (error) {
          console.error(error);
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
          {complaints.length === 0 ? (
            <View style={styles.containerNot}>
              <Text style={styles.textNot}>
                {langCtx.language === "ar"
                  ? " لا يوجد لديك شكاوي"
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
                        ? "   رقم الشكوى"
                        : " Complaints Number"}
                      :{" "}
                    </Text>
                    {report.id}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar"
                        ? " نوع الشكوى"
                        : " Complaints Type"}
                      :{" "}
                    </Text>
                    <Text>
                      {langCtx.language === "ar"
                        ? report.subject.arabicName
                        : report.subject.name}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar" ? " التاريخ " : " Date"}:{" "}
                    </Text>
                    {report.date}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>
                      {langCtx.language === "ar" ? " الحالة " : " Status "}:{" "}
                    </Text>
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
                      {report.status}
                    </Text>
                  </Text>

                  {report.status === "Registered" && (
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(report)}
                    >
                      <Text style={styles.editButtonText}>
                        {langCtx.language === "ar" ? "تعديل " : "Edit"}
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
    fontSize: width * 0.05,
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
