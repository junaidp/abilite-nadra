import React from "react";
import RiskFactorApproach from "../../../../../components/admin/dashboard/planing/risk-assessments/risk-factor-approach/index";
import { Helmet } from "react-helmet";

const RiskFactorApproachPage = () => {
  return (
    <div>
      <Helmet>
        <title>Risk Factor Approach</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <RiskFactorApproach />
    </div>
  );
};

export default RiskFactorApproachPage;
