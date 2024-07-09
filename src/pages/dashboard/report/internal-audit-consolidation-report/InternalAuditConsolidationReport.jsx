import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const InternalAuditConsolidationReport = lazy(() =>
  import(
    "../../../../components/dashboard/reports/internal-audit-consolidation-report/index"
  )
);

const InternalAuditConsolidationReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <InternalAuditConsolidationReport />
    </Suspense>
  );
};

export default InternalAuditConsolidationReportPage;
