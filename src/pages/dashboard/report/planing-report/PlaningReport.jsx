import React from "react";
import PlaningReport from "../../../../components/dashboard/reports/planning-report/index";
import { Helmet } from "react-helmet-async";

const PlaningReportPage = () => {
  return (
    <div>
      <Helmet>
        <title>Planing Report</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <PlaningReport />
    </div>
  );
};

export default PlaningReportPage;
