import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditParticulars = lazy(() =>
  import(
    "../../../../../components/dashboard/reporting-follow-up/reporting/reporting-particulars/index"
  )
);

const ReportingParticularsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditParticulars />
    </Suspense>
  );
};

export default ReportingParticularsPage;
