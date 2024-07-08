import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditPlanSummary = lazy(() =>
  import("../../../../components/dashboard/planing/audit-plan-summary/index")
);

const AuditPlanSummaryPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditPlanSummary />
    </Suspense>
  );
};

export default AuditPlanSummaryPage;
