import React from "react";
import AuditPlanSummary from "../../../../components/dashboard/planing/audit-plan-summary/index";
import { Helmet } from "react-helmet-async";

const AuditPlanSummaryPage = () => {
  return (
    <div>
      <Helmet>
        <title>Audit Plan Summary</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <AuditPlanSummary />
    </div>
  );
};

export default AuditPlanSummaryPage;
