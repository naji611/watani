import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { AuthContext } from "../store/TokenContext.jsx";
import { FetchComplaintsStatus } from "../utl/apis.js";

export default function TrackingScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaintsStatus = async () => {
      try {
        const userId = authCtx.userData.id;
        setLoading(true);
        const response = await FetchComplaintsStatus(authCtx.token, userId);
        console.log(response[0]);
        setComplaints(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaintsStatus();
  }, [authCtx.token]);

  const handleEdit = (reportData) => {
    navigation.navigate("TakeReportScreen", { reportData, type: "edit" });
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      {!loading && (
        <View style={styles.screen}>
          <HeaderImage />
          {complaints.length === 0 ? (
            <View style={styles.containerNot}>
              <Text style={styles.textNot}>لا يوجد لديك شكاوي </Text>
            </View>
          ) : (
            <ScrollView>
              {complaints.map((report) => (
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
                            report.status === "Rejected"
                              ? "red"
                              : report.status === "Registered"
                              ? "green"
                              : report.status === "Processing"
                              ? "#FFC107" // amber color for processing
                              : report.status === "Closed"
                              ? "black" // black color for closed status
                              : "black", // default color if no match
                        },
                        { fontSize: 15, fontWeight: "bold" },
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
                      <Text style={styles.editButtonText}>تعديل</Text>
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
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50", // green color for edit button
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
