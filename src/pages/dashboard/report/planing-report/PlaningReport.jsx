import React from "react";
import PlaningReport from "../../../../components/admin/dashboard/reports/planning-report/index";
import { Helmet } from "react-helmet";

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
