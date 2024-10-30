import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Report from "./Report";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchComplaints } from "../../utl/apis";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../../store/TokenContext.jsx";
import { LanguageContext } from "../../store/languageContext.jsx";

export default function ReportList({ catId }) {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetchComplaints(catId, authCtx.token);
      setComplaints(response.data);
      setIsLoading(false);
    };

    fetchReports();
  }, [catId]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.centeredContent} // Ensure content is centered
          numColumns={1}
          data={complaints}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => {
            return (
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
            );
          }}
        />
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
