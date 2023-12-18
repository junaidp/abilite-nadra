import React from "react";
import GenerateInternalAuditReport from "../../../../../components/admin/dashboard/reports/internal-audit-report/generate-internal-audit-report/index";
import { Helmet } from "react-helmet-async";

const GenerateInternalAuditReportPage = () => {
  return (
    <div>
      <Helmet>
        <title>Generate Internal Audit Report</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <GenerateInternalAuditReport />
    </div>
  );
};

export default GenerateInternalAuditReportPage;
