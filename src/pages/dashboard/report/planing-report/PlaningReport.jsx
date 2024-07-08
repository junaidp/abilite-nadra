import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const PlaningReport = lazy(() =>
  import("../../../../components/dashboard/reports/planning-report/index")
);

const PlaningReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <PlaningReport />
    </Suspense>
  );
};

export default PlaningReportPage;
