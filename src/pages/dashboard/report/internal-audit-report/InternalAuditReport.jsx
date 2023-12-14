import React from "react";
import InternalAuditReport from "../../../../components/admin/dashboard/reports/internal-audit-report/index";
import { Helmet } from "react-helmet";

const InternalAuditReportPage = () => {
  return (
    <div>
      <Helmet>
        <title>Internal Audit Report</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <InternalAuditReport />
    </div>
  );
};

export default InternalAuditReportPage;
