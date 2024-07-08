import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const JobPrioritization = lazy(() =>
  import("../../../../components/dashboard/planing/job-prioritization")
);

const JobPrioritizationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <JobPrioritization />
    </Suspense>
  );
};

export default JobPrioritizationPage;
