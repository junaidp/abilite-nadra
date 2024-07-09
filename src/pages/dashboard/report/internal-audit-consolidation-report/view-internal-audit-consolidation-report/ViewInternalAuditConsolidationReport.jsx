import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ViewInternalAuditConsolidationReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-consolidation-report/view-internal-audit-consolidation-report/index"
  )
);

const ViewInternalAuditConsolidationReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ViewInternalAuditConsolidationReport />
    </Suspense>
  );
};

export default ViewInternalAuditConsolidationReportPage;
