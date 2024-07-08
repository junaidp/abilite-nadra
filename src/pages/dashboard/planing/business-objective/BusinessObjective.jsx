import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const BusinessObjective = lazy(() =>
  import("../../../../components/dashboard/planing/business-objective/index")
);

const BusinessObjectivePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <BusinessObjective />
    </Suspense>
  );
};

export default BusinessObjectivePage;
