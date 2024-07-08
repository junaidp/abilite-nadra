import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const KickOff = lazy(() =>
  import("../../../../components/dashboard/audit-engagement/kick-off/index")
);

const KickOffPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <KickOff />
    </Suspense>
  );
};

export default KickOffPage;
