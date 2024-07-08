import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ViewRiskAssessment = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/risk-assessments/view-risk-assessment/index"
  )
);

const ViewRiskAssessmentPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ViewRiskAssessment />
    </Suspense>
  );
};

export default ViewRiskAssessmentPage;
