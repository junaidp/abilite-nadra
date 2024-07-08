import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditSettings = lazy(() =>
  import("../../../components/dashboard/audit-settings/index")
);

const AuditSettingsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditSettings />
    </Suspense>
  );
};

export default AuditSettingsPage;
