import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ViewResource = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/job-scheduling/view-resource/index"
  )
);

const ViewResourcePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ViewResource />
    </Suspense>
  );
};

export default ViewResourcePage;
