import React from "react";
import RiskAssessments from "../../../../components/admin/dashboard/planing/risk-assessments/index";
import { Helmet } from "react-helmet-async";

const RiskAssessmentsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Risk Assessments</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <RiskAssessments />
    </div>
  );
};

export default RiskAssessmentsPage;
