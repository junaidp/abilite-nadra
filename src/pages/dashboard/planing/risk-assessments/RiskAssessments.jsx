import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const RiskAssessments = lazy(() =>
  import("../../../../components/dashboard/planing/risk-assessments/index")
);

const RiskAssessmentsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <RiskAssessments />
    </Suspense>
  );
};

export default RiskAssessmentsPage;
