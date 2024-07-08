import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const GenerateInternalAuditReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-report/generate-internal-audit-report/index"
  )
);

const GenerateInternalAuditReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <GenerateInternalAuditReport />
    </Suspense>
  );
};

export default GenerateInternalAuditReportPage;
