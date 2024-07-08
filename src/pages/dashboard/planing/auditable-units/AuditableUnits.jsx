import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const AuditableUnits = lazy(() =>
  import("../../../../components/dashboard/planing/auditable-units/index")
);

const AuditableUnitsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <AuditableUnits />
    </Suspense>
  );
};

export default AuditableUnitsPage;
