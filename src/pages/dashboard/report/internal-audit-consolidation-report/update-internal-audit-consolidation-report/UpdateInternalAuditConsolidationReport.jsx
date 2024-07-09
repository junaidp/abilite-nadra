import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const UpdateInternalAuditConsolidationReport = lazy(() =>
  import(
    "../../../../../components/dashboard/reports/internal-audit-consolidation-report/update-internal-audit-consolidation-report"
  )
);

const UpdateInternalAuditConsolidationReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <UpdateInternalAuditConsolidationReport />
    </Suspense>
  );
};

export default UpdateInternalAuditConsolidationReportPage;
