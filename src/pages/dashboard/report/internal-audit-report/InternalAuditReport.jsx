import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const InternalAuditReport = lazy(() =>
  import("../../../../components/dashboard/reports/internal-audit-report/index")
);

const InternalAuditReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <InternalAuditReport />
    </Suspense>
  );
};

export default InternalAuditReportPage;
