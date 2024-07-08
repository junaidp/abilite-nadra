import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const BusinessProcess = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/business-objective/business-process/index"
  )
);

const BusinessProcessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <BusinessProcess />
    </Suspense>
  );
};

export default BusinessProcessPage;
