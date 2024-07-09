import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ViewInternalAuditReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-report/view-internal-audit-report/index"
  )
);

const ViewInternalAuditReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ViewInternalAuditReport />
    </Suspense>
  );
};

export default ViewInternalAuditReportPage;
