import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditPlaningSummary = lazy(() =>
  import("../../../../components/dashboard/reports/audit-planing-summary")
);

const AuditPlaningSummaryPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditPlaningSummary />
    </Suspense>
  );
};

export default AuditPlaningSummaryPage;
