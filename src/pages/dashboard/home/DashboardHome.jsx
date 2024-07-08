import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const DashboardHome = lazy(() =>
  import("../../../components/dashboard/home/index")
);

const DashboardHomePage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <DashboardHome />
    </Suspense>
  );
};

export default DashboardHomePage;
