import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const BusinessObjectiveRedirect = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/business-objective/business-objective-redirect/index"
  )
);

const BusinessObjectiveRedirectPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <BusinessObjectiveRedirect />
    </Suspense>
  );
};

export default BusinessObjectiveRedirectPage;
