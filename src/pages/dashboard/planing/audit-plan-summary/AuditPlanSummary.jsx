import React from "react";
import AuditPlanSummary from "../../../../components/admin/dashboard/planing/audit-plan-summary/index";
import { Helmet } from "react-helmet";

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
