import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditExceptionComponent = lazy(() =>
  import("../../../../components/dashboard/reports/audit-exception")
);

const AuditExceptionPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditExceptionComponent />
    </Suspense>
  );
};

export default AuditExceptionPage;
