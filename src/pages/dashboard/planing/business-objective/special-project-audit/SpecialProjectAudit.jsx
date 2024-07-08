import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const SpecialProjectAudit = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/business-objective/special-project-audit/index"
  )
);

const SpecialProjectAuditPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <SpecialProjectAudit />
    </Suspense>
  );
};

export default SpecialProjectAuditPage;
