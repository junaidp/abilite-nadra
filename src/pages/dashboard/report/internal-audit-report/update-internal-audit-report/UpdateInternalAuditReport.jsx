import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const UpdateInternalAuditReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-report/update-internal-audit-report/index"
  )
);

const UpdateInternalAuditReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <UpdateInternalAuditReport />
    </Suspense>
  );
};

export default UpdateInternalAuditReportPage;
