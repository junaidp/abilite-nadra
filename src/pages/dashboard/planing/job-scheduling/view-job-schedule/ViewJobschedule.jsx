import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ViewJobSchedule = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/job-scheduling/view-job-schedule/index"
  )
);

const ViewJobSchedulePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ViewJobSchedule />
    </Suspense>
  );
};

export default ViewJobSchedulePage;
