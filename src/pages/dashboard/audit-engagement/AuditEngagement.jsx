import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditEngagement = lazy(() =>
  import("../../../components/dashboard/audit-engagement")
);

const AuditEngagementPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditEngagement />
    </Suspense>
  );
};

export default AuditEngagementPage;
