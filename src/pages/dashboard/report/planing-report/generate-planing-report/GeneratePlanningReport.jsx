import React from "react";
import GeneratePlanningReport from "../../../../../components/dashboard/reports/planning-report/generate-planning-report/index";
import { Helmet } from "react-helmet-async";

const GeneratePlanningReportPage = () => {
  return (
    <div>
      <Helmet>
        <title>Generate Planning Report</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <GeneratePlanningReport />
    </div>
  );
};

export default GeneratePlanningReportPage;
