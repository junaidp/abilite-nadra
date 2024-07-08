import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const SpecificRiskApproach = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/risk-assessments/specific-risk-approach/index"
  )
);

const SpecificRiskApproachPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <SpecificRiskApproach />
    </Suspense>
  );
};

export default SpecificRiskApproachPage;
