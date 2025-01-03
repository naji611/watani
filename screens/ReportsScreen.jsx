import React from "react";

import ReportList from "../components/Reports/ReportList";
export default function ReportsScreen({ route }) {
  const catId = route.params.id;
  return (
    <>
      <ReportList catId={catId}></ReportList>
    </>
  );
}
