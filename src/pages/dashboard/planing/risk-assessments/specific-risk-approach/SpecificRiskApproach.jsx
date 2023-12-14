import React from "react";
import SpecificRiskApproach from "../../../../../components/admin/dashboard/planing/risk-assessments/specific-risk-approach/index";
import { Helmet } from "react-helmet";

const SpecificRiskApproachPage = () => {
  return (
    <div>
      <Helmet>
        <title>Specific Risk Approach</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <SpecificRiskApproach />
    </div>
  );
};

export default SpecificRiskApproachPage;
