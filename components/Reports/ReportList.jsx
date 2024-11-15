import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Report from "./Report";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchComplaints } from "../../utl/apis";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { useContext } from "react";
import { AuthContext } from "../../store/TokenContext.jsx";
import { LanguageContext } from "../../store/languageContext.jsx";
import CustomAlert from "../UI/CustomAlert.jsx";

export default function ReportList({ catId }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetchComplaints(catId, authCtx.token);
      console.log("complaints", response);
      if (response.status == 403) {
        setAlertVisible(true);
        setAlertMessage(
          langCtx.language === "en"
            ? "Please Verify Your Account and Try Login Again!"
            : " يرجى التحقق من حسابك واعادة تسجيل الدخول!"
        );
        setAlertError(true);
      } else {
        setComplaints(response.data);
      }
      setIsLoading(false);
    };

    fetchReports();
  }, [catId]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <>
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            onConfirm={() => {
              setAlertVisible(false);
              navigation.goBack();
            }}
            error={alertError}
          ></CustomAlert>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.centeredContent} // Ensure content is centered
            numColumns={1}
            data={complaints}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => {
              return (
                <>
                  <Report
                    title={
                      langCtx.language === "ar"
                        ? itemData.item.arabicName
                        : itemData.item.name
                    }
                    onPress={() =>
                      navigation.navigate("TakeReportScreen", {
                        title:
                          langCtx.language === "ar"
                            ? itemData.item.arabicName
                            : itemData.item.name,
                        subjectId: itemData.item.id,
                      })
                    }
                    style={styles.reportItem} // Apply style to align items to the center
                  />
                </>
              );
            }}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  centeredContent: {
    alignItems: "center", // Align content in the center
  },
  reportItem: {
    alignSelf: "center", // Ensure individual items are centered
    marginVertical: 10, // Add some vertical margin between items
  },
});
