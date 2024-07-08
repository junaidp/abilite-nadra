import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const GeneratePlanningReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/planning-report/generate-planning-report/index"
  )
);

const GeneratePlanningReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <GeneratePlanningReport />
    </Suspense>
  );
};

export default GeneratePlanningReportPage;
