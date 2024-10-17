import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderImage from "../components/UI/HeaderImage";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
import { FetchComplaintsStatus } from "../utl/apis.js";

const tracksReports = [];

export default function TrackingScreen() {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchComplaintsStatus = async () => {
      try {
        setLoading(true);
        FetchComplaintsStatus(authCtx.token).then((response) => {
          console.log(response);
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchComplaintsStatus();
  }, [authCtx.token]);
  return (
    <>
      {loading && <LoadingIndicator />}

      {!loading && (
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
});
