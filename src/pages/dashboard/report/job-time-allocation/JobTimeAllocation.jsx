import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const JobTimeAllocation = lazy(() =>
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
      <JobTimeAllocation />
    </Suspense>
  );
};

export default JobTimeAllocationPage;
