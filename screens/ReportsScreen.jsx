import { View, Text, ScrollView } from "react-native";
import React from "react";
import HeaderImage from "../components/UI/HeaderImage";
import ReportList from "../components/Reports/ReportList";
export default function ReportsScreen({ route }) {
  const catId = route.params.id;
  return (
    <>
      <ReportList catId={catId}></ReportList>
    </>
  );
}
