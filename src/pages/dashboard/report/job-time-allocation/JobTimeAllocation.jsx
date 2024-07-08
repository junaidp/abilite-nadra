import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const JobTimeAllocationComponent = lazy(() =>
  import("../../../../components/dashboard/reports/job-time-allocation")
);

const JobTimeAllocationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <JobTimeAllocationComponent />
    </Suspense>
  );
};

export default JobTimeAllocationPage;
