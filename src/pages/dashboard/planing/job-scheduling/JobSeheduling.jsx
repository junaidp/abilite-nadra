import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const JobScheduling = lazy(() =>
  import("../../../../components/dashboard/planing/job-scheduling/index")
);

const JobSehedulingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <JobScheduling />
    </Suspense>
  );
};

export default JobSehedulingPage;
