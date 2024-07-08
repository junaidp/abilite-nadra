import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const StartScheduling = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/job-scheduling/start-scheduling/index"
  )
);

const StartSchedulingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <StartScheduling />
    </Suspense>
  );
};

export default StartSchedulingPage;
