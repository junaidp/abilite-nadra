import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const RiskFactorApproach = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/risk-assessments/risk-factor-approach/index"
  )
);

const RiskFactorApproachPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <RiskFactorApproach />
    </Suspense>
  );
};

export default RiskFactorApproachPage;
