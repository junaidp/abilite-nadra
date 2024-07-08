import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const FollowUp = lazy(() =>
  import("../../../../components/dashboard/reporting-follow-up/follow-up/index")
);

const FollowUpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <FollowUp />
    </Suspense>
  );
};

export default FollowUpPage;
