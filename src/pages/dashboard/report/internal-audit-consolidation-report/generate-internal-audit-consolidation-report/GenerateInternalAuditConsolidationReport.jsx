import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const GenerateInternalAuditConsolidationReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-consolidation-report/generate-internal-audit-consolidation-report/index"
  )
);

const GenerateInternalAuditConsolidationReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <GenerateInternalAuditConsolidationReport />
    </Suspense>
  );
};

export default GenerateInternalAuditConsolidationReportPage;
