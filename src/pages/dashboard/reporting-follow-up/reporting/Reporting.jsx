import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const Reporting = lazy(() =>
  import("../../../../components/dashboard/reporting-follow-up/reporting/index")
);

const ReportingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <Reporting />
    </Suspense>
  );
};

export default ReportingPage;
