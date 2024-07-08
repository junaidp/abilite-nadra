import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const FollowUpParticulars = lazy(() =>
  import(
    "../../../../../components/dashboard/reporting-follow-up/follow-up/follow-up-particulars/index"
  )
);

const FollowUpParticularsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <FollowUpParticulars />
    </Suspense>
  );
};

export default FollowUpParticularsPage;
