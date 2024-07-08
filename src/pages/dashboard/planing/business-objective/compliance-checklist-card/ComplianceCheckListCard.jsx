import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ComplianceCheckListCard = lazy(() =>
  import(
    "../../../../../components/dashboard/planing/business-objective/compliance-checklist-card/index"
  )
);

const ComplianceCheckListCardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ComplianceCheckListCard />
    </Suspense>
  );
};

export default ComplianceCheckListCardPage;
