import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const InformationRequest = lazy(() =>
  import("../../../../components/dashboard/tasks/information-request/index")
);

const InformationRequestPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <InformationRequest />
    </Suspense>
  );
};

export default InformationRequestPage;
